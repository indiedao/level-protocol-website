import styled, { css } from 'styled-components'
import { useEffect, useCallback, useState } from 'react'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import useWeb3 from './hooks/useWeb3'
import { HTTPRPC } from '../util/constants'
import { Body1 } from './ui/Typography'

const web3 = createAlchemyWeb3(HTTPRPC)

const NFTList = ({ handleSelect }) => {
  const [nfts, setNfts] = useState([])
  const [selectedNftKey, setSelectedNftKey] = useState()
  const [loading, setLoading] = useState(true)
  const { address } = useWeb3()

  const fetchNFTs = useCallback(async () => {
    if (!address) return

    setLoading(true)

    const resp = await web3.alchemy.getNfts({
      owner: address,
    })
    const _nfts = []

    for (let i = 0; i < resp.ownedNfts.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const nft = await web3.alchemy.getNftMetadata({
        contractAddress: resp.ownedNfts[i].contract.address,
        tokenId: parseInt(resp.ownedNfts[i].id.tokenId, 16),
      })
      _nfts.push(nft)
    }

    setNfts(_nfts)
    setLoading(false)
  }, [address])

  useEffect(() => {
    fetchNFTs()
  }, [fetchNFTs, address])

  if (nfts.length === 0) {
    if (loading) return <Body1>Loading your NFTs...</Body1>
    if (!loading) return <Body1>You don&apos;t have any NFTs...</Body1>
  }

  const nftData = nfts.map(nft => ({
    key: `${nft.contract.address}-${nft.id.tokenId}`,
    src: nft?.media?.[0].uri.raw || '/404-nft.png',
    address: nft.contract.address,
    id: nft.id.tokenId,
  }))

  return (
    <Wrapper>
      {nftData.map(nft => (
        <div key={nft.key}>
          <NFTImage
            src={nft.src}
            selected={selectedNftKey === nft.key}
            onClick={() => {
              handleSelect({ address: nft.address, id: nft.id })
              setSelectedNftKey(nft.key)
            }}
          />
        </div>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`

const NFTImage = styled.img`
  ${props => css`
    width: 100px;
    height: 100px;
    cursor: ${props.theme.cursors.select};

    ${props.selected &&
    css`
      border: 4px solid red;
    `}
  `}
`

export default NFTList
