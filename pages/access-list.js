import styled from 'styled-components'
import Link from 'next/link'
import {
  getAccessListFirst480,
  getAccessListMostRecent,
} from '../util/api/fauna'
import Public from '../components/layouts/Public'
import PublicMenuBar from '../components/ui/PublicMenuBar'
import AccessListMemberGrid from '../components/access-list/ui/AccessListMemberGrid'
import { Body1, H1 } from '../components/ui/AltTypography'
import Button from '../components/ui/Button'

const AccessListPage = ({ first480 }) => {
  // Split up first three access list groups:
  const first30 = first480.slice(0, 30)
  const second100 = first480.slice(30, 100)
  const third350 = first480.slice(130, 350)

  return (
    <Public variant="light">
      <PublicMenuBar />
      <Container>
        <HeroContainer>
          <Body1>
            A limited number of access passes are available for early
            supporters. To access the alpha launch, be sure to follow{' '}
            <a
              href="https://twitter.com/lvlprotocol"
              target="_blank"
              rel="noreferrer"
            >
              @lvlprotocol
            </a>{' '}
            on Twitter and create your access pass profile using the lvldex.
          </Body1>
          <Link href="/join" passHref>
            <Button>sign up with the lvldex</Button>
          </Link>
          <H1>{first480.length}/480 Early Access Passes Claimed</H1>
          <H1>XXX on Waitlist</H1>
        </HeroContainer>
        <AccessListsContianer>
          <AccessListMemberGrid members={first30} size="large" />
          <AccessListMemberGrid members={second100} size="medium" />
          <AccessListMemberGrid members={third350} size="small" />
        </AccessListsContianer>
      </Container>
    </Public>
  )
}

const Container = styled.div`
  padding-top: 130px;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
`

const HeroContainer = styled.div`
  padding: 20px 40px;
  max-width: 60rem;
  margin: 0 auto;
`

const AccessListsContianer = styled.div`
  padding: 60px 0;
`

export async function getStaticProps() {
  const first480 = await getAccessListFirst480()
  const mostRecent = await getAccessListMostRecent()

  return {
    props: {
      first480,
      mostRecent,
    },
  }
}

export default AccessListPage
