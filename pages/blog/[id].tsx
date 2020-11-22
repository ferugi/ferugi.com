import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import { GetStaticProps, GetStaticPaths } from 'next'
import { datesToStrings } from '../../lib/dateToStrings'
import content from '../../lib/content'

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1>{post.title}</h1>
        <div>
          <Date dateString={post.date as string} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </article>
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
