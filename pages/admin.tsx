import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic'
import path from 'path'
import YAML from 'yaml'
import fs from 'fs'
import { CmsConfig } from 'netlify-cms-core'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

    const config = getNetlifyCmsConfig()

    modifyConfig(config)

    return {
      props: {
        config
      }
    }
}

export default function AdminPage({ config }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const NetlifyCmsLoader = dynamic(
        async () => {
            const cms = (await import("netlify-cms-app")).default

            return (config: CmsConfig) => {
                cms.init({ config })

                return (<></>)
            }
        },
        { ssr: false });

    return (
        <NetlifyCmsLoader {...config}/>
    )
};

  
function getNetlifyCmsConfig() {
    const configPath = path.join(process.cwd(), 'netlify-cms-config.yml')

    const fileContents = fs.readFileSync(configPath, 'utf8') as string

    return YAML.parse(fileContents) as CmsConfig
}

function modifyConfig(config: CmsConfig) {
    // Setting config values to environment variables
    config.site_url = process.env.NETLIFY_BASE_URL || config.site_url
    config.backend.base_url = process.env.NETLIFY_AUTH_BASE_URL || config.backend.base_url
}
