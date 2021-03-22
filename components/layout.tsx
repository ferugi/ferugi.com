import Head from 'next/head'
import React from 'react'
import styles from './layout.module.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-body text-black text-opacity-80 bg-beige">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  )
}
