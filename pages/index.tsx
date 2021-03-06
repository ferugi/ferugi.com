import Head from 'next/head'
import { GetStaticProps } from 'next'
import { datesToStrings, WithoutDate } from '../lib/dateToStrings'
import styles from './home.module.css'
import content, { LandingScreenEntry } from '../lib/content'
import React from 'react'
import { LandingScreen } from '../components/home/landing-screen'
import Layout from "../components/layout"

type HomeProps = {
  landingScreenEntry: WithoutDate<LandingScreenEntry>
}

export default function Home({ landingScreenEntry } : HomeProps) {
  return (
    <Layout>
      <Head>
        <title>{landingScreenEntry.title}</title>
        <meta name="description" content={landingScreenEntry.description} />
      </Head>
      <main className="min-h-screen relative">
        <LandingScreen entry={landingScreenEntry}  />
      </main>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const landingScreenEntry = await content.getLandingScreen()

  return {
    props: {
      landingScreenEntry: datesToStrings(landingScreenEntry),
    }
  };
}
