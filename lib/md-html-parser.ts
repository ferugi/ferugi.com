import fs from 'fs'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

export async function getContentsWithData<TData>(filePath: string) : Promise<ContentsWith<TData>> {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)

    return {
        contentHtml: processedContent.toString(),
        ...matterResult.data as TData
    }
}

export type ContentsWith<TData> = { contentHtml: string } & TData
