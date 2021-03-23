import { Auth0Provider } from '@auth0/auth0-react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_DOMAIN}
      redirectUri="http://localhost:3000"
    >
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default MyApp
