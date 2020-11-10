import fs from 'fs'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

export async function getEntryWithBody<TEntry extends Entry>(filePath: string) : Promise<TEntry> {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)

    const body = processedContent.toString() as HtmlString

    return {
        body,
        ...matterResult.data
    } as TEntry
}

export type HtmlString = string

export type Entry = {
  body: HtmlString
}
