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
        <>
            <FaceCanvas style={{ position: 'absolute'}} />
            <div className="relative w-full flex flex-col p-4 lg:p-32 h-96 lg:h-screen-90 text-center lg:text-left pointer-events-none">
                <section className="flex-grow">
                    <h1 className="text-6xl mb-3 lg:text-8xl font-bold font-display lg:mb-6 lg:max-w-text-12 lg:-ml-1">
                        {entry.title}
                    </h1>
                    <h2 className="text-xl lg:text-3xl font-display-mono mb-6 lg:max-w-text-32">
                        {entry.tagline}
                    </h2>
                </section>
                <section className="flex-none">
                    <h2 className="text-4xl mb-2 lg:text-5xl font-semibold font-display mb-1 lg:max-w-text lg:-ml-1">Want to talk?</h2>
                    <p className="text-xl mb-2 lg:text-2xl font-display-mono lg:max-w-text">
                        Email <a className="pointer-events-auto" href={'mailto:' + entry.contactLinks.email}>{entry.contactLinks.email}</a> or connect via: <br/>
                    </p>
                    <SocialMediaLinks {...entry.contactLinks} />
                </section>
            </div>
        </>
    )
}

type SocialMediaLinksProps = {
    linkedIn: string
    gitHub: string
    instagram: string
}

const SocialMediaLinks = ({linkedIn, gitHub, instagram} : SocialMediaLinksProps) => {
    return (
        <ul className="list-none inline-grid grid-flow-col auto-cols-max gap-5">
            {linkedIn && <li>
                <a href={linkedIn}><LinkedInIcon className="h-8 w-8 fill-current"/></a>
            </li>}

            { instagram && <li>
                <a href={instagram}><InstagramIcon className="h-8 w-8 fill-current"/></a>
            </li> }
            
            { gitHub && <li>
                <a href={gitHub}><GitHubIcon className="h-8 w-8 fill-current"/></a>
            </li> }
        </ul>
    )
}
