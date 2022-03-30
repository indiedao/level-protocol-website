import styled from 'styled-components'
import { getAccessListFirst480, getAccessListMostRecent } from '../util/fauna'

import Public from '../components/layouts/Public'
import PublicMenuBar from '../components/ui/PublicMenuBar'
import Marquee from '../components/ui/Marquee'
import AccessListMemberGrid from '../components/access-list/ui/AccessListMemberGrid'

const AccessListPage = ({ first480, mostRecent }) => {
  // Create string of repeating access list text:
  let accessListText = ''
  for (let i = 0; i < 20; i += 1) {
    accessListText += 'ACCESS LIST—'
  }
  accessListText += 'ACCESS LIST'

  // Split up first three access list groups:
  const first30 = first480.slice(0, 30)
  const second100 = first480.slice(30, 100)
  const third350 = first480.slice(130, 350)

  return (
    <Public variant="light">
      <PublicMenuBar />
      <Container>
        <Marquee content={accessListText} />
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
