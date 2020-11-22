import path from "path"
import fs from "fs"
import remark from "remark"
import html from "remark-html"
import matter from "gray-matter"

const contentRoot = 'content'

async function get(relativeFilePath: string): Promise<any> {
    const filePath = path.join(process.cwd(), contentRoot, relativeFilePath)
    const id = getContentIdFromFileName(filePath)

    const postData = await getContent(filePath)
    
    return { id, ...postData }
}

async function getAll(relativeFolder: string): Promise<any[]> {

    const folderPath = path.join(process.cwd(), contentRoot, relativeFolder)
    const filePaths = fs.readdirSync(folderPath)

    const contentWithIds = filePaths.map(async fileName => {
      const id = getContentIdFromFileName(fileName)
      const filePath = path.join(folderPath, fileName)
  
      const postData = await getContent(filePath)
      
      return { id, ...postData }
    })

    return await Promise.all(contentWithIds)
}

function getContentIdFromFileName(fileName: string) {
    return path.basename(fileName, path.extname(fileName))
}

async function getContent(filePath: string) : Promise<any> {
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
        }
    }

    return matterResult.data
}

export default {
    getHomePage: async () => await get('home.md') as HomePageEntry,
    getCvSummary: async () => await get('cv/summary.md') as CvSummaryEntry,
    getCvExperiences: async () => await getAll('cv/experiences') as CvExperienceEntry[],
    getBlogPost: async (id: string): Promise<BlogPostEntry> => await get(`blog/posts/${id}.md`),
    getBlogPosts: async () => await getAll(`blog/posts`) as BlogPostEntry[]
}

export type EntryBase = {
    id: string
}

export type HomePageEntry = EntryBase & {
    author: string
    siteTitle: string
    headerImage: string
    contactData: {
        title: string
        url: string
        faIcon: string
    }[]
    body: string
}

export type BlogPostEntry = EntryBase & {
    title: string
    date: Date
    fbcommentlink?: string
    categories?: string[]
    tags?: string[]
    body: string
}

export type CvSummaryEntry = EntryBase & {
    fullName: string
    title: string
    website: string
    contactDetails: {
        email: string
        phone: string
        linkedIn: string
        location: string
    }
    body: string
    experiences: string[]
}

export type CvExperienceEntry = EntryBase & {
    title: string
    type: string
    location?: string
    institute?: string
    startDate: string
    endDate?: string
    company?: string
    technologies?: string[]
    body: string
}
