import type { NextApiRequest, NextApiResponse } from 'next'
import * as playwright from 'playwright-aws-lambda'
import { seoImageSizes, socialImageQueryParam } from './seo-image-helpers';

// Function timeout on personal plan is 5 seconds so value should be lower
const functionTimeOut = 4.5 * 1000;

export async function seoImageHandler(req: NextApiRequest, res: NextApiResponse) {

  const { path , type } = getValidPathAndTypeFromQuery(req);
  
  const screenshot = await screenshotSeoPage(type, path);
  
  setResponseValues(res, screenshot);
}

function getValidPathAndTypeFromQuery(req: NextApiRequest){

  const { path , type } = req.query;

  if (!path || path instanceof Array || !type || type instanceof Array || !seoImageSizes[type]) {
    throw 'Invalid query parameters: "path" and "type" should be set.';
  }

  return { path, type };
}

async function screenshotSeoPage(type: string, path: string) {
  const browser = await playwright.launchChromium();

  const imageSize = seoImageSizes[type];

  const page = await browser.newPage({
    viewport: imageSize
  });

  const targetUrl = process.env.HOST.concat(path) + `?${socialImageQueryParam}`;

  await page.goto(targetUrl, {
    timeout: functionTimeOut
  });

  await page.waitForSelector('canvas');

  const screenshot = await page.screenshot({
    type: "png"
  });

  await browser.close();
  
  return screenshot;
}

function setResponseValues(res: NextApiResponse<any>, screenshot: Buffer) {
  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");
  res.setHeader('Content-Type', 'image/png');

  res.end(screenshot);
}
