import path from 'path'
import { config } from '../__generated__/netlify-cms-config/config'
import fs from 'fs'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { FolderCollectionType, CmsCollectionContent } from './content-types'

type ConfigType = typeof config
type CollectionNames = ConfigType["collections"][number]["name"]
type CollectionTypes<TCollection extends FolderCollectionType, TName extends CollectionNames> = 
    TCollection extends { name: TName }
    ? TCollection
    : never

type GetCollectionType<TName extends CollectionNames> = CollectionTypes<ConfigType["collections"][number], TName>

type GetCollectionContentModel<TCollectionName extends CollectionNames> = CmsCollectionContent<GetCollectionType<TCollectionName>>

class Repository<TCollectionName extends CollectionNames> {

    private cmsCollection: GetCollectionType<TCollectionName>

    constructor(collectionName: TCollectionName){
        this.cmsCollection = config
            .collections
            .find(collection => collection.name === collectionName) as GetCollectionType<TCollectionName>
    }
    
    get(id: string): GetCollectionContentModel<TCollectionName> {
        if ('folder' in this.cmsCollection) {
            const filePath = path.join(process.cwd(), this.cmsCollection.folder, id + '.md')

            const files = {} as any

            return files
        }
    }

    async getAll(): Promise<GetCollectionContentModel<TCollectionName> & { id: string } []> {
        if ('folder' in this.cmsCollection) {
            const folderPath = path.join(process.cwd(), this.cmsCollection.folder)

            const filePaths = fs.readdirSync(folderPath)

            const contentWithIds = filePaths.map(async fileName => {
              const id = this.getContentIdFromFileName(fileName)
              const filePath = path.join(folderPath, fileName)
          
              const postData = await this.getContent<any>(filePath)
              
              return { id, ...postData }
            })
            
            return await Promise.all(contentWithIds) as GetCollectionContentModel<TCollectionName> & { id: string } []
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

export function GetContentRepositories() {
    const contentRepositories = {}

    config.collections.forEach(collection => {
        contentRepositories[collection.name] = new Repository(collection.name)
    })

    return contentRepositories as { [N in CollectionNames]: Repository<N> }
}

export const Content = GetContentRepositories()