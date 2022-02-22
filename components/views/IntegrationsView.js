import styled from 'styled-components'
import Link from '../ui/Link'
import { H3 } from '../ui/Typography'

const IntegrationsMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2.4rem;
`

const IntegrationsView = () => {
  return (
    <IntegrationsMenu>
      <H3 color="white">Integration Options</H3>
      <ul>
        <li>
          <Link href="/dao/integrations/sourcecred">Sourecred</Link>
        </li>
        <li>
          <Link href="/dao/integrations/coordinape">Coordinape</Link>
        </li>
      </ul>
    </IntegrationsMenu>
  )
}

export default IntegrationsView
