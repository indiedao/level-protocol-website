import styled from 'styled-components'
import PropTypes from 'prop-types'
import Head from 'next/head'

import MenuBar from '../ui/MenuBar'
import Link from '../ui/Link'
import LevelWindow from '../ui/LevelWindow'

import Public from './Public'

const PageContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  padding-top: 14.8rem;
  width: 100%;
`

const Article = styled.article`
  padding: 6.4rem;
`

const DaoWrapper = styled.div`
  h1, h2 {
    color: white;
    margin: 0.5rem 0;
  }
  button {
    margin-bottom: 4rem;
  Configure}
`

const Dao = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>Level Protocol - {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Public>
          <MenuBar>
            <Link href="/dao">DAO</Link>
            <Link href="/dao/integrations">Integrations</Link>
            <Link href="/dao/skill-sets">Skill Sets</Link>
            <Link href="/dao/skills">Skills</Link>
          </MenuBar>
          <PageContent>
            <LevelWindow
              backgroundColor="vibrantBlack"
              enableActions={false}
              maxHeight="75vh"
              title={title}
            >
              <Article>
                <DaoWrapper>{children}</DaoWrapper>
              </Article>
            </LevelWindow>
          </PageContent>
        </Public>
      </main>
    </div>
  )
}

Dao.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Dao
