import { watchNetlifyCmsConfig } from './lib/config-watcher'
import { CollectionNames, Repository } from './lib/repository'
import { config } from './__generated__/config'

type Phase = 
    | "phase-export"
    | "phase-production-build"
    | "phase-production-server"
    | "phase-development-server"

const contentRepositories = {}

function getContentRepositories() {
    if (Object.keys(contentRepositories).length === 0) {
        config.collections.forEach(collection => {
            contentRepositories[collection.name] = new Repository(collection.name)
        })
    }

    type Config = typeof config

    return contentRepositories as { [TName in CollectionNames<Config>]: Repository<Config, TName> }
}

export default getContentRepositories()

export const withNetlifyCmsContentProvider = (internalConfig: any = {}) => 
    (phase: Phase, params) => {
        if (phase === "phase-development-server") {
            watchNetlifyCmsConfig('./netlify-cms-config.yml')
        }
    
        let internalConfigObj = typeof internalConfig === "function"
            ? internalConfig(phase, params) : internalConfig;

        return internalConfigObj;
    }
