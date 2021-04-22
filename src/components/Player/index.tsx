import Image from 'next/image'
import { useContext, useEffect, useRef } from 'react'
import Slider from 'rc-slider'

import { PlayerContext } from '../../contexts/PlayerContext'

import * as S from './styled'
import 'rc-slider/assets/index.css'

const Player: React.FC = (): JSX.Element => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState
  } = useContext(PlayerContext)

  useEffect(() => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const episode = episodeList[currentEpisodeIndex]

  return (
    <S.Container>
      <header>
        <img src='/playing.svg' alt='Tocando agora' />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <S.CurrentEpisode>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit='cover'
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </S.CurrentEpisode>
      ) : (
        <S.EmptyPlayer>
          <strong>Selecione um podcast para ouvir</strong>
        </S.EmptyPlayer>
      )}

      <S.Footer className={!episode ? 'empty' : ''}>
        <S.Progress>
          <span>00:00</span>
          <S.Slider>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <S.EmptySlider />
            )}
          </S.Slider>
          <span>00:00</span>
        </S.Progress>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            autoPlay
          />
        )}

        <S.Buttons>
          <button type='button' disabled={!episode}>
            <img src='/shuffle.svg' alt='Embaralhar' />
          </button>
          <button type='button' disabled={!episode}>
            <img src='/play-previous.svg' alt='Tocar anterior' />
          </button>
          <button
            className='playButton'
            type='button'
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src='/pause.svg' alt='Tocar' />
            ) : (
              <img src='/play.svg' alt='Tocar' />
            )}
          </button>
          <button type='button' disabled={!episode}>
            <img src='/play-next.svg' alt='Tocar próxima' />
          </button>
          <button type='button' disabled={!episode}>
            <img src='/repeat.svg' alt='Repetir' />
          </button>
        </S.Buttons>
      </S.Footer>
    </S.Container>
  )
}

export default Player
