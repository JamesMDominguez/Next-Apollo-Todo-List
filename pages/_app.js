import '../styles/globals.css'
import '../styles/nprogress.css'
import NProgress from 'nprogress';
import Router from 'next/router'
import client from "../apollo-client";
import { ApolloProvider } from "@apollo/client";
Router.events.on('routeChangeStart', ()=> NProgress.start());
Router.events.on('routeChangeComplete', ()=> NProgress.done());
Router.events.on('routeChangeError', ()=> NProgress.done());

function MyApp({ Component, pageProps }) {
  return(
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
