import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import Head from 'next/head'

import defaultSEOConfig from '../../next-seo.config'
import Layout from 'components/layout'

import '@fontsource/lexend/latin.css'
import 'styles/globals.css'

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default CustomApp
