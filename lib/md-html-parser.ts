import fs from 'fs'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

export async function getContentsWithData<TData extends { contentHtml: string }>(filePath: string) : Promise<TData> {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)

    const contentHtml = processedContent.toString()

    return {
        contentHtml,
        ...matterResult.data
    } as TData
}
