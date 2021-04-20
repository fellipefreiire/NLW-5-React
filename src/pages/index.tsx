import { useEffect } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

const Homepage: React.FC = props => {
  //@ts-ignore
  console.log(props.episodes)
  return (
    <>
      <Head>
        <title>Homepage</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/*@ts-ignore*/}
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  )
}

export default Homepage

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  }
}
