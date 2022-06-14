import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import debounce from 'debounce'

import Public from '../components/layouts/Public'
import { H2, H3, H4, Body1 } from '../components/ui/Typography'
import Button from '../components/ui/Button'
import Link from '../components/ui/Link'
import PublicMenuBar from '../components/ui/PublicMenuBar'
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
import { openUrl } from '../util/url'

const PageContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  padding: 10vh 5vw 5vh;
  width: 100%;

  ${props => props.theme.bp.lgPlus('padding: 14.8rem 0 0;')}
`

const Article = styled.article`
  padding: 0 5vw;

  ${props => props.theme.bp.lg('padding: 0 6.4rem;')}
  ${props => props.theme.bp.xl('padding: 0 16.6rem;')}
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

  > * {
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
  const router = useRouter()
  const section = useRef(null)
  const [availableWidth, setAvailableWidth] = useState(1)

  useEffect(() => {
    const resetWidth = debounce(() => {
      if (section.current) {
        const { width } = section.current.getBoundingClientRect()
        if (width < 1024) {
          if (width !== availableWidth) {
            setAvailableWidth(width)
          }
        } else if (width >= 1024) {
          setAvailableWidth(1024)
        }
      }
    }, 250)

    resetWidth()
    window.addEventListener('resize', resetWidth)

    return () => window.removeEventListener('resize', resetWidth)
  }, [availableWidth])

  return (
    <div>
      <Head>
        <title>lvl protocol</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Public>
          <PublicMenuBar>
            <NextLink href="/join">join</NextLink>
            <a
              href="https://indiedao.gitbook.io/indiedao/products/lvl-protocol"
              rel="noopener noreferrer"
              target="_blank"
            >
              docs
            </a>
          </PublicMenuBar>
          <PageContent>
            <LevelWindow
              backgroundColor="vibrantBlack"
              enableActions={false}
              maxHeight={
                availableWidth >= 1024 ? 'calc(100vh - 25rem)' : '85vh'
              }
              title="lvl protocol"
            >
              <Parallax>
                <Article>
                  <Hero />
                  <Section boundary="some" ref={section}>
                    <TextBlock>
                      <H2 color="vibrantGreen">lvl is a crypto resume</H2>
                      <H4 color="trueWhite">
                        lvl is an on-chain reputation and skills web3 resume
                        that highlights all of your contributions across
                        communities, DAOs, and metaverses
                      </H4>
                    </TextBlock>
                  </Section>
                  <Section
                    alignment="start"
                    balance="equal"
                    boundary="little"
                    id="join-community"
                  >
                    <Panel
                      button={
                        <Button
                          onClick={() =>
                            openUrl('https://forms.gle/BUDbGYTQDBEMCw8dA')
                          }
                        >
                          Join Waitlist
                        </Button>
                      }
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
                          game, or metaverse into members’ lvl tokens, on-chain
                        </li>
                      </ol>
                    </Panel>
                    <Panel
                      button={
                        <Button onClick={() => router.push('/join')}>
                          Mint Now
                        </Button>
                      }
                      smallIllustrationName="Member"
                      title="For members"
                    >
                      <ol>
                        <li>
                          Mint your lvl token to start tracking your
                          contribution, skills, and reputation
                        </li>
                        <li>
                          Focus on building your contributions and reputation in
                          your metaverses and level up your skills
                        </li>
                        <li>
                          Watch your dynamic lvl NFT token shift and change
                          along with your growth
                        </li>
                      </ol>
                      <Body1 color="mutedCream">
                        Early minting is available and will hold your spot when
                        lvl is fully integrated with your DAOs.
                      </Body1>
                    </Panel>
                  </Section>
                  <Section balance="vertical" boundary="some">
                    <NFT>
                      <Token />
                      <TextBlock>
                        <H2 color="vibrantGreen">Dynamic NFTs</H2>
                        <Body1>
                          lvl Tokens are dynamic NFTs that showcase your earned
                          skills in each community, combining data from any
                          source, validated by the community, then stored
                          on-chain so any smart contract can interact at your
                          lvl.
                        </Body1>
                      </TextBlock>
                      <Button anchor="#how-lvl-works">
                        How does this work?
                      </Button>
                    </NFT>
                    <NFTIllustration availableWidth={availableWidth} />
                  </Section>
                  <Section id="how-lvl-works" boundary="lot">
                    <TextBlock>
                      <H2 color="vibrantGreen">How It Works</H2>
                      <H4 color="trueWhite">
                        Community admins configure skills that are important to
                        their community, and integrate the tools they depend on
                        to measure each member&apos;s contributions. Community
                        members compose their skills and reputation across
                        different communities into their single lvl NFT.
                      </H4>
                      <H4 color="trueWhite">
                        lvl NFTs are{' '}
                        <Link
                          href="https://vitalik.ca/general/2022/01/26/soulbound.html"
                          target="_blank"
                          rel="noopener"
                        >
                          &quot;Soulbound&quot;
                        </Link>{' '}
                        and lock reputation to the entity that earned it in each
                        community.
                      </H4>
                    </TextBlock>
                  </Section>
                  <Section balance="start" boundary="little">
                    <SkillzIllustration availableWidth={availableWidth} />
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
                        member’s lvl token
                      </Body1>
                    </TextBlock>
                    <CommunitiesIllustration availableWidth={availableWidth} />
                  </Section>
                  <Section balance="start" boundary="little">
                    <IntegrationsIllustration availableWidth={availableWidth} />
                    <TextBlock align="left">
                      <H3 color="trueWhite">Integrate your favorite tools</H3>
                      <Body1>
                        Sourcecred, Coordinape, Tip Party, Github, Figma, and
                        many others&hellip;
                      </Body1>
                    </TextBlock>
                  </Section>
                  <Section balance="end" boundary="little">
                    <TextBlock align="left">
                      <H3 color="trueWhite">Member benefits</H3>
                      <ul>
                        <li>Display your lvl</li>
                        <li>Access to token-gated experiences</li>
                        <li>
                          Access to token-gated smart contract functionality
                        </li>
                      </ul>
                    </TextBlock>
                    <BenefitsIllustration availableWidth={availableWidth} />
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
