import Head from "next/head";
import styles from "./cv.module.css";
import content, { CvSummaryEntry, CvExperienceEntry } from "@/lib/content";
import { Metadata, ResolvingMetadata } from "next";
import { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "@/lib/cn";
import {
  IconBook,
  IconBrandLinkedin,
  IconBriefcase,
  IconChartBubble,
  IconMail,
  IconMapPin,
  IconPhone,
  IconSchool,
} from "@tabler/icons-react";

//import { useSearchParams } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const summary = await content.getCvSummary();

  return {
    title: `${summary.fullName}: ${summary.title} - CV`,
    description: `CV of ${summary.fullName}, ${summary.title}`,
  };
}

export default async function Cv() {
  const summary = await content.getCvSummary();
  const allCvExperiences = await content.getCvExperiences();

  const experiences = summary.experiences.map((experienceId) => {
    return allCvExperiences.find(
      (cvExperience) => experienceId === cvExperience.id
    );
  });

  // const searchParams = useSearchParams();
  // const highlightQuery = searchParams.get("highlight");

  // const highlights =
  //   typeof highlightQuery === "string"
  //     ? highlightQuery.toLowerCase().split(",")
  //     : [];

  return (
    <>
      <Head>
        <title>
          {summary.fullName}: {summary.title} - CV
        </title>
      </Head>
      <main className={styles.cvContainer}>
        <div className={styles.cv}>
          <header className={styles.cvHeader}>
            <div className={styles.titleBlock}>
              <h1 className={styles.name}>
                <a href={summary.website}>{summary.fullName}</a>
              </h1>
              <h2 className={styles.jobTitle}>{summary.title}</h2>
            </div>
            <ul className={styles.contactDetails}>
              <li>
                <a href={"mailto:" + summary.contactDetails.email}>
                  <IconMail />
                  {summary.contactDetails.email}
                </a>
              </li>
              <li>
                <a href={"tel:" + summary.contactDetails.phone}>
                  <IconPhone />
                  <code>{summary.contactDetails.phone}</code>
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://linkedin.com/in/" + summary.contactDetails.linkedIn
                  }
                >
                  <IconBrandLinkedin />
                  {summary.contactDetails.linkedIn}
                </a>
              </li>
              {!!summary.contactDetails.location && (
                <li>
                  <IconMapPin />
                  {summary.contactDetails.location}
                </li>
              )}
            </ul>
          </header>
          <section className={styles.summary}>
            <div dangerouslySetInnerHTML={{ __html: summary.body }} />
          </section>
          <section>
            <h2>Technologies & Skills</h2>
            <TechnologyAndSkills
              techAndSkills={summary.skillHighlights}
              highlights={[]}
            />
          </section>
          <section>
            <h2>Experience</h2>
            {experiences.map((experience, index) => {
              {
                if (!experience) {
                  return null;
                }

                return (
                  <ExperienceSection
                    experience={experience}
                    //highlights={highlights}
                    key={experience?.id}
                  />
                );
              }
            })}
          </section>
        </div>
      </main>
    </>
  );
}

const TechnologyAndSkills = ({
  techAndSkills,
  highlights,
}: {
  techAndSkills: string[];
  highlights: string[];
}) => {
  const filterUnique = (value: string, index: number, array: string[]) =>
    array.indexOf(value) === index;

  return (
    <div className={styles.technologies}>
      <ul>
        {techAndSkills.filter(filterUnique).map((ts) => (
          <li
            className={
              highlights?.includes(ts.toLowerCase()) ? styles.highlight : ""
            }
            key={ts}
          >
            {ts}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ExperienceSection: FC<
  ComponentPropsWithoutRef<"article"> & {
    experience: CvExperienceEntry;
    highlights?: string[];
  }
> = ({ experience, highlights, className, ...props }) => {
  return (
    <article {...props} className={cn(styles.experience, className)}>
      <h3>
        {getExperienceIcon(experience.type)}
        <span className={styles.experienceTitle}>
          {experience.title}
          {experience.company && <> at {experience.company}</>}
          {experience.institute && <> at {experience.institute}</>}
        </span>
        <span className={styles.startEndDate}>
          {experience.startDate} – {experience.endDate || "present"}
        </span>
      </h3>
      <div className={styles.experienceContents}>
        <div
          className={styles.experienceDescription}
          dangerouslySetInnerHTML={{ __html: experience.body }}
        />
      </div>
    </article>
  );
};

function getFooter(summary: CvSummaryEntry) {
  return (
    <div className={styles.printFooter}>
      <div className={styles.left}>{getLeftFooter()}</div>
      <div className={styles.center}>{summary.fullName}</div>
      <div className={styles.right}>
        <span id="pageNumber"></span> page
      </div>
    </div>
  );
}

function getLeftFooter() {
  const currentDate = new Date(Date.now());

  return currentDate.toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getExperienceIcon(type: string) {
  switch (type) {
    case "job":
      return <IconBriefcase />;

    case "degree":
      return <IconSchool />;

    case "study":
      return <IconBook />;

    case "project":
      return <IconChartBubble />;

    default:
      return null;
  }
}
