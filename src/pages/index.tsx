import Head from 'next/head'
import Home from '../components/Home'

const Homepage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />
    </div>
  )
}

export default Homepage
