import React, { Fragment } from 'react'
import { LandingScreenEntry } from '../../lib/content'
import { FaceCanvas } from './dynamic/face-canvas'
import LinkedInIcon from '../../content/icons/linkedin.svg'
import InstagramIcon from '../../content/icons/instagram.svg'
import GitHubIcon from '../../content/icons/github.svg'

type LandingScreenProps = {
    entry: LandingScreenEntry
}

export const LandingScreen = ({ entry } : LandingScreenProps) => {
    return (
        <section style={{ height: '90vh' }}>
            <FaceCanvas style={{ position: 'absolute', height: '90vh' }} />
            <div className="relative top-0 h-full flex flex-col">
                <section className="flex-grow mt-32 ml-32">
                    <h1 className="text-8xl font-bold font-display mb-6 w-text-2/5">
                        {entry.title}
                    </h1>
                    <h2 className="text-3xl font-display-mono mb-6 w-text-2/5">
                        {entry.tagline}
                    </h2>
                </section>
                <section className="flex-none mb-32 ml-32">
                    <h2 className="text-4xl font-semibold font-display mb-1 w-text">Want to talk?</h2>
                    <span className="text-2xl font-display-mono w-text">Send an email to <a href={'mailto:' + entry.contactLinks.email}>{entry.contactLinks.email}</a> or connect via:</span>
                    <SocialMediaLinks {...entry.contactLinks} />
                </section>
            </div>
        </section>
    )
}

type SocialMediaLinksProps = {
    linkedIn: string
    gitHub: string
    instagram: string
}

const SocialMediaLinks = ({linkedIn, gitHub, instagram} : SocialMediaLinksProps) => {
    return (
        <ul className="list-none grid grid-flow-col auto-cols-max gap-2">
            {linkedIn && <li>
                <a href={linkedIn}><LinkedInIcon className="h-8 w-8"/></a>
            </li>}

            { instagram && <li>
                <a href={instagram}><InstagramIcon className="h-8 w-8"/></a>
            </li> }
            
            { gitHub && <li>
                <a href={gitHub}><GitHubIcon className="h-8 w-8"/></a>
            </li> }
        </ul>
    )
}
