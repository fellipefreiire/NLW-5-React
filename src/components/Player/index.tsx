import * as S from './styled'

const Player: React.FC = (): JSX.Element => {
  return (
    <S.Container>
      <header>
        <img src='/playing.svg' alt='Tocando agora' />
        <strong>Tocando agora</strong>
      </header>

      <S.EmptyPlayer>
        <strong>Selecione um podcast para ouvir</strong>
      </S.EmptyPlayer>

      <S.Footer className='empty'>
        <S.Progress>
          <span>00:00</span>
          <S.Slider>
            <S.EmptySlider />
          </S.Slider>
          <span>00:00</span>
        </S.Progress>

        <S.Buttons>
          <button type='button'>
            <img src='/shuffle.svg' alt='Embaralhar' />
          </button>
          <button type='button'>
            <img src='/play-previous.svg' alt='Tocar anterior' />
          </button>
          <button className='playButton' type='button'>
            <img src='/play.svg' alt='Tocar' />
          </button>
          <button type='button'>
            <img src='/play-next.svg' alt='Tocar próxima' />
          </button>
          <button type='button'>
            <img src='/repeat.svg' alt='Repetir' />
          </button>
        </S.Buttons>
      </S.Footer>
    </S.Container>
  )
}

export default Player
