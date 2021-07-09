import StableSelect from 'components/StableSelect'
import ItemView from 'components/ItemView'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getListItems } from 'state/explore/actions'
import { useExploreState } from 'state/explore/hooks'
import styled from 'styled-components'
import * as Asset from 'assets'
import { backgroundColor } from 'styled-system'
import { optionsTopSeller } from './config'

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
  background-color: #fff;
  margin: 0 10px;
  position: relative;
  cursor: pointer;
  .image {
    border-radius: 10px;
    position: absolute;
    width: 100%;
    transition: transform 0.2s;
    height: 16rem;
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
const TopSellerItem = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  min-width: 242px;
  padding: 10px;
  align-items: center;
  margin: 5px;
  &:hover {
    box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);
  }
`
const ListItemSeller = styled.div`
  background-color: ${({ theme }) => theme.bg5};
  margin-top: 1rem;
`
const Avatar = styled.div`
  postiton: relative;
`

const ContentSeller = styled.div`
  margin-left: 20px;
`
const Title = styled.div`
  margin-top: 20px;
  display: flex;
  font-size: 26px;
  font-weight: bold;
  align-items: center;
`
const Text = styled.p`
  margin: 0;
  text-overflow: ellipsis;
`
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

export default function Explore() {
  const dispatch = useDispatch()
  const state = useExploreState()
  useEffect(() => {
    dispatch(getListItems())
  }, [])

  const GridList = () => {
    const matrix = new Array<Array<any>>()
    const list = optionsTopSeller
    console.log(list)
    for (let i = 0, k = -1; i < list.length; i++) {
      if (i % 5 == 0) {
        k++
        matrix[k] = []
      }
      matrix[k].push(list[i])
      console.log(matrix)
    }
    return matrix.map((mt, i) => (
      <div style={{ display: 'flex' }} key={i}>
        {mt.map((item, index) => (
          <TopSellerItem key={index}>
            <div style={{ display: 'flex' }}>
              <Text>{item.id}</Text>
              <Asset.Avatar width={30} height={30} style={{ marginLeft: 10, position: 'relative' }}>
                <Asset.YellowCheck width={10} height={10} style={{ position: 'absolute' }} />
              </Asset.Avatar>
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
      <Header>
        {state.listItem.map(
          (item, index) =>
            index < 5 && (
              <Item key={index} id={`stats-nav-link`} to={`/detail/${item.id}`}>
                <Image src={item.image} className="image" />
                <ItemContent className="content">
                  <Text className="itemName">{item.name}</Text>
                  {item.createdBy !== '' && <Text className="author">By {item.createdBy}</Text>}
                </ItemContent>
              </Item>
            )
        )}
      </Header>
      <TopSeller>
        <Title className=" title">
          Top
          <StableSelect option={optionsSeller} textColor={'rgb(0, 102, 255)'} />
        </Title>
      </TopSeller>
      <ListItemSeller>{GridList()}</ListItemSeller>
      <LiveAuctions>
        <Title>
          Live Auction <Asset.Fire width={20} height={20} />
        </Title>
        <div style={{ display: 'flex' }}>
          {state.listItem.map((item, index) => index < 4 && <ItemView item={item} key={index} />)}
        </div>
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
