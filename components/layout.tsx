import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import styles from './layout.module.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      <div className={styles.footer}>
        Site designed and built by Ferugi El Heri using <Link href="https://nextjs.org/"><a>Next.js</a></Link> 
      </div>
    </div>
  )
}
