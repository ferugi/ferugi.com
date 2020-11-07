import Head from 'next/head'
import { GetStaticProps } from 'next'
import { Experience, getExperiences, Summary, getSummary } from '../lib/cv'
import { ContentsWith } from '../lib/md-html-parser'
import styles from './cv.module.css'

export default function Cv({ summary, experiences }: {
  summary : ContentsWith<Summary>
  experiences : ContentsWith<Experience>[] 
}) {
  return (
      <>
        <Head>
            <title>{summary.fullName}: {summary.title} - CV</title>
            <link rel="stylesheet" href="" />
        </Head>
        <main className={styles.cvContainer}>
          <div className={styles.cv}>
            <header className={styles.cvHeader}>
              <div className={styles.titleBlock}>
                <h1 className={styles.name}>{summary.fullName}</h1>
                <h2 className={styles.jobTitle}>{summary.title}</h2>
              </div>
              <ul className={styles.contactDetails}>
                <li><i className="fas fa-envelope" aria-hidden={true} /> {summary.contactDetails.email}</li>
                <li><i className="fas fa-phone" aria-hidden={true} /> {summary.contactDetails.phone}</li>
                <li><i className="fab fa-linkedin-in" aria-hidden={true} /> {summary.contactDetails.linkedIn}</li>
                <li><i className="fas fa-map-marker-alt" aria-hidden={true} /> {summary.contactDetails.location}</li>
              </ul>
            </header>
            <section>
              <div dangerouslySetInnerHTML={{ __html: summary.contentHtml }} />
            </section>
            <section>
              <h2>Experience</h2>
              { experiences.map((experience, index) => <ExperienceSection experience={experience} key={index}/> ) }
            </section>
          </div>
        </main>
        <div className={styles.printFooter}>
          <div className={styles.left}>TEST LEFT</div>
          <div className={styles.center}>TEST CENTER</div>
          <div className={styles.right}>TEST RIGHT</div>
        </div>
      </>
  )
}

export function ExperienceSection({ experience }: { experience: ContentsWith<Experience> }) {
  return (
    <article className={styles.experience}>
      <h3>
        <i className={getExperienceIconCass(experience.type)} aria-hidden={true} /> 
        <span className={styles.experienceTitle}>{experience.title}</span>
        { experience.company && <span> at {experience.company}</span> }
        { experience.institute && <span> at {experience.institute}</span> }
      </h3>
      <div className={styles.experienceContents}>
        <div className={styles.experienceDescription} dangerouslySetInnerHTML={{ __html: experience.contentHtml }} /> 
        { 
          experience.technologies && 
          <div className={styles.technologies}>
            <h4>Key Technologies</h4>
            <ul>
              {experience.technologies.map(technology => <li>{technology}</li>)}
            </ul>
          </div>
        }
      </div>
    </article>
  )
}

function getExperienceIconCass(type: string) {
  switch (type) {
    case 'job':
      return 'fas fa-briefcase'
    
    case 'study':
      return 'fas fa-graduation-cap'

    case 'project':
      return 'fas fa-project-diagram'

    default:
      return ''
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const summary = await getSummary()
  const experiences = await getExperiences()

  return {
    props: {
      summary,
      experiences
    }
  }
}
