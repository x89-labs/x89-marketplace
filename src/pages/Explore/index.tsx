import StableSelect from 'components/StableSelect'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getListItems } from 'state/explore/actions'
import { useExploreState } from 'state/explore/hooks'
import styled from 'styled-components'
import * as Asset from 'assets'

const BodyExplore = styled.div`
  width: 100%;
  padding: 0 38px;
`
const Header = styled.div`
  display: flex;
`
const activeClassName = 'ACTIVE'
const Item = styled(NavLink).attrs({
  activeClassName,
})`
  width: 16rem;
  height: 16rem;
  margin: 0 10px;
  position: relative;
  cursor: pointer;
  .image {
    border-radius: 10px;
    position: absolute;
    width: 100%;
    transition: transform 0.2s;
    height: 100%;
  }
  .image:hover {
    transform: scale(1.1);
  }
  .content {
    position: absolute;
    padding: 10px;
    font-weight: bolder;
    .itemName {
      color: #fff;
      margin: 0;
      font-size: 20px;
    }
    .author {
      margin: 0;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`
const ItemContent = styled.div``
const TopSeller = styled.div``
const Title = styled.div`
  margin-top: 20px;
  display: flex;
  font-size: 26px;
  font-weight: bold;
  align-items: center;
`
const Text = styled.p``
const Image = styled.img``
const LiveAuctions = styled.div``
const HotBids = styled.div``
const Explores = styled.div``
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

const optionsDay = [
  {
    name: '1 day',
    id: '1',
  },
  {
    name: '7 days',
    id: '2',
  },
  {
    name: '30 days',
    id: '3',
  },
]

export default function Explore() {
  const dispatch = useDispatch()
  const state = useExploreState()
  useEffect(() => {
    dispatch(getListItems())
  }, [])

  return (
    <BodyExplore>
      <Header>
        {state.listItem.map((item, index) => (
          <Item key={index} id={`stats-nav-link`} to={`/detail/${item.id}`}>
            <Image src={item.image} className="image" />
            <ItemContent className="content">
              <Text className="itemName">{item.name}</Text>
              {item.createdBy !== '' && <Text className="author">By {item.createdBy}</Text>}
            </ItemContent>
          </Item>
        ))}
      </Header>
      <TopSeller>
        <Title className=" title">
          Top
          <StableSelect option={optionsSeller} textColor={'rgb(0, 102, 255)'} />
          in
          <StableSelect option={optionsDay} textColor={'rgb(0, 102, 255)'} />
        </Title>
      </TopSeller>
      <LiveAuctions>
        <Title>
          Live Auction <Asset.Fire width={20} height={20} />
        </Title>
      </LiveAuctions>
      <HotBids>
        <Title>
          Hot Bids <Asset.Fire width={20} height={20} />
        </Title>
      </HotBids>
      <Explores>
        <Title>Explore</Title>
      </Explores>
    </BodyExplore>
  )
}
