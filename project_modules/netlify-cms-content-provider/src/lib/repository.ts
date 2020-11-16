import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { CollectionsType, GetCollectionType, CollectionNames, GetCollectionContentModel } from './config-content-types'

export class Repository<TCollections extends CollectionsType, TCollectionName extends CollectionNames<TCollections>> {

    private cmsCollection: GetCollectionType<TCollections, TCollectionName>

    constructor(collectionName: TCollectionName){
        const config = require("../__generated__/generated-config")

        this.cmsCollection = config
            .collections
            .find(collection => collection.name === collectionName) as GetCollectionType<TCollections, TCollectionName>
    }
    
    async get(id: string): Promise<GetCollectionContentModel<TCollections, TCollectionName>> {
        if ('folder' in this.cmsCollection) {
            const folderPath = path.join(process.cwd(), this.cmsCollection.folder)
            const fileName = id + '.md'
            const filePath = path.join(folderPath, fileName)
        
            const postData = await this.getContent<any>(filePath)
            
            return { id, ...postData }
        }
    }

    async getAll(): Promise<GetCollectionContentModel<TCollections, TCollectionName> & { id: string } []> {
        if ('folder' in this.cmsCollection) {
            const folderPath = path.join(process.cwd(), this.cmsCollection.folder)

            const filePaths = fs.readdirSync(folderPath)

            const contentWithIds = filePaths.map(async fileName => {
              const id = this.getContentIdFromFileName(fileName)
              const filePath = path.join(folderPath, fileName)
          
              const postData = await this.getContent<any>(filePath)
              
              return { id, ...postData }
            })
            
            return await Promise.all(contentWithIds) as GetCollectionContentModel<TCollections, TCollectionName> & { id: string } []
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
                body,
                ...matterResult.data
            } as TEntry & { body: string}
        }

        return matterResult.data as TEntry
    }
}
