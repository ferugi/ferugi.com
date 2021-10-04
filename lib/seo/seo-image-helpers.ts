import { useRouter } from "next/dist/client/router";

export function getSeoUrl(path: string, type: keyof typeof seoImageSizes) {
  // TODO: Validate

  return `${process.env.HOST}/api/seo-image?path=${path}&type=${type}`;
}

export const seoImageEndpoint = `${process.env.HOST}/api/seo-image`;

export const socialImageQueryParam = 'render-social-image';

export function useSocialComponent() {
  const router = useRouter()

  return router.asPath.indexOf(socialImageQueryParam) !== -1
}

export const seoImageSizes = {
  'facebook': {
      width: 1200,
      height: 630
  },
  'twitter': {
      width: 1012,
      height: 506
  }
} as const;
