import { useEffect } from "react"

type CommentProperties = {
    commentUrl?: string 
    colorScheme?: 'light' | 'dark'
    lazyLoad?: boolean
    mobileOptimization?: boolean
    numberOfPosts?: number
    orderBy?: 'social' | 'time' | 'reverse_time'
    width?: number
}

export default function FacebookComments(props : CommentProperties) {
    useEffect(() => {
        const facebookScript = document.createElement("script")
        facebookScript.async = true
        facebookScript.defer = true
        facebookScript.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v10.0&appId=929230953797958&autoLogAppEvents=1"
        facebookScript.nonce = "KVitKswp";

        document.body.appendChild(facebookScript);

        const fbRootElement = document.createElement("div")
        fbRootElement.id = "fb-root"

        document.body.appendChild(fbRootElement);

    }, [])

    return (
        <div className="fb-comments" 
            data-colorscheme={props.colorScheme}
            data-href={props.commentUrl} 
            data-lazy={props.lazyLoad}
            data-mobile={props.mobileOptimization}
            data-numposts={props.numberOfPosts}
            data-order-by={props.orderBy}
            data-width={props.width}>
        </div>
    )
}
