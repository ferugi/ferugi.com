import Layout from '../../components/layout'
import { getAllBlogPostIds, getPostPost as getPost, PostData } from '../../lib/blog/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ContentsWith } from '../../lib/md-html-parser'

export default function Post({ post }: {  post: ContentsWith<PostData> }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllBlogPostIds().map(id => {
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
  const post = await getPost(params?.id as string)

  return {
    props: {
      post
    }
  }
}
