import { AppProps } from 'next/app'

import Header from '../components/Header'
import Player from '../components/Player'

import { PlayerContextProvider } from '../contexts/PlayerContext'

import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import * as S from '../styles/app'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <PlayerContextProvider>
        <S.Wrapper>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </S.Wrapper>
        <GlobalStyle />
      </PlayerContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
