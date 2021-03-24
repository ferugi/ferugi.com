import Head from 'next/head';
import React from 'react';

export default function ArticleLayout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="font-body text-black text-opacity-80 bg-beige">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container max-w-text mx-auto py-6 sm:py-10 md:py-14 px-4 sm:px-5 md:px-6">
        {children}
      </main>
    </div>
  )
}
