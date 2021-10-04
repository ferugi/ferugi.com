import React from "react";
import { LandingScreenEntry } from "../../lib/content";
import { WithoutDate } from "../../lib/dateToStrings";
import styles from './home-social-share-image.module.scss'
import { FaceCanvas } from "./dynamic/face-canvas";

export default function HomeSocialShareImage(landingScreenEntry: WithoutDate<LandingScreenEntry>) {
    return (
      <div className="h-screen w-screen absolute bg-beige overflow-hidden text-black text-opacity-80">
        <div className={styles.outerCanvas}>
          <FaceCanvas showAxesHelper={false} />
        </div>
        <div className={styles.text}>
          <h1 className={styles.title}>{landingScreenEntry.title}</h1>
          <h1 className={styles.description}>{landingScreenEntry.socialShareDescription}</h1>
        </div>
      </div>
    )
}
