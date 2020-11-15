import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { FolderCollectionType, CmsCollectionContent, ConfigType } from './config-content-types'

export type CollectionNames<TConfig extends ConfigType> = TConfig["collections"][number]["name"]

type CollectionTypes<TConfig extends ConfigType, TCollection extends FolderCollectionType, TName extends CollectionNames<TConfig>> = 
    TCollection extends { name: TName }
    ? TCollection
    : never

type GetCollectionType<TConfig extends ConfigType, TName extends CollectionNames<TConfig>> = CollectionTypes<TConfig, TConfig["collections"][number], TName>

type GetCollectionContentModel<TConfig extends ConfigType, TCollectionName extends CollectionNames<TConfig>> = CmsCollectionContent<GetCollectionType<TConfig, TCollectionName>>

export class Repository<TConfig extends ConfigType, TCollectionName extends CollectionNames<TConfig>> {

    private cmsCollection: GetCollectionType<TConfig, TCollectionName>

    constructor(collectionName: TCollectionName){
        const config = require("__generated__")

        this.cmsCollection = config
            .collections
            .find(collection => collection.name === collectionName) as GetCollectionType<TConfig, TCollectionName>
    }
    
    get(id: string): GetCollectionContentModel<TConfig, TCollectionName> {
        if ('folder' in this.cmsCollection) {
            const filePath = path.join(process.cwd(), this.cmsCollection.folder, id + '.md')

            const files = {} as any

            return files
        }
    }

    async getAll(): Promise<GetCollectionContentModel<TConfig, TCollectionName> & { id: string } []> {
        if ('folder' in this.cmsCollection) {
            const folderPath = path.join(process.cwd(), this.cmsCollection.folder)

            const filePaths = fs.readdirSync(folderPath)

            const contentWithIds = filePaths.map(async fileName => {
              const id = this.getContentIdFromFileName(fileName)
              const filePath = path.join(folderPath, fileName)
          
              const postData = await this.getContent<any>(filePath)
              
              return { id, ...postData }
            })
            
            return await Promise.all(contentWithIds) as GetCollectionContentModel<TConfig, TCollectionName> & { id: string } []
        }
    }

    getAllIds(): string[] {
        if ('folder' in this.cmsCollection) {
            const folderPath = path.join(process.cwd(), this.cmsCollection.folder)
            
            const fileNames = fs.readdirSync(folderPath)
          
            return fileNames.map(fileName => this.getContentIdFromFileName(fileName))
        }
    }

    private getContentIdFromFileName(fileName: string) {
      return path.basename(fileName, path.extname(fileName))
    }

    private async getContent<TEntry>(filePath: string) : Promise<TEntry> {
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const matterResult = matter(fileContents)
    
        const processedContent = await remark()
          .use(html)
          .process(matterResult.content)

        const body = processedContent.toString()

        if (body) {
            return {
                ...matterResult.data
            } as TEntry & { body: string}
        }

        return matterResult.data as TEntry
    }
}
