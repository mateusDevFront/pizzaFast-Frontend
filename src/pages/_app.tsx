import '../../styles/globals.scss'
import {AppProps} from 'next/app'

import { AuthProvider} from '../components/context/AuthContext'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
    <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp