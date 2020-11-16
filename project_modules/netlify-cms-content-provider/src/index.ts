import { emitConfigTypes, watchNetlifyCmsConfig } from './lib/config-watcher'
import { Repository } from './lib/repository'
import { collections } from './__generated__/generated-config'
import { CollectionNames, GetCollectionContentModel } from './lib/config-content-types';

type Phase = 
    | "phase-export"
    | "phase-production-build"
    | "phase-production-server"
    | "phase-development-server"


type Collections = typeof collections

const contentRepositories = {}

export function content(): { [TName in Collections[number]["name"]]: Repository<Collections, TName> } {
    if (Object.keys(contentRepositories).length === 0) {
        collections.forEach(collection => {
            contentRepositories[collection.name] = new Repository(collection.name)
        })
    }

    return contentRepositories as { [TName in CollectionNames<Collections>]: Repository<Collections, TName> }
}

export const withNetlifyCmsContentProvider = (internalConfig: any = {}) => 
    (phase: Phase, params) => {
        
        const configPath = './netlify-cms-config.yml'

        if (phase !== "phase-production-server"){
            emitConfigTypes(configPath)
        }

        if (phase === "phase-development-server") {
            watchNetlifyCmsConfig(configPath)
        }
    
        let internalConfigObj = typeof internalConfig === "function"
            ? internalConfig(phase, params) : internalConfig;

        return internalConfigObj;
    }

export type GetCollectionContentModelByName<TName extends Collections[number]["name"]> = 
    GetCollectionContentModel<Collections[number], TName>
