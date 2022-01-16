import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'

import Public from '../components/layouts/Public'
import { H2, H3, H4, Body1 } from '../components/ui/Typography'
import Button from '../components/ui/Button'
import MenuBar from '../components/ui/MenuBar'
import LevelWindow from '../components/ui/LevelWindow'
import Hero from '../components/ui/Hero/Hero'
import Footer from '../components/ui/Footer'
import Section from '../components/ui/Section'
import TextBlock from '../components/ui/TextBlock'
import Panel from '../components/ui/Panel'
import Token from '../components/ui/illustrations/Token'
import NFTIllustration from '../components/ui/illustrations/NFT'
import SkillzIllustration from '../components/ui/illustrations/Skillz'
import CommunitiesIllustration from '../components/ui/illustrations/Communities'
import IntegrationsIllustration from '../components/ui/illustrations/Integrations'
import BenefitsIllustration from '../components/ui/illustrations/Benefits'

const PageContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  padding-top: 14.8rem;
  width: 100%;
`

const Article = styled.article`
  padding: 0 6.4rem;
`

const NFT = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-gap: 2.4rem;

  > * {
    margin: 0 auto;
  }
`

const Parallax = styled.div`
  --parallax-top: 0;
  --parallax-bottom: 0;

  position: relative;

  section {
    position: relative;
    z-index: 1;
  }

  &::before,
  &:after {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: 0;
  }

  &::before {
    top: var(--parallax-top);
  }

  &::after {
    bottom: var(--parallax-bottom);
    height: 356.4rem;
    background-image: url('/images/parallax.png');
  }
`

const Page = () => {
  return (
    <div>
      <Head>
        <title>Level Protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Public>
          <MenuBar>
            <Link href="/about">About</Link>
            <Link href="/join">Join</Link>
          </MenuBar>
          <PageContent>
            <LevelWindow
              backgroundColor="vibrantBlack"
              enableActions={false}
              maxHeight="75vh"
              title="Level Protocol"
            >
              <Parallax>
                <Article>
                  <Hero />
                  <Section boundary="some">
                    <TextBlock>
                      <H2 color="vibrantGreen">lvl is a crypto resume</H2>
                      <H4 color="trueWhite">
                        Level is an on-chain reputation and skills web3 resume
                        that highlights all of your contributions across
                        communities, DAOs, and metaverses
                      </H4>
                    </TextBlock>
                  </Section>
                  <Section alignment="start" balance="equal" boundary="little">
                    <Panel
                      button={<Button>Join Waitlist</Button>}
                      smallIllustrationName="Community"
                      title="For communities"
                    >
                      <ol>
                        <li>
                          Define skills relevant for your community that members
                          can earn
                        </li>
                        <li>
                          Combine existing tools with your own community data
                        </li>
                        <li>
                          Rollup all off-chain data from your community, DAO,
                          game, or metaverse into members’ Level tokens,
                          on-chain
                        </li>
                      </ol>
                    </Panel>
                    <Panel
                      button={<Button>Join Waitlist</Button>}
                      smallIllustrationName="Member"
                      title="For members"
                    >
                      <ol>
                        <li>
                          Mint your Level token to start tracking your
                          contribution, skills, and reputation
                        </li>
                        <li>
                          Focus on building your contributions and reputation in
                          your metaverses and level up your skills
                        </li>
                        <li>
                          Watch your dynamic Level NFT token shift and change
                          along with your growth
                        </li>
                      </ol>
                    </Panel>
                  </Section>
                  <Section balance="vertical" boundary="some">
                    <NFT>
                      <Token />
                      <TextBlock>
                        <H2 color="vibrantGreen">Dynamic NFTs</H2>
                        <Body1>
                          Level Tokens are dynamic NFTs that showcase your
                          earned skills in each community, combining data from
                          any source, validated by the community, then stored
                          on-chain so any smart contract can interact at your
                          level.
                        </Body1>
                      </TextBlock>
                      <Button>How does this work?</Button>
                    </NFT>
                    <NFTIllustration />
                  </Section>
                  <Section boundary="lot">
                    <TextBlock>
                      <H2 color="vibrantGreen">How It Works</H2>
                      <H4 color="trueWhite">
                        Community admins configure the skills important to them.
                        Community members earn those skills and customize how
                        they show up on their Level NFT.
                      </H4>
                    </TextBlock>
                  </Section>
                  <Section balance="start" boundary="little">
                    <SkillzIllustration />
                    <TextBlock align="left">
                      <H3 color="trueWhite">Community-specific skills</H3>
                      <ul>
                        <li>
                          Service DAOs can highlight leadership, development,
                          and other technological skills.
                        </li>
                        <li>
                          Venture DAOs would select growth strategies, community
                          building, and analytical skills.
                        </li>
                        <li>
                          For game communities, skills can be about marketing,
                          socialization, and activity. All other metaverses can
                          choose anything from experience to reputation!
                        </li>
                      </ul>
                    </TextBlock>
                  </Section>
                  <Section balance="end" boundary="little">
                    <TextBlock align="left">
                      <H3 color="trueWhite">Communities drive growth</H3>
                      <Body1>
                        Communities can rollup their off-chain data into each
                        member’s Level token
                      </Body1>
                    </TextBlock>
                    <CommunitiesIllustration />
                  </Section>
                  <Section balance="start" boundary="little">
                    <IntegrationsIllustration />
                    <TextBlock align="left">
                      <H3 color="trueWhite">Use with your favorite tools</H3>
                      <Body1>
                        Sourcecred, Coordinape, Tip Party, Ronin/Axie,
                        DarkForest, and others&hellip;
                      </Body1>
                    </TextBlock>
                  </Section>
                  <Section balance="end" boundary="little">
                    <TextBlock align="left">
                      <H3 color="trueWhite">Member benefits</H3>
                      <ul>
                        <li>Display their Levels</li>
                        <li>Gain access to new communities(via Guild.xyz)</li>
                        <li>
                          Gain access to specific smart contract functions
                        </li>
                      </ul>
                    </TextBlock>
                    <BenefitsIllustration />
                  </Section>
                </Article>
                <Footer />
              </Parallax>
            </LevelWindow>
          </PageContent>
        </Public>
      </main>
    </div>
  )
}

export default Page
