import fs from 'fs'
import path from 'path'
import { getContentsWithData, ContentsWith } from '../md-html-parser'

const postsDirectory = path.join(process.cwd(), 'content/blog/posts')

export async function getAllBlogPosts(): Promise<ContentsWith<PostData>[]> {

  const fileNames = fs.readdirSync(postsDirectory)

  const allPosts = fileNames.map(async fileName => {
    const id = getBlogPostIdFromFileName(fileName)
    const filePath = path.join(postsDirectory, fileName)

    const post = await getContentsWithData<PostData>(filePath)
    post.id = id
    
    return post
  })

  const sortedPosts = (await Promise.all(allPosts)).sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })

  return sortedPosts
}

export async function getPostPost(id: string) {

  if (!id) {
    throw new Error("Invalid ID")
  }

  const filePath = path.join(postsDirectory, `${id}.md`)
  const post = await getContentsWithData<{ date: string; title: string }>(filePath)

  return {
    id,
    ...post
  }
}

export function getAllBlogPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => getBlogPostIdFromFileName(fileName))
}

function getBlogPostIdFromFileName(fileName: string) {
  return fileName.replace(/\.md$/, '')
}

export interface PostData {
  date: string
  title: string
  id: string
}
