import StableSelect from 'components/StableSelect'
import ItemView from 'components/ItemView'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getListItems } from 'state/explore/actions'
import { useExploreState } from 'state/explore/hooks'
import styled from 'styled-components'
import * as Asset from 'assets'
import { optionsTopSeller, ListDicovery } from './config'

const BodyExplore = styled.div`
  width: 100%;
  padding: 0 80px;
`
const WalletLayer = styled.div`
  display: flex;
  height: 340px;
  width: 100%;
  border-radius: 32px;
  background: linear-gradient(
    91.26deg,
    rgba(29, 37, 112, 0.8) 12.36%,
    rgba(132, 65, 144, 0.8) 36.84%,
    rgba(136, 23, 82, 0.8) 69.13%,
    rgba(226, 116, 45, 0.8) 94.13%
  );
`
const Wallet = styled.div`
  display: flex;
  justify-content: space-between;
  height: 340px;
  width: 100%;
  border-radius: 32px;
  border: 1px solid #280e5f;
  background: ${({ theme }) => theme.bg4};
  opacity: 0.75;
`
const LeftWallet = styled.div`
  margin: 50px 30px;
`
const RightWallet = styled.div`
  margin: 30px;
`
const ButtonWallet = styled.div`
  background: linear-gradient(226.07deg, #02e879 8.39%, #279ea5 28.31%, #475ccc 47.69%, #5b34e4 61.69%, #6324ed 68.92%);
  border-radius: 16px;
  width: 166px;
  text-align: center;
  padding: 12px 0;
  color: #fff;
  margin-right: 20px;
  cursor: pointer;
`
const ButtonBorder = styled.div`
  position: relative;
  background: linear-gradient(226.07deg, #02e879 8.39%, #279ea5 28.31%, #475ccc 47.69%, #5b34e4 61.69%, #6324ed 68.92%);
  border-radius: 16px;
  width: 166px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
`

const ContentBtn = styled.div`
  position: absolute;
  width: 98%;
  height: 90%;
  padding: 8px;
  background-color: #fff;
  border-radius: 16px;
  color: #35dfb1;
  text-align: center;
`

const TopSellerItem = styled.div`
  background: ${({ theme }) => theme.bg3};
  cursor: pointer;
  border: 1px solid #280e5f;
  border-radius: 10px;
  display: flex;
  min-width: 255px;
  padding: 10px;
  align-items: center;
  margin: 8px 15px;
  height: 84px;
  &:hover {
    box-shadow: 2px 4px 8px #f0f0f0;
  }
`

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  margin-left: 10px;
  postiton: relative;
  background-size: cover;
  background-position: center center;
  background-image: url(${Asset.SrcAvatar});
`

const ContentSeller = styled.div`
  margin-left: 20px;
`
const TitleGreen = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: #35dfb1;
  margin: 0;
`
const TitlePurple = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: #6324ed;
  margin: 0;
`
const Title = styled.div`
  display: flex;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 1rem;
`

const Text = styled.p`
  line-height: 1.2rem;
  margin: 0;
  font-size: 14px;
`
const Image = styled.img``

const ContentGroup = styled.div`
  margin-top: 100px;
`

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  * {
    display: flex;
    align-items: center;
  }
  .itemFilter {
    cursor: pointer;
    background: #000;
    padding: 16px 24px;
    border-radius: 8px;
    color: #fff;
    margin: 0 20px;
    font-weight: bold;
    &:hover {
      color: #000;
      background: #eeff4a;
    }
  }
  .btnFilter {
    cursor: pointer;
    background: #353945;
    padding: 4px 24px;
    border-radius: 8px;
    height: 60px;
    color: #fff;
  }
`
const ListItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const optionsSeller = [
  {
    name: 'Seller',
    id: '1',
  },
  {
    name: 'Buyer',
    id: '2',
  },
]

export default function Explore() {
  const dispatch = useDispatch()
  const state = useExploreState()
  useEffect(() => {
    dispatch(getListItems())
  }, [])

  const GridList = () => {
    const matrix = new Array<Array<any>>()
    const list = optionsTopSeller
    for (let i = 0, k = -1; i < list.length; i++) {
      if (i % 4 == 0) {
        k++
        matrix[k] = []
      }
      matrix[k].push(list[i])
    }
    return matrix.map((mt, i) => (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} key={i}>
        {mt.map((item, index) => (
          <TopSellerItem key={index}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{item.id}</Text>
              <Avatar />
            </div>
            <ContentSeller>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
            </ContentSeller>
          </TopSellerItem>
        ))}
      </div>
    ))
  }

  return (
    <BodyExplore>
      <WalletLayer>
        <Wallet>
          <LeftWallet>
            <TitlePurple>Discover & Collect </TitlePurple>
            <TitleGreen>Extraordinary</TitleGreen>
            <TitlePurple>NFTs </TitlePurple>
            <Text>Marketplace for crypto collectibies non-fungible token (NFTs).</Text>
            <div style={{ display: 'flex', margin: 10 }}>
              <ButtonWallet>Explore more</ButtonWallet>
              <ButtonBorder>
                <ContentBtn>Start Create</ContentBtn>
              </ButtonBorder>
            </div>
          </LeftWallet>
          <RightWallet>
            <div style={{ position: 'relative', width: 240, height: 280, background: '#ccc', borderRadius: 10 }}>
              <Asset.WalletPicture width={240} height={280} style={{ position: 'absolute', top: -20, left: -20 }} />
            </div>
          </RightWallet>
        </Wallet>
      </WalletLayer>

      <ContentGroup>
        <Title>
          Top
          <StableSelect option={optionsSeller} textColor={'rgb(0, 102, 255)'} />
        </Title>
        {GridList()}
      </ContentGroup>
      <ContentGroup>
        <Title>
          Live Auction <Image src={Asset.SrcLive} />
        </Title>
        <ListItem>
          {state.listItem.map((item, index) => index < 4 && <ItemView item={item} key={index} isLiveAuction={true} />)}
        </ListItem>
      </ContentGroup>

      <ContentGroup>
        <Title>
          Hot Bids <Image src={Asset.SrcStar} />
        </Title>
        <ListItem>{state.listItem.map((item, index) => index < 4 && <ItemView item={item} key={index} />)}</ListItem>
      </ContentGroup>

      <ContentGroup>
        <Filter>
          <div>
            <Title>Discovery</Title>
            {ListDicovery.map((item, index) => (
              <div key={index} className="itemFilter">
                {item.name}
              </div>
            ))}
          </div>
          <div className="btnFilter">
            {`Filter & Sort`} <Image src={Asset.SrcFilter} />
          </div>
        </Filter>
        <ListItem>{state.listItem.map((item, index) => index < 4 && <ItemView item={item} key={index} />)}</ListItem>
      </ContentGroup>
    </BodyExplore>
  )
}
