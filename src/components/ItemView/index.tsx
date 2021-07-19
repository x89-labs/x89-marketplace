import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import * as Asset from 'assets'
import { Item } from 'models/explore'
import ReactPlayer from 'react-player'
import Countdown from 'react-countdown'
import { shortenAddress } from 'utils'

interface ItemView {
  index?: any
  item: Item
  isLiveAuction?: boolean
}
const activeClassName = 'ACTIVE'
const Container = styled(NavLink).attrs({
  activeClassName,
})`
  width: 255px;
  color: #000;
  text-decoration: none;
  background: linear-gradient(
    133.84deg,
    #4e4e4e -16.04%,
    #333333 9.33%,
    #1a1a1a 32.02%,
    #1a1a1a 62.06%,
    #262626 87.42%,
    #4e4e4e 112.12%
  );
  margin: 0.5rem 0.8rem;
  position: relative;
  cursor: pointer;
  border-radius: 1rem;
  &:hover {
    box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);
  }
`
const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
`
const Text = styled.p`
  margin: 4px;
  color: #777e90;
  font-size: 12px;
`
const ItemName = styled.p`
  font-size: 14px;
  line-height: 16px;
  color: #fff;
  margin: 0;
  font-weight: bold;
`
const ImageDisPlay = styled.div`
  postition: relative;
  width: 255px;
  height: 200px;
  border-radius: 1rem;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  display: flex;
`

const Image = styled.img`
  width: 255px;
  border-radius: 10px;
  height: 200px;
  transition: transform 0.2s;
  &:hover {
      transform: scale(1.1);
    }
  }
`
const Tag = styled.div`
  color: #6324ed;
  font-size: 12px;
  font-weight: bold;
`
const FooterContent = styled.div`
  margin: 8px 0;
`
const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Bid = styled.div`
  color: #35dfb1;
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
`
const Price = styled.div`
  color: #fff;
  font-size: 12px;
  margin-right: 5px;
`
const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 5px;
`
const Owner = styled.div`
  padding: 8px 0px;
  display: flex;
  border-bottom: 1px solid #353945;
`

const FooterItem = styled.div`
  * {
    position: absolute;
    height: 40px;
    display: block;
    background: #353945;
    border-radius: 16px;
    border: 1px solid #2b2828;
  }
  .footer {
    width: 98%;
    left: 3px;
    right: 3px;
    bottom: -6px;
    z-index: -1;
  }
  .footer2 {
    width: 93%;
    left: 9px;
    right: 3px;
    bottom: -10px;
    z-index: -2;
  }
`
const TimeLeft = styled.div`
  display: flex;
  right: 0;
  top: 23px;
  padding: 4px;
  width: 123px;
  height: 60px;
  align-items: center;
  border-radius: 4px 0px 0px 4px;
  justify-content: space-between;
  position: absolute;
  background-color: #141416;
  color: #fff;
`
const IconLive = styled.img`
  width: 24px;
  height: 24px;
`
const Time = styled.div``

export default function ItemView({ index, item, isLiveAuction }: ItemView) {
  const PreviewFile = (item: Item) => {
    if (item.type.includes('image')) {
      return <Image src={item.image} />
    } else if (item.type.includes('video')) {
      return (
        <ReactPlayer
          url={item.image}
          muted={true}
          playing={true}
          width={'255px'}
          height={'200px'}
          loop={true}
          style={{ borderRadius: 10 }}
        />
      )
    }
  }

  return (
    <Container key={index} id={`stats-nav-link`} to={`/detail/${item.id}`}>
      <ImageDisPlay>
        {PreviewFile(item)}
        {isLiveAuction === true && (
          <TimeLeft>
            <IconLive src={Asset.SrcLive} />
            <Time>
              <Text>Ending in</Text>
              <Countdown date={Date.now() + Math.random() * 10000000} />
            </Time>
          </TimeLeft>
        )}
      </ImageDisPlay>
      <ItemContent>
        <ItemName>{item.name}</ItemName>
        <Owner>
          <Avatar src={Asset.SrcAvatar} />
          <Text> {shortenAddress(item.owner)}</Text>
        </Owner>
        <FooterContent>
          <InfoItem>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Price>
                {item.price} {item.symbol}
              </Price>
              <Text>1/{item.totalQuantity}</Text>
            </div>
            <Tag>{item.categoryName}</Tag>
          </InfoItem>
          <Bid>Bid Now</Bid>
        </FooterContent>
      </ItemContent>

      {item.totalQuantity > 1 && (
        <FooterItem>
          <div className="footer" />
          <div className="footer2" />
        </FooterItem>
      )}
    </Container>
  )
}
