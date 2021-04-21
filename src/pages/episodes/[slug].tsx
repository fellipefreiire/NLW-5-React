import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { api } from '../../services/api'

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../../../utils/convertDurationToTimeString'

import * as S from './styled'

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
  return (
    <S.Episode>
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
        <button type='button'>
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
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { slug } = ctx.params
  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
