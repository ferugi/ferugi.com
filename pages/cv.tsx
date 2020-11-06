import Head from 'next/head'
import { GetStaticProps } from 'next'
import { Experience, getExperiences } from '../lib/cv'
import { ContentsWith } from '../lib/md-html-parser'

export default function Cv({ experiences }: { experiences : ContentsWith<Experience>[] }) {
  return (
      <>
        <Head>
            <title>Ferugi El Heri - Full Stack Developer</title>
        </Head>
        <section>
          <h2>About Me</h2>
        </section>
        <section>
          <h2>Experience</h2>
          { experiences.map((experience, index) => <ExperienceSection experience={experience} key={index}/> ) }
        </section>
      </>
  )
}

export function ExperienceSection({ experience }: { experience: ContentsWith<Experience> }) {
  return (
    <article>
      <h3>
        {experience.title}
      </h3>
      <div dangerouslySetInnerHTML={{ __html: experience.contentHtml }} />
    </article>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    const experiences = await getExperiences()

    return {
      props: {
        experiences
      }
    }
}
