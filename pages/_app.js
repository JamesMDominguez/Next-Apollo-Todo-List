import '../styles/globals.css'
import '../styles/nprogress.css'
import NProgress from 'nprogress';
import Router from 'next/router'
import client from "../apollo-client";
import { ApolloProvider } from "@apollo/client";
import { Auth0Provider } from "@auth0/auth0-react";
Router.events.on('routeChangeStart', ()=> NProgress.start());
Router.events.on('routeChangeComplete', ()=> NProgress.done());
Router.events.on('routeChangeError', ()=> NProgress.done());

function MyApp({ Component, pageProps }) {
  return(
    <Auth0Provider
    domain="dev-x8a3sk5w.us.auth0.com"
    clientId="kCetOMQHrtevkH8M6qv32HV6ChsuXBAn"
    redirectUri="http://localhost:3000/project"
  >
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
    </Auth0Provider>
  )
}

export default MyApp
