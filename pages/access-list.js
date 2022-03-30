import styled from 'styled-components'
import { getAccessListFirst100, getAccessListMostRecent2 } from '../util/fauna'

import Public from '../components/layouts/Public'
import PublicMenuBar from '../components/ui/PublicMenuBar'
import Marquee from '../components/ui/Marquee'
import AccessListMemberGrid from '../components/access-list/ui/AccessListMemberGrid'

const AccessListPage = ({ first100, mostRecent }) => {
  // Create string of repeating access list text:
  let accessListText = ''
  for (let i = 0; i < 20; i += 1) {
    accessListText += 'ACCESS LIST—'
  }
  accessListText += 'ACCESS LIST'

  return (
    <Public variant="light">
      <PublicMenuBar />
      <Container>
        <Marquee content={accessListText} />
        <AccessListMemberGrid members={first100} />
        <h2>most recent 2</h2>
        <AccessListMemberGrid members={mostRecent} />
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

export async function getStaticProps() {
  const first100 = await getAccessListFirst100()
  const mostRecent = await getAccessListMostRecent2()

  return {
    props: {
      first100,
      mostRecent,
    },
  }
}

export default AccessListPage
