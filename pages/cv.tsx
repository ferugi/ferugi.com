import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { Experience, getExperiences, Summary, getSummary } from '../lib/cv'
import styles from './cv.module.css'

export default function Cv({ summary, experiences, highlights }: {
  summary : Summary
  experiences : Experience[] 
  highlights: string[]
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
                <li>
                  <a href={'mailto:' + summary.contactDetails.email}>
                    <i className="fas fa-envelope" aria-hidden={true} /> {summary.contactDetails.email}
                  </a>
                </li>
                <li>
                  <a href={'tel:' + summary.contactDetails.phone}>
                    <i className="fas fa-phone" aria-hidden={true} /> {summary.contactDetails.phone}
                  </a>
                </li>
                <li>
                  <a href={'https://linkedin.com/in/' + summary.contactDetails.linkedIn}>
                  <i className="fab fa-linkedin-in" aria-hidden={true} /> {summary.contactDetails.linkedIn}
                  </a>
                </li>
                <li><i className="fas fa-map-marker-alt" aria-hidden={true} /> {summary.contactDetails.location}</li>
              </ul>
            </header>
            <section>
              <div dangerouslySetInnerHTML={{ __html: summary.contentHtml }} />
            </section>
            <section>
              <h2>Experience</h2>
              { experiences.map((experience, index) => <ExperienceSection experience={experience} highlights={highlights} key={index}/> ) }
            </section>
          </div>
        </main>
      </>
  )
}

export function ExperienceSection({ experience, highlights }: { experience: Experience, highlights: string[] }) {

  return (
    <article className={styles.experience}>
      <h3>
        <i className={getExperienceIconCass(experience.type)} aria-hidden={true} /> 
        <span className={styles.experienceTitle}>{experience.title}
          { experience.company && <> at {experience.company}</> }
          { experience.institute && <> at {experience.institute}</> }
        </span>
        <span className={styles.startEndDate}>{experience.startDate} – {experience.endDate || 'present'}</span>
      </h3>
      <div className={styles.experienceContents}>
        <div className={styles.experienceDescription} dangerouslySetInnerHTML={{ __html: experience.contentHtml }} /> 
        { 
          experience.technologies && 
          <div className={styles.technologies}>
            <ul>
              {experience.technologies.map(technology => <li className={highlights?.includes(technology.toLowerCase()) ? styles.highlight : ''}>
                {technology}
              </li>)}
            </ul>
          </div>
        }
      </div>
    </article>
  )
}

function getFooter(summary: Summary) {
  return (
    <div className={styles.printFooter}>
      <div className={styles.left}>{getLeftFooter()}</div>
      <div className={styles.center}>{summary.fullName}</div>
      <div className={styles.right}><span id="pageNumber"></span> page</div>
    </div>
  )
}

function getLeftFooter() {
  const currentDate = new Date(Date.now());
  const dateOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }

  const locale = 'en-GB'

  return currentDate.toLocaleString(locale, dateOptions)
}

function getExperienceIconCass(type: string) {
  switch (type) {
    case 'job':
      return 'fas fa-briefcase'
    
    case 'degree':
      return 'fas fa-graduation-cap'

    case 'study':
      return 'fas fa-book-open'

    case 'project':
      return 'fas fa-project-diagram'

    default:
      return ''
  }
}

export const getServerSideProps: GetServerSideProps = async(context) => {

  const summary = await getSummary()
  const experiences = await getExperiences()
  const highlightQuery = context.query.highlight

  let highlights: string[] = []

  if (typeof(highlightQuery) === 'string'){
    highlights = highlightQuery.toLowerCase().split(',')
  }

  return {
    props: {
      summary,
      experiences,
      highlights
    }
  }
}
