import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import { api } from '../../services/api'

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../../../utils/convertDurationToTimeString'

import * as S from '../../styles/episodes'
import { usePlayer } from '../../contexts/PlayerContext'

type Episode = {
  id: string
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  duration: number
  durationAsString: string
  description: string
  url: string
}

type EpisodeProps = {
  episode: Episode
}

const Episode: React.FC<EpisodeProps> = ({ episode }): JSX.Element => {
  const { play } = usePlayer()

  return (
    <S.Episode>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>
      <S.ThumbnailContainer>
        <Link href='/'>
          <button type='button'>
            <img src='/arrow-left.svg' alt='Voltar' />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit='cover'
        />
        <button
          type='button'
          onClick={() => {
            play(episode)
          }}
        >
          <img src='/play.svg' alt='Tocar Episódio' />
        </button>
      </S.ThumbnailContainer>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <S.Description
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </S.Episode>
  )
}

export default Episode

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('api/episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const paths = data.map(episode => {
    return {
      params: {
        slug: episode.id
      }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { slug } = ctx.params
  const { data } = await api.get(`api/episodes/${slug}`)
  const dados = data.episode

  const episode = {
    id: dados.id,
    title: dados.title,
    thumbnail: dados.thumbnail,
    members: dados.members,
    publishedAt: format(parseISO(dados.published_at), 'd MMM yy', {
      locale: ptBR
    }),
    duration: Number(dados.file.duration),
    durationAsString: convertDurationToTimeString(Number(dados.file.duration)),
    description: dados.description,
    url: dados.file.url
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
