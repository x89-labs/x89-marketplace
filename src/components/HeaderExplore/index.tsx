import React, { useState } from 'react'
import styled from 'styled-components'
import { Color, Outline, Sizing, Button, Typography } from 'styles'
import * as Asset from 'assets'
import { useExploreState } from 'state/explore/hooks'
import ReactPlayer from 'react-player'
import { shortenAddress } from 'utils'

const HeaderFrame = styled.div`
  display: flex;
  flex-direction: column;
`
const HeaderLayer = styled.div`
  height: ${Sizing.x340}px;
  width: ${Sizing.screen.width};
  border-radius: ${Outline.borderRadius.large}px;
  background: ${Color.linearGradient.layer};
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
const LeftHeader = styled.div`
  margin: 50px 30px;
`
const RightHeader = styled.div`
  margin: ${Sizing.x40}px;
`
const ButtonHeader = styled.div`
  ${{ ...Button.btn.primary }};
  width: ${Sizing.x240}px;
  margin-right: ${Sizing.x40}px;
  text-align: center;
`
const ButtonBorder = styled.div`
  ${{ ...Button.btn.primary }};
  width: ${Sizing.x240}px;
  padding: 0;
  position: relative;
`

const ContentBtn = styled.div`
  ${{ ...Button.btn.secondary }};
  position: absolute;
  width: 99%;
  height: 90%;
`
const TitleGreen = styled.p`
  ${{ ...Typography.header.x70 }}
  color: ${Color.neutral.green}
`
const TitlePurple = styled.p`
  ${{ ...Typography.header.x70 }}
  color: ${Color.neutral.purple}
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
const Item = styled.div`
  postiton: relative;
  border-radius: ${Outline.borderRadius.base}px;
  min-width: ${Sizing.x255}px;
  height: ${Sizing.x320}px;
  background: ${Color.linearGradient.black};
  margin: 0 10px;
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
      <HeaderLayer>
        <Header>
          <LeftHeader>
            <TitlePurple>Discover & Collect </TitlePurple>
            <TitleGreen>Extraordinary</TitleGreen>
            <TitlePurple>NFTs </TitlePurple>
            <Text>Marketplace for crypto collectibies non-fungible token (NFTs).</Text>
            <div style={{ display: 'flex', margin: '14px 0' }}>
              <ButtonHeader>Explore more</ButtonHeader>
              <ButtonBorder>
                <ContentBtn>Start Create</ContentBtn>
              </ButtonBorder>
            </div>
          </LeftHeader>
          <RightHeader>
            <div style={{ position: 'relative', width: 240, height: 280, background: '#ccc', borderRadius: 10 }}>
              <Asset.WalletPicture width={240} height={280} style={{ position: 'absolute', top: -20, left: -20 }} />
            </div>
          </RightHeader>
        </Header>
      </HeaderLayer>
      <ListItem>
        {listItem.map((item, index) => (
          <Item key={index}>
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
