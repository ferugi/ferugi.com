import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { PostWithContents } from '../lib/blog/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import { datesToStrings } from '../lib/dateToStrings'
import home from 'content?collection=pages/home&includeBody=true!'
import blogPosts from 'content?collection=blogPosts!'

export default function Home({ home, allPosts }) {
  return (
    <Layout home>
      <Head>
        <title>{home.siteTitle}</title>
      </Head>
      <ul className={utilStyles.list}>
        { home.contactData.map(contactData => (<ContactIconDisplay contactData={contactData} key={contactData.title} />)) }
      </ul>
      <section dangerouslySetInnerHTML={{ __html: home.body }} />
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
  return {
    props: {
      home: datesToStrings(home),
      allPosts: [datesToStrings(blogPosts)]
    }
  };
}
