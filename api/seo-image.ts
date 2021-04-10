import type { NextApiRequest, NextApiResponse } from 'next'
import * as playwright from 'playwright-aws-lambda'
import ReactDOMServer from 'react-dom/server'
import { TestElement } from '../components/test'

type ImageType = 'facebook' | 'twitter'

const ImageProportions: {[k in ImageType]: {
    width: number
    height: number
}} = {
    'facebook': {
        width: 1200,
        height: 630
    },
    'twitter': {
        width: 1012,
        height: 506
    }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    // Process incoming request
    // Get the type the request is for
    // If its a blog post, get the post ID
    // Delegate out to a separate component for rendering

    // Use AWS Lambda playwright browser
    const browser = await playwright.launchChromium();
    
    // TODO: Use image proportions for this
    const page = await browser.newPage({
      viewport: {
        width: 1200,
        height: 630
      }
    });

    const html = ReactDOMServer.renderToStaticMarkup(TestElement)
    await page.setContent(html)

    const screenshot = await page.screenshot({
      type: "png"
    })

    await browser.close()

    res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")
    res.setHeader('Content-Type', 'image/png')

    res.end(screenshot)
}
