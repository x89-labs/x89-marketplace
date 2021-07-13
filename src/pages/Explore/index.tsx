import StableSelect from 'components/StableSelect'
import ItemView from 'components/ItemView'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getListItems } from 'state/explore/actions'
import { useExploreState } from 'state/explore/hooks'
import styled from 'styled-components'
import * as Asset from 'assets'
import { optionsTopSeller } from './config'
import ReactPlayer from 'react-player'

const BodyExplore = styled.div`
  width: 100%;
  padding: 0 38px;
`
const Header = styled.div`
  display: flex;
  margin-top: 1rem;
`
const activeClassName = 'ACTIVE'
const Item = styled(NavLink).attrs({
  activeClassName,
})`
  width: ${(window.innerWidth - 120) / 5}px;
  height: ${(window.innerWidth - 120) / 5}px;
  background-color: #fff;
  margin: 0 10px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 12px;
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
      max-width: 202px;
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
  min-width: ${(window.innerWidth - 120) / 5}px;
  max-width: 230px;
  padding: 10px;
  align-items: center;
  margin: 3px;
  height: 5rem;
  &:hover {
    box-shadow: 2px 4px 8px #f0f0f0;
  }
`

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  margin-left: 10px;
  postiton: relative;
  background-size: cover;
  background-position: center center;
  background-image: url(${Asset.SrcAvatar});
`
const ListItemSeller = styled.div`
  background-color: ${({ theme }) => theme.bg5};
  margin-top: 1rem;
  padding: 1rem 0;
`
const ContentSeller = styled.div`
  margin-left: 20px;
`
const Title = styled.div`
  margin: 30px 0;
  display: flex;
  font-size: 26px;
  font-weight: bold;
  align-items: center;
`
const Author = styled.div`
  width: 12rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
`
const Text = styled.p`
  margin: 0;
`
const Image = styled.img``
const LiveAuctions = styled.div``
const HotBids = styled.div``
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
      if (i % 5 == 0) {
        k++
        matrix[k] = []
      }
      matrix[k].push(list[i])
    }
    return matrix.map((mt, i) => (
      <div style={{ display: 'flex' }} key={i}>
        {mt.map((item, index) => (
          <TopSellerItem key={index}>
            <div style={{ display: 'flex' }}>
              <Text>{item.id}</Text>
              <Avatar>
                <Asset.YellowCheck
                  width={16}
                  height={16}
                  style={{ position: 'absolute', marginTop: 15, marginLeft: 17 }}
                />
              </Avatar>
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

  const PreviewFile = (item: any) => {
    if (item.type.includes('image')) {
      return <Image src={item.image} className="image" />
    } else if (item.type.includes('video')) {
      return (
        <div className="image">
          <ReactPlayer
            url={item.image}
            muted={true}
            playing={true}
            width={'14rem'}
            loop={true}
            height={'100%'}
            style={{ borderRadius: '10px' }}
          />
        </div>
      )
    }
  }

  return (
    <BodyExplore>
      <Header>
        {state.listItem.map(
          (item, index) =>
            index < 5 && (
              <Item key={index} id={`stats-nav-link`} to={`/detail/${item.id}`}>
                {PreviewFile(item)}
                <ItemContent className="content">
                  <Text className="itemName">{item.name}</Text>
                  {item.createdBy !== '' && (
                    <Author>
                      <p className="author">{'By ' + item.createdBy}</p>
                    </Author>
                  )}
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
        <div style={{ display: 'flex', marginTop: 20 }}>
          {state.listItem.map((item, index) => index < 4 && <ItemView item={item} key={index} isLiveAuction={true} />)}
        </div>
      </LiveAuctions>

      <HotBids>
        <Title>
          Hot Bids <Asset.Fire width={20} height={20} />
        </Title>
        <div style={{ display: 'flex', marginTop: 20 }}>
          {state.listItem.map((item, index) => index < 4 && <ItemView item={item} key={index} />)}
        </div>
      </HotBids>
    </BodyExplore>
  )
}
