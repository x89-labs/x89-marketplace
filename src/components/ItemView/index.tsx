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
  max-width: 290px;
  height: auto;
  color: #000;
  text-decoration: none;
  background-color: #fff;
  padding: 1rem;
  margin: 0.5rem 0.8rem;
  position: relative;
  cursor: pointer;
  border-radius: 1rem;
  border: 0.5px solid #ccc;

  &:hover {
    box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);
    border: 1px solid #4a4343;
  }
`
const ItemContent = styled.div`
  width: 100%;
  display: flex;
  height: 7rem;
  flex-direction: column;
  justify-content: space-between;
`

const Text = styled.p`
  margin: 4px;
  align-self: center;
  color: #808080;
  font-size: 16px;
`
const ItemName = styled.p`
  font-size: 1.2rem;
  color: #000;
  margin: 0;
  font-weight: bold;
`
const Editor = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: bold;
`
const ImageDisPlay = styled.div`
  postition: relative;
  width: 100%;
  justify-content: center;
  margin: 20px 0;
  align-items: center;
  display: flex;
`

const Image = styled.img`
  width: 90%;
  border-radius: 10px;
  height: 13rem;
`
const Tag = styled.div`
  display: block;
  background-color: #000;
  max-width: 3.2rem;
  text-align: center;
  border-radius: 15px;
  color: #fff;
  font-size: 14px;
  padding: 4px 0;
  margin: 10px 0;
`
const FooterContent = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
`

const Bid = styled.div`
  color: #4f42ec;
  font-size: 1rem;
  font-weight: 700;
`
const Like = styled.div`
  display: flex;
  align-items: center;
`

const Owner = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
`

const FooterItem = styled.div`
  * {
    position: absolute;
    content: '';
    height: 40px;
    display: block;
    background: rgb(255, 255, 255);
    border-radius: 16px;
    border: 1px solid #ccc;
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
  position: absolute;
  width: 10rem;
  height: 2rem;
  bottom: 160px;
  left: 20px;
  border-radius: 1rem;
  background-image: linear-gradient(
    145deg,
    rgb(12, 80, 255) 0%,
    rgb(12, 80, 255) 13%,
    rgb(91, 157, 255) 25.73%,
    rgb(255, 116, 241) 75%,
    rgb(255, 116, 241) 100%
  );
  background-size: 100%;
`
const Time = styled.div`
  border-radius: 1rem;
  border: 5px solid transparent;
  background: rgb(255, 255, 255);
  margin-top: 2px;
  width: 154px;
  margin-left: 3px;
  height: 27px;
  font-size: 14px;
  font-weight: bold;
  padding-left: 4px;
`

export default function ItemView({ index, item, isLiveAuction }: ItemView) {
  const PreviewFile = (item: Item) => {
    if (item.type.includes('image')) {
      return <Image src={item.image}></Image>
    } else if (item.type.includes('video')) {
      return (
        <ReactPlayer
          url={item.image}
          muted={true}
          playing={true}
          width={'90%'}
          height={'13rem'}
          loop={true}
          style={{ borderRadius: 10 }}
        />
      )
    }
  }

  return (
    <Container key={index} id={`stats-nav-link`} to={`/detail/${item.id}`}>
      <Editor>{item.totalQuantity === 1 ? 'Single Edition' : `${item.totalQuantity} Editions`}</Editor>
      <ImageDisPlay>
        {PreviewFile(item)}
        {isLiveAuction === true && (
          <TimeLeft>
            <Time>
              <Countdown date={Date.now() + Math.random() * 100000000} /> <Asset.Fire width={14} height={14} />
            </Time>
          </TimeLeft>
        )}
      </ImageDisPlay>

      <ItemContent>
        <ItemName>{item.name}</ItemName>
        <Owner>
          <Text> By {shortenAddress(item.owner)}</Text>
        </Owner>
        <Tag>{item.categoryName}</Tag>
      </ItemContent>
      <FooterContent>
        <Bid>Bid Now</Bid>
        <Like>
          <Text>321</Text>
          <Asset.Heart width={16} height={16} />
        </Like>
      </FooterContent>
      {item.totalQuantity > 1 && (
        <FooterItem>
          <div className="footer" />
          <div className="footer2" />
        </FooterItem>
      )}
    </Container>
  )
}
