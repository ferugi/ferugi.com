import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React from 'react'
import { DefaultOpenGraph } from '../content/site-constants'
import getConfig from "next/config"

type LayoutProps = { 
  children: React.ReactNode
  socialShareComponent: JSX.Element
}

export default function Layout({ children, socialShareComponent }: LayoutProps) {

  const router = useRouter()

  var useSocialComponent = router.asPath.indexOf('render-social-image') !== -1

  if (useSocialComponent && socialShareComponent) {
    return socialShareComponent
  }

  const { host } = getConfig();

  return (
    <div className="font-body text-black text-opacity-80 bg-beige">
      <Head>
        <meta name="theme-color" content="#d6f0f5" />
        <link rel="icon" href="/favicon-512.svg" />
        <link rel="mask-icon" href="mask-icon.svg" color="#1a1a1a" />
        <link rel="apple-touch-icon" href="apple-touch-icon-180.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <DefaultSeo openGraph={DefaultOpenGraph(host)} />
      {children}
    </div>
  )
}
