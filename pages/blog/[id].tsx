import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { datesToStrings } from '../../lib/dateToStrings'
import blogPosts from 'content?collection=blogPosts!'
import path from 'path'

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
  const paths = blogPosts
    .map(blogPost => {
      const id = idFromPath(blogPost.filePath)

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
  const filePath = (params?.id as string) + '.md'
  const post = await import(`content?collection=blogPosts&filePath=${filePath}!`)
  
  return {
    props: {
      post: datesToStrings(post)
    }
  }
}

function idFromPath(filePath: string) {
  return path.basename(filePath, path.extname(filePath))
}