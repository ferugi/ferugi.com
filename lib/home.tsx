import path from 'path'
import { Entry, getContentWithBody } from './entry-utils'

export async function getIndexContentAndData() {

    const fileName = path.join(process.cwd(), 'content/home.md')

    return await getContentWithBody<HomePageEntry>(fileName)
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
