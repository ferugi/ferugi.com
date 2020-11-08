import fs from 'fs'
import path from 'path'
import { getContentsWithData } from './md-html-parser'

export async function getSummary() {
  const summaryPath = path.join(process.cwd(), 'content/cv/summary.md')

  const summary = await getContentsWithData<Summary>(summaryPath)

  return summary
}

export async function getExperiences() {
  const experiencesDirectory = path.join(process.cwd(), 'content/cv/experience')

  const fileNames = fs.readdirSync(experiencesDirectory)

  const allExperiences = fileNames.map(async fileName => {
    const fullPath = path.join(experiencesDirectory, fileName)

    return await getContentsWithData<Experience>(fullPath)
  })

  const sortedExperiences = (await Promise.all(allExperiences)).sort((a, b) => {
    if (a.startDate < b.startDate) {
      return 1
    } else {
      return -1
    }
  })

  return await Promise.all(sortedExperiences)
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
  contentHtml: string
}

export interface Summary {
  fullName: string
  title: string
  contactDetails: ContactDetails
  contentHtml: string
}

export interface ContactDetails {
  email: string
  phone: string
  linkedIn: string
  location: string
}
