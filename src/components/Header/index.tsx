import * as S from './styled'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

const Header: React.FC = (): JSX.Element => {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR
  })

  return (
    <S.Header>
      <img src='/logo.svg' alt='Podcastr' />

      <p>O melhor para você ouvir, sempre</p>

      <span>{currentDate}</span>
    </S.Header>
  )
}

export default Header
