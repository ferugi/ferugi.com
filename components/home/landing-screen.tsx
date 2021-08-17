import React from 'react'
import { LandingScreenEntry } from '../../lib/content'
import { FaceCanvas } from './dynamic/face-canvas'
import { SocialMediaLinks } from './social-media-links'
import styles from './landing-screen.module.scss'

type LandingScreenProps = {
    entry: LandingScreenEntry
}

export const LandingScreen = ({ entry } : LandingScreenProps) => {
    return (
        <>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <FaceCanvas showAxesHelper={process.env.NODE_ENV === 'development'} />
                </div>
            </div>
            <div className="relative h-auto w-full flex flex-col pt-60 p-4 md:p-12 md:pb-2 lg:p-16 xl:p-32 h-96 lg:h-screen-90 text-center md:text-left">
                <section className="flex-grow md:mb-5">
                    <h1 className="mb-3 text-6xl lg:text-7xl xl:text-8xl font-bold font-display lg:mb-6 lg:max-w-text-12 lg:-ml-1">
                        {entry.title}
                    </h1>
                    <h2 className="text-xl xl:text-3xl font-display-mono mb-6 md:max-w-text-32">
                        {entry.tagline}
                    </h2>
                </section>
                <section className="flex-none">
                    <h2 className="mb-2 text-4xl xl:text-5xl font-semibold font-display mb-1 lg:max-w-text lg:-ml-1">Want to talk?</h2>
                    <p className="mb-2 text-xl xl:text-2xl font-display-mono md:max-w-text-32 lg:max-w-text">
                        Email <a href={'mailto:' + entry.contactLinks.email}>{entry.contactLinks.email}</a> or connect via: <br/>
                    </p>
                    <SocialMediaLinks {...entry.contactLinks} />
                </section>
            </div>
        </>
    )
}
