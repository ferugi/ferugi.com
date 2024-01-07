import Date from "@/components/Date";
import { Metadata } from "next";
import { datesToStrings } from "@/lib/dateToStrings";
import content from "@/lib/content";
import styles from "./blog.module.scss";
import FacebookComments from "./FacebookComments";

export const metadata: Metadata = {
  title: "TODO: post.title",
  description: "TODO: post.description",
};

type PostRouteParams = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: PostRouteParams) {
  const post = datesToStrings(await content.getBlogPost(id));

  return {
    title: post.title,
    description: post.description,
  } as Metadata;
}

export default async function Post({ params: { id } }: PostRouteParams) {
  const post = datesToStrings(await content.getBlogPost(id));

  return (
    <main className="container max-w-text mx-auto py-6 sm:py-10 md:py-14 px-4 sm:px-5 md:px-6">
      <article>
        <header className="mb-5">
          <h1 className={styles.postTitle}>{post.title}</h1>
          <Date
            className="font-body text-xs"
            dateString={post.date as string}
          />
        </header>
        <div
          className={styles.postBody}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>
      {!!post.fbcommentlink && (
        <FacebookComments
          commentUrl={post.fbcommentlink}
          orderBy="reverse_time"
          width={635}
        />
      )}
    </main>
  );
}
