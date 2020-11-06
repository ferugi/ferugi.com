import path from 'path'
import { getContentsWithData } from './md-html-parser'

export async function getIndexContentAndData() {

    const fileName = path.join(process.cwd(), 'text/index.md')

    return await getContentsWithData<SiteDetails>(fileName)
}

export interface SiteDetails {
    author: string
    siteTitle: string
    contactData: ContactData[]
}

export interface ContactData {
    title: string
    url: string
    faIcon: string
}
