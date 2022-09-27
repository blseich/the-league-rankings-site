import NextApp from 'next/app'
import { CacheProvider } from '@emotion/react'

// Use only { cache } from 'emotion'. Don't use { css }.
import { cache } from 'emotion'

import { globalStyles } from '../shared/styles'
import Layout from '../client/components/layout';

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <CacheProvider value={cache}>
        {globalStyles}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CacheProvider>
    )
  }
}