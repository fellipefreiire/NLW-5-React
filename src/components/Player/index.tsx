import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Slider from 'rc-slider'

import { usePlayer } from '../../contexts/PlayerContext'

import * as S from './styled'
import 'rc-slider/assets/index.css'
import { convertDurationToTimeString } from '../../../utils/convertDurationToTimeString'

const Player: React.FC = (): JSX.Element => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)

  const setupProgressListener = () => {
    audioRef.current.currentTime = 0

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    clearPlayerState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious
  } = usePlayer()

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

  const handleSeek = (amount: number) => {
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  const handleEpisodeEnded = () => {
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }

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
          <span>{convertDurationToTimeString(progress)}</span>
          <S.Slider>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <S.EmptySlider />
            )}
          </S.Slider>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </S.Progress>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onEnded={handleEpisodeEnded}
            onLoadedMetadata={setupProgressListener}
            autoPlay
          />
        )}

        <S.Buttons>
          <button
            type='button'
            disabled={!episode || episodeList.length === 1}
            onClick={toggleShuffle}
            className={isShuffling ? 'isActive' : ''}
          >
            <img src='/shuffle.svg' alt='Embaralhar' />
          </button>
          <button
            type='button'
            onClick={playPrevious}
            disabled={!episode || !hasPrevious}
          >
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
          <button
            type='button'
            onClick={playNext}
            disabled={!episode || !hasNext}
          >
            <img src='/play-next.svg' alt='Tocar próxima' />
          </button>
          <button
            type='button'
            disabled={!episode}
            onClick={toggleLoop}
            className={isLooping ? 'isActive' : ''}
          >
            <img src='/repeat.svg' alt='Repetir' />
          </button>
        </S.Buttons>
      </S.Footer>
    </S.Container>
  )
}

export default Player
