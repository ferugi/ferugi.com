import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import { datesToStrings } from '../lib/dateToStrings'
import styles from './home.module.css'
import content from '../lib/content'

export default function Home({ home, allPosts }) {
  return (
    <>
      <Head>
        <title>{home.siteTitle}</title>
      </Head>
      <main className="grid lg:grid-cols-2 min-h-screen">
        <section className={styles.titleSection}>
          <h1 className={styles.siteTitle}>
            {home.siteTitle}
          </h1>
          <ul className={styles.contactLinks}>
            { home.contactData.map(contactData => (<ContactIconDisplay contactData={contactData} key={contactData.title} />)) }
          </ul>
        </section>
        <div>
          <section>
            <h2>
              About Me
            </h2>
            <div dangerouslySetInnerHTML={{ __html: home.body }} />
          </section>
          <section>
            <h2>
              Blog
            </h2>
            <ul>
              { allPosts.map(post => <PostDisplay post={post} key={post.id} />)}
            </ul>
          </section>
        </div>
      </main>
    </>
  )
}

function PostDisplay({ post }: { post: any }) {
  return (
    <li>
      <Link href={`/blog/${post.id}`}>
        <a>{post.title}</a>
      </Link>
      <br />
      <small>
        <Date dateString={post.date as string} />
      </small>
    </li>
  )
}

function ContactIconDisplay({ contactData }){
  return (
    <li>
      <a href={contactData.url} aria-label={contactData.title} >
        <i className={contactData.faIcon} aria-hidden={true} />
      </a>
    </li>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const homePageEntry = await content.getHomePage()
  const allBlogPostEntries = await content.getBlogPosts()

  return {
    props: {
      home: datesToStrings(homePageEntry),
      allPosts: allBlogPostEntries.map(blogPostEntry => datesToStrings(blogPostEntry))
    }
  };
}
