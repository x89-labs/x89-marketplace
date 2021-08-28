import React, { useState } from 'react'
import styled from 'styled-components'
import { Color, Outline, Sizing, Button, Typography } from 'styles'
import * as Asset from 'assets'
import { useExploreState } from 'state/explore/hooks'
import ReactPlayer from 'react-player'
import { shortenAddress } from 'utils'
import { NavLink } from 'react-router-dom'

const HeaderFrame = styled.div`
  display: flex;
  flex-direction: column;
`
const HeaderLayer = styled.div`
  height: ${Sizing.x340}px;
  width: ${Sizing.screen.width};
  border-radius: ${Outline.borderRadius.large}px;
  background: ${Color.linearGradient.layer};
  @media only screen and (max-width: 900px) {
    display: none;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  opacity: 0.75;
  ${{ ...Outline.border.purple }}
  height: ${Sizing.x340}px;
  width: ${Sizing.screen.width};
  border-radius: ${Outline.borderRadius.large}px;
  background: ${({ theme }) => theme.bg4};
`

const Text = styled.p`
  display: inline-block;
  ${{ ...Typography.fontSize.x20 }}
  line-height: 1.5;
  margin: 0;
`
const ListItem = styled.div`
  width: 100%;
  height: ${Sizing.x340}px;
  overflow-x: scroll;
  display: flex;
  justify-content: space-between;
  margin-top: ${Sizing.x20}px;
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    margin: 20px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

const activeClassName = 'ACTIVE'
const Item = styled(NavLink).attrs({
  activeClassName,
})`
  position: relative;
  border-radius: ${Outline.borderRadius.base}px;
  min-width: ${Sizing.x255}px;
  height: ${Sizing.x320}px;
  background: ${Color.linearGradient.black};
  margin: 0 10px;
  text-decoration: none;
`

const Image = styled.div`
  width: ${Sizing.screen.width};
  height: ${Sizing.x255}px;
  border-radius: ${Outline.borderRadius.base}px;
  overflow: hidden;
  .image {
    transition: transform 0.2s;
  }
  .image:hover {
    transform: scale(1.1);
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  text-align: center;
`

export default function HeaderExplore() {
  const PreviewFile = (item: any) => {
    if (item.type.includes('image')) {
      return (
        <div className="image">
          <img src={item.image} width={'100%'} height={'100%'} />
        </div>
      )
    } else if (item.type.includes('video')) {
      return (
        <div className="image">
          <ReactPlayer
            url={item.image}
            muted={true}
            playing={true}
            width={'255px'}
            height={'200px'}
            loop={true}
            style={{ borderRadius: 10 }}
          />
        </div>
      )
    }
  }
  const listItem = useExploreState().listItem
  return (
    <HeaderFrame>
      <ListItem>
        {listItem.map((item, index) => (
          <Item key={index} id={`detail-nav-link`} to={`/detail/${item.id}`}>
            <Image>{PreviewFile(item)}</Image>
            <Content>
              <Text style={{ color: '#fff' }}>{item.name}</Text>
              <Text style={{ color: '#fff' }}>by {shortenAddress(item.owner)}</Text>
            </Content>
          </Item>
        ))}
      </ListItem>
    </HeaderFrame>
  )
}
