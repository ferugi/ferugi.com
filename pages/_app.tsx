import '../styles/global.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'

import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}