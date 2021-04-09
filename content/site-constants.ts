import { OpenGraph } from "next-seo/lib/types";

export const defaultOpenGraph: OpenGraph = {
    type: 'website',
    locale: 'en_GB',
    site_name: 'ferugi.com',
    title: 'Ferugi El Heri - Full-Stack .NET & JavaScript Developer',
    description: 'Full-stack .NET & JavaScript Developer living in Brighton, UK',
    url: 'https://ferugi.com',
    profile: {
        firstName: 'Ferugi',
        lastName: 'El Heri',
        gender: 'Male'
    },
    images: [{ url: `${process.env.HOST}/api/seo-image` }]
}
