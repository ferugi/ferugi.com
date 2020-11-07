import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getAllBlogPosts, PostData } from '../lib/blog/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import { getIndexContentAndData, SiteDetails, ContactData as ContactData } from '../lib/home'
import { ContentsWith } from '../lib/md-html-parser'

export default function Home({ indexContentAndData, allPostData }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{indexContentAndData.siteTitle}</title>
      </Head>
      <ul className={utilStyles.list}>
        { indexContentAndData.contactData.map(contactData => (<ContactIconDisplay contactData={contactData} key={contactData.title} />)) }
      </ul>
      <section dangerouslySetInnerHTML={{ __html: indexContentAndData.contentHtml }} />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>
          Blog
        </h2>
        <ul className={utilStyles.list}>
          { allPostData.map(postData => <PostDisplay postData={postData} key={postData.id} />)}
        </ul>
      </section>
    </Layout>
  )
}

function PostDisplay({ postData }: { postData: PostData }) {
  return (
    <li className={utilStyles.listItem}>
      <Link href={`/blog/${postData.id}`}>
        <a>{postData.title}</a>
      </Link>
      <br />
      <small className={utilStyles.lightText}>
        <Date dateString={postData.date} />
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
  const allPostData = await getAllBlogPosts()
  const indexContentAndData = await getIndexContentAndData()

  return {
    props: {
      indexContentAndData,
      allPostData,
    }
  };
}

interface Props {
  indexContentAndData: ContentsWith<SiteDetails>
  allPostData: ContentsWith<PostData>[]
}
