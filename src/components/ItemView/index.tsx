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
  width: 16rem;
  color: #000;
  text-decoration: none;
  height: auto;
  background-color: #fff;
  margin: 0 2px;
  position: relative;
  cursor: pointer;
  border-radius: 1rem;
  &:hover {
    box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);
  }
`
const ItemContent = styled.div`
  padding: 1rem;
`

const Text = styled.p``
const ItemName = styled.p`
  font-size: 1.2rem;
  color: #000;
  margin: 0;
  font-weight: bold;
`
const Image = styled.img`
  border-radius: 10px;
  width: 100%;
  transition: transform 0.2s;
  height: 16rem;
  &:hover {
    transform: scale(1.1);
  }
`
const FooterContent = styled.div``

export default function ItemView({ index, item }: ItemView) {
  return (
    <Container key={index} id={`stats-nav-link`} to={`/detail/${item.id}`}>
      <Image src={item.image} />
      <ItemContent>
        <ItemName>{item.name}</ItemName>
        <Text>From 0.024 ETH 1/3</Text>
      </ItemContent>
    </Container>
  )
}
