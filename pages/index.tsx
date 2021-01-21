import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { datesToStrings } from '../lib/dateToStrings'
import styles from './home.module.css'
import content from '../lib/content'
import React from 'react'
import { Home3DBackground } from '../components/home-3d-background'
import Layout from '../components/layout'

export default function Home({ home }) {
  return (
    <Layout>
      <Head>
        <title>{home.siteTitle}</title>
      </Head>
      <div className={styles.canvasContainer}>
        <Home3DBackground />
      </div>
      <main className={styles.home}>
        <section className={styles.aboutMe}>
          <h1 className={styles.siteTitle}>
            {home.siteTitle}
          </h1>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: home.body }} />
          <ul className={styles.contactLinks}>
            { home.contactData.map(contactData => (<ContactIconDisplay contactData={contactData} key={contactData.title} />)) }
          </ul>
        </section>
      </main>
    </Layout>
  )
}

function ContactIconDisplay({ contactData }){
  return (
    <li className={styles.contactLink}>
      <Link href={contactData.url} aria-label={contactData.title} >
        <a>
          <i className={`${styles.contactIcon} ${contactData.faIcon}`} aria-hidden={true} /> {contactData.title}
        </a>
      </Link>
    </li>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const homePageEntry = await content.getHomePage()

  return {
    props: {
      home: datesToStrings(homePageEntry),
    }
  };
}
