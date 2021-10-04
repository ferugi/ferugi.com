import { WithoutDate } from '../../lib/dateToStrings';
import { BlogPostEntry } from '../../lib/content';

export function BlogSocialShareImage(post: WithoutDate<BlogPostEntry>) {
  return (
    <div className="h-screen w-screen">
      <h1 className="font-display text-8xl">{post.title}</h1>
    </div>
  );
}
