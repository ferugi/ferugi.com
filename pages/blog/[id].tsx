import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { content } from 'netlify-cms-content-provider'
import { datesToStrings } from '../../lib/dateToStrings'

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date as string} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  debugger
  const test = await content().blogPosts.getAll()
  const paths =  content()
    .blogPosts
    .getAllIds()
    .map(id => {
      return {
        params: {
          id
        }
      }
    })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await content().blogPosts.get(params?.id as string)

  debugger
  return {
    props: {
      post: datesToStrings(post)
    }
  }
}
