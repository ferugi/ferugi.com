import fs from 'fs'
import path from 'path'
import { Entry, getContentWithBody } from '../entry-utils'

const postsDirectory = path.join(process.cwd(), 'content/blog/posts')

export async function getAllBlogPosts(): Promise<PostWithContents[]> {

  const fileNames = fs.readdirSync(postsDirectory)

  const allPostData = fileNames.map(async fileName => {
    const id = getBlogPostIdFromFileName(fileName)
    const filePath = path.join(postsDirectory, fileName)

    const postData = await getContentWithBody<PostData & {id: string} >(filePath)
    
    return {
      id,
      ...postData
    }
  })

  const sortedPosts = (await Promise.all(allPostData))
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
    .map(postData => {
      const date = (postData.date instanceof Date && postData.date.toISOString()) || postData.date

      return {
        ...postData,
        date,
      } as PostWithContents
    })

  return sortedPosts
}

export async function getPostById(id: string): Promise<PostWithContents> {

  if (!id) {
    throw new Error("Invalid ID")
  }

  const filePath = path.join(postsDirectory, `${id}.md`)
  const postData = await getContentWithBody<PostData>(filePath)
  const date = (postData.date instanceof Date && postData.date.toISOString()) || postData.date

  return {
    id,
    ...postData,
    date,
  } as PostWithContents
}

export function getAllBlogPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => getBlogPostIdFromFileName(fileName))
}

function getBlogPostIdFromFileName(fileName: string) {
  return fileName.replace(/\.md$/, '')
}

export interface PostWithContents extends Entry {
  date: string
  title: string
  id: string
}

export interface PostData extends Entry {
  date: Date
  title: string
}
