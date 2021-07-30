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
  isMyItem?: boolean
}
const activeClassName = 'ACTIVE'
const Container = styled(NavLink).attrs({
  activeClassName,
})`
  width: ${Sizing.x255}px;
  color: ${Color.neutral.black};
  background: ${({ theme }) => theme.bg6};
  text-decoration: none;
  margin: 1rem 0;
  position: relative;
  cursor: pointer;
  border-radius: ${Outline.borderRadius.base}px;
  box-shadow: 0px 8px 26px rgba(99, 36, 237, 0.16);
  &:hover {
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
  color: ${({ theme }) => theme.text1};
  margin: 0;
`
const ImageDisPlay = styled.div`
  postition: relative;
  width: 100%;
  height: ${Sizing.x200}px;
  border-top-left-radius: ${Outline.borderRadius.base}px;
  border-top-right-radius: ${Outline.borderRadius.base}px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  display: flex;
`

const Image = styled.img`
  width: 100%;
  height: ${Sizing.x200}px;
  transition: transform 0.2s;
  &:hover {
      transform: scale(1.1);
    }
  }
`
const Tag = styled.div`
  color: ${Color.neutral.purple};
  ${{ ...Typography.fontSize.x20 }}
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
`
const Price = styled.div`
  ${{ ...Typography.fontSize.x10 }}
  ${{ ...Typography.fontWeight.bold }}
  color: ${({ theme }) => theme.text1};
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

const Edition = styled.p`
  ${{ ...Typography.fontSize.x20 }}
  ${{ ...Typography.fontWeight.bold }}
  margin:0;
  color: ${Color.neutral.gray};
`

const FooterItem = styled.div`
  * {
    position: absolute;
    height: ${Sizing.x40}px;
    display: block;
    background: ${Color.neutral.gray2};
    border-radius: 16px;
    border: 0.2px solid #2b2828;
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

export default function ItemView({ index, item, isLiveAuction, isMyItem }: ItemView) {
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
    <Container key={index} id={`detail-nav-link`} to={`/detail/${item.id}`}>
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
      {isMyItem ? (
        <ItemContent>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <ItemName>{item.name}</ItemName>
            <Tag>{item.categoryName}</Tag>
          </div>
          <InfoItem>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Price>
                {item.price} {item.symbol}
              </Price>
              <Text>1/{item.totalQuantity}</Text>
            </div>
            {item.totalQuantity > 1 ? <Edition>Multiple Edition</Edition> : <Edition>Single Edition</Edition>}
          </InfoItem>
        </ItemContent>
      ) : (
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
              <Edition>Single Edition</Edition>
            </InfoItem>
            <InfoItem>
              <Bid>Bid Now</Bid>
              <Tag>{item.categoryName}</Tag>
            </InfoItem>
          </FooterContent>
        </ItemContent>
      )}

      {item.totalQuantity > 1 && (
        <FooterItem>
          <div className="footer" />
          <div className="footer2" />
        </FooterItem>
      )}
    </Container>
  )
}
