import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'

export async function getSummary() {
  const summaryPath = path.join(process.cwd(), 'text/cv/summary.md')
  const summaryData = await getDataAndContent(summaryPath) as SummaryData & { contentHtml: string }

  return summaryData
}

export async function getExperiences() {
  const experiencesDirectory = path.join(process.cwd(), 'text/cv/experience')

  const fileNames = fs.readdirSync(experiencesDirectory)

  const allExperiences = fileNames.map(async fileName => {
    const fullPath = path.join(experiencesDirectory, fileName)

    return await getDataAndContent(fullPath)
  })

  return await Promise.all(allExperiences)
}

async function getDataAndContent(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
    
  const contentHtml = processedContent.toString()

  return {
    contentHtml: contentHtml,
    ...(matterResult.data)
  }
}

export interface Experience {
  type: string
  title: string
  location: string
  startDate: Date
  endDate: Date
  company: string
  institute: string
  technologies: string[]
}

export interface SummaryData {
  fullName: string
  title: string
  contactDetails: ContactDetails
}

export interface ContactDetails {
  email: string
  phone: string
  location: string
}
