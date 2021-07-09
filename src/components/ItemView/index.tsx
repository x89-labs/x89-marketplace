import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import * as Asset from 'assets'
import { Item } from 'models/explore'

interface ItemView {
  index?: any
  item: Item
}
const activeClassName = 'ACTIVE'
const Container = styled(NavLink).attrs({
  activeClassName,
})`
  width: ${(window.innerWidth - 80) / 5}px;
  height: auto;
  color: #000;
  text-decoration: none;
  background-color: #fff;
  padding: 1rem;
  margin: 0 2px;
  position: relative;
  cursor: pointer;
  border-radius: 1rem;
  &:hover {
    box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);
    border: 1px solid #4a4343;
  }
`
const ItemContent = styled.div`
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Text = styled.p`
  margin: 4px 0;
  align-self: center;
  color: #808080;
  font-size: 14px;
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
  width: 3rem;
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

export default function ItemView({ index, item }: ItemView) {
  return (
    <Container key={index} id={`stats-nav-link`} to={`/detail/${item.id}`}>
      <Editor>500 editor</Editor>
      <ImageDisPlay>
        <Image src={item.image} />
      </ImageDisPlay>
      <ItemContent>
        <ItemName>{item.name}</ItemName>
        <Owner>
          <Text> {'By ' + item.owner}</Text>
        </Owner>
        <Tag>Art</Tag>
      </ItemContent>
      <FooterContent>
        <Bid>Bid Now</Bid>
        <Like>
          <Text>321</Text>
          <Asset.Heart width={16} height={16} />
        </Like>
      </FooterContent>
    </Container>
  )
}
