import path from 'path'
import { Entry, getEntryWithBody } from './entry-utils'

export async function getIndexContentAndData() {

    const fileName = path.join(process.cwd(), 'content/home.md')

    return await getEntryWithBody<HomePageEntry>(fileName)
}

export interface HomePageEntry extends Entry {
    author: string
    siteTitle: string
    contactData: ContactData[]
}

export interface ContactData {
    title: string
    url: string
    faIcon: string
}
