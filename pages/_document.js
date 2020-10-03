import Document, { Html, Head, Main, NextScript } from 'next/document'
import { extractCritical } from 'emotion-server'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = extractCritical(initialProps.html)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Patua+One&family=Roboto&family=Roboto:wght@900&display=swap" rel="stylesheet" />
          <script src="https://kit.fontawesome.com/3bd0b16fa8.js" crossOrigin="anonymous"></script>
          <link rel="stylesheet" href="https://unpkg.com/react-vis/dist/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}