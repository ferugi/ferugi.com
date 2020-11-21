

declare module 'content?collection=pages/home&includeBody=true*' {
    export default {} as Homepage
}

declare module 'content?collection=pages/cvSummary&includeBody=true*' {
    export default {} as CvSummary
}

declare module 'content?collection=blogPosts&filePath=*' {
    export default {} as BlogPost
}

declare module 'content?collection=blogPosts*' {
    export default {} as BlogPost[]
}

declare module 'content?collection=cvExperiences&includeBody=true*' {

    export default {} as CvExperience[]
}

declare module 'content-types' {
    export type EntryBase = {
        hasBody: boolean,
        filePath: string
    }
    
    export type Homepage = EntryBase & {
        author: string
        siteTitle: string
        headerImage: string
        contactData: {
            title: string
            url: string
            faIcon: string
        }[]
        body: string
    }
    
    export type BlogPost = EntryBase & {
        title: string
        date: Date
        fbcommentlink?: string
        categories?: string[]
        tags?: string[]
        body: string
    }

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
}
