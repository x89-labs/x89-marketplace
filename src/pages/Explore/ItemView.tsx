import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import * as Asset from 'assets'
import { Item } from 'models/explore'
import ReactPlayer from 'react-player'
import Countdown from 'react-countdown'
import { shortenAddress } from 'utils'
import { Color, Outline, Sizing, Typography } from 'styles'

interface ItemView {
  index?: any
  item: Item
  isLiveAuction?: boolean
}
const activeClassName = 'ACTIVE'
const Container = styled(NavLink).attrs({
  activeClassName,
})`
  width: ${Sizing.x255}px;
  color: ${Color.neutral.black};
  background: ${Color.linearGradient.black};
  text-decoration: none;
  margin: 1rem 0;
  position: relative;
  cursor: pointer;
  border-radius: ${Outline.borderRadius.base}px;
  &:hover {
    box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);
  }
  @media only screen and (max-width: 700px) {
    width: 100%;
  }
`
const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${Sizing.x10}px;
`
const Text = styled.p`
  ${{ ...Typography.fontSize.x10 }}
  margin: ${Sizing.x4}px;
  color: ${Color.neutral.gray};
`
const ItemName = styled.p`
  ${{ ...Typography.fontSize.x20 }}
  ${{ ...Typography.fontWeight.bold }}
  color: ${Color.neutral.white};
  margin: 0;
`
const ImageDisPlay = styled.div`
  postition: relative;
  width: 100%;
  height: ${Sizing.x200}px;
  border-radius: ${Outline.borderRadius.base}px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  display: flex;
`

const Image = styled.img`
  width: 100%;
  border-radius: ${Outline.borderRadius.base}px;
  height: ${Sizing.x200}px;
  transition: transform 0.2s;
  &:hover {
      transform: scale(1.1);
    }
  }
`
const Tag = styled.div`
  color: ${Color.neutral.purple};
  ${{ ...Typography.fontSize.x10 }}
  ${{ ...Typography.fontWeight.bold }}
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
  color: ${Color.neutral.green};
  ${{ ...Typography.fontSize.x30 }}
  ${{ ...Typography.fontWeight.bold }}
  margin-top: ${Sizing.x10}px;
`
const Price = styled.div`
  color: ${Color.neutral.white};
  ${{ ...Typography.fontSize.x10 }}
  margin-right: 5px;
`
const Avatar = styled.img`
  width: ${Sizing.x24}px;
  height: ${Sizing.x24}px;
  border-radius: ${Outline.borderRadius.small}px;
`
const Owner = styled.div`
  padding: 8px 0px;
  display: flex;
  border-bottom: 1px solid #353945;
`

const FooterItem = styled.div`
  * {
    position: absolute;
    height: ${Sizing.x40}px;
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
          width={'100%'}
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
            <Asset.Fire width={24} height={24} />
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
