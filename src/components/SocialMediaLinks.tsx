import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandGithub,
} from "@tabler/icons-react";

export interface SocialMediaLinksProps {
  linkedIn: string;
  gitHub: string;
  instagram: string;
}

export default function SocialMediaLinks({
  linkedIn,
  gitHub,
  instagram,
}: SocialMediaLinksProps) {
  return (
    <ul className="list-none inline-grid grid-flow-col auto-cols-max gap-5">
      {linkedIn && (
        <li>
          <a href={linkedIn}>
            <IconBrandLinkedin className="h-7 w-7 lg:h-8 lg:w-8 fill-current" />
            <span className="sr-only">my LinkedIn page</span>
          </a>
        </li>
      )}

      {instagram && (
        <li>
          <a href={instagram}>
            <IconBrandInstagram className="h-7 w-7 lg:h-8 lg:w-8 fill-current" />
            <span className="sr-only">my Instagram page</span>
          </a>
        </li>
      )}

      {gitHub && (
        <li>
          <a href={gitHub}>
            <IconBrandGithub className="h-7 w-7 lg:h-8 lg:w-8 fill-current" />
            <span className="sr-only">my GitHub page</span>
          </a>
        </li>
      )}
    </ul>
  );
}
