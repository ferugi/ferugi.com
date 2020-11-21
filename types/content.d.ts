type EntryBase = {
    hasBody: boolean,
    filePath: string
}

declare module 'content?pages/homePage!*' {
    export type Homepage = EntryBase & {
        author: string
        siteTitle: string
        contactData: {
            title: string
            url: string
            faIcon: string
        }[]
        body: string
    }

    export default {} as Homepage
}

declare module 'content?collection=pages/cvSummary&includeBody=true!' {
    export type CvSummary = EntryBase & {
        fullName: string
        title: string
        website: string
        contactDetails: {
            email: string
            phone: string
            linkedIn: string
            location: string
        }
        body: string
        experiences: string[]
    }

    export default {} as CvSummary
}

declare module 'content?blogPosts!*' {
    export type BlogPost = EntryBase & {
        title: string
        date: Date
        fbcommentlink?: string
        categories?: string[]
        tags?: string[]
        body: string
    }

    export default {} as BlogPost[]
}

declare module 'content?collection=cvExperiences&includeBody=true!' {
    export type CvExperience = EntryBase & {
        title: string
        type: string
        location?: string
        institute?: string
        startDate: string
        endDate?: string
        company?: string
        technologies?: string[]
        body: string
    }

    export default {} as CvExperience[]
}

declare module 'content?*' {
    export default {} as any
}
