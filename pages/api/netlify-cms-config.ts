import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import YAML from 'yaml'
import fs from 'fs'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const config = getNetlifyCmsConfig()

    if (!config) {
        res.statusCode = 404
        return
    }

    modifyConfig(config)

    const responseText = YAML.stringify(config)

    res.setHeader('Content-Type', 'text/yaml')
    res.statusCode = 200
    res.end(responseText)
}

function getNetlifyCmsConfig(){
    const configPath = path.join(process.cwd(), 'netlify-cms-config.yml')

    const fileContents = fs.readFileSync(configPath, 'utf8') as string

    return YAML.parse(fileContents)
}

function modifyConfig(config: any) {
    // Setting config values to environment variables
    config.site_url = process.env.NETLIFY_BASE_URL || config.site_url
    config.backend.base_url = process.env.NETLIFY_AUTH_BASE_URL || config.backend.base_url
}
