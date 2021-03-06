import Layout from "../../components/layout"
import Head from 'next/head'
import Date from '../../components/date'
import { GetStaticProps, GetStaticPaths } from 'next'
import { datesToStrings, WithoutDate } from '../../lib/dateToStrings'
import content, { BlogPostEntry } from '../../lib/content'
import styles from './blog.module.scss'
import FacebookComments from "../../components/fb-comments"

export default function Post({ post }: { post: WithoutDate<BlogPostEntry> }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
      </Head>
    <main className="container max-w-text mx-auto py-6 sm:py-10 md:py-14 px-4 sm:px-5 md:px-6">
      <article>
          <header className="mb-5">
            <h1 className={styles.postTitle}>{post.title}</h1>
            <Date className="font-body text-xs" dateString={post.date as string} />
          </header>
          <div className={styles.postBody} dangerouslySetInnerHTML={{ __html: post.body }} />
        </article>
        { !!post.fbcommentlink &&  
          <FacebookComments commentUrl={post.fbcommentlink} orderBy="reverse_time" width={635}/> }
    </main>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await content.getBlogPosts())
    .map(blogPost => {
      return {
        params: {
          id: blogPost.id
        }
      }
    })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await content.getBlogPost(params?.id as string)
  
  return {
    props: {
      post: datesToStrings(post)
    }
  }
}
