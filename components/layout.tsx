import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import React from 'react'
import { defaultOpenGraph } from '../content/site-constants'
import styles from './layout.module.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-body text-black text-opacity-80 bg-beige">
      <Head>
        <meta name="theme-color" content="#d6f0f5" />
        <link rel="icon" href="/favicon-512.svg" />
        <link rel="mask-icon" href="mask-icon.svg" color="#1a1a1a" />
        <link rel="apple-touch-icon" href="apple-touch-icon-180.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <DefaultSeo openGraph={defaultOpenGraph} />
      {children}
    </div>
  )
}
