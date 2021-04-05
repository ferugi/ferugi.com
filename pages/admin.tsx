import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic'
import { CmsConfig } from 'netlify-cms-core'
import config from '../netlify-cms-config.yml'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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

function modifyConfig(config: CmsConfig) {
    // Setting config values to environment variables
    config.site_url = process.env.NETLIFY_BASE_URL || config.site_url
    config.backend.base_url = process.env.NETLIFY_AUTH_BASE_URL || config.backend.base_url
}
