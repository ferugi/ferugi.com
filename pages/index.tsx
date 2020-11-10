import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getAllBlogPosts, PostWithContents } from '../lib/blog/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import { getIndexContentAndData, HomePageEntry, ContactData as ContactData } from '../lib/home'

export default function Home({ indexContentAndData, allPosts }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{indexContentAndData.siteTitle}</title>
      </Head>
      <ul className={utilStyles.list}>
        { indexContentAndData.contactData.map(contactData => (<ContactIconDisplay contactData={contactData} key={contactData.title} />)) }
      </ul>
      <section dangerouslySetInnerHTML={{ __html: indexContentAndData.body }} />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>
          Blog
        </h2>
        <ul className={utilStyles.list}>
          { allPosts.map(post => <PostDisplay post={post} key={post.id} />)}
        </ul>
      </section>
    </Layout>
  )
}

function PostDisplay({ post }: { post: PostWithContents }) {
  return (
    <li className={utilStyles.listItem}>
      <Link href={`/blog/${post.id}`}>
        <a>{post.title}</a>
      </Link>
      <br />
      <small className={utilStyles.lightText}>
        <Date dateString={post.date as string} />
      </small>
    </li>
  )
}

function ContactIconDisplay({ contactData }: { contactData: ContactData }){
  return (
    <li>
      <a href={contactData.url} aria-label={contactData.title} >
        <i className={contactData.faIcon} aria-hidden={true} />
      </a>
    </li>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllBlogPosts()
  const indexContentAndData = await getIndexContentAndData()

  return {
    props: {
      indexContentAndData,
      allPosts,
    }
  };
}

interface Props {
  indexContentAndData: HomePageEntry
  allPosts: PostWithContents[]
}
