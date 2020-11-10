import fs from 'fs'
import path from 'path'
import { Entry, getEntryWithBody, HtmlString } from './entry-utils'

export async function getSummary() {
  const summaryPath = path.join(process.cwd(), 'content/cv/summary.md')

  const summary = await getEntryWithBody<Summary>(summaryPath)

  return summary
}

export async function getExperiences() {
  const experiencesDirectory = path.join(process.cwd(), 'content/cv/experiences')

  const fileNames = fs.readdirSync(experiencesDirectory)

  const allExperiences = fileNames.map(async fileName => {
    const fullPath = path.join(experiencesDirectory, fileName)

    return await getEntryWithBody<Experience>(fullPath)
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

export interface Experience extends Entry {
  type: string
  title: string
  location: string
  startDate: Date
  endDate: Date
  company: string
  institute: string
  technologies: string[]
}

export interface Summary extends Entry {
  fullName: string
  title: string
  contactDetails: ContactDetails
}

export interface ContactDetails {
  email: string
  phone: string
  linkedIn: string
  location: string
}
