import { AppProps } from 'next/app'

import Header from '../components/Header'
import Player from '../components/Player'

import { PlayerContext } from '../contexts/PlayerContext'

import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import * as S from '../styles/app'
import { useState } from 'react'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const play = episode => {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const setPlayingState = (state: boolean) => {
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        setPlayingState
      }}
    >
      <ThemeProvider theme={theme}>
        <S.Wrapper>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </S.Wrapper>
        <GlobalStyle />
      </ThemeProvider>
    </PlayerContext.Provider>
  )
}

export default MyApp
