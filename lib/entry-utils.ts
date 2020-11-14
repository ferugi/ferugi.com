import fs from 'fs'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

export async function getContentWithBody<TEntry extends { body: string }>(filePath: string) : Promise<TEntry> {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)

    const body = processedContent.toString()

    return {
        body,
        ...matterResult.data
    } as TEntry
}