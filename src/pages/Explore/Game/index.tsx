import React from 'react'
import { ListGameItem } from 'state/explore/config'
import styled from 'styled-components'
import { Button, Color, Outline, Sizing, Typography } from 'styles'
import * as GameSvg from 'pages/Explore/Game/images'
import { SrcLogo, SrcAvatar } from 'assets'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  p {
    margin: 5px 0;
  }
`
const ItemGroup = styled.div`
  margin-top: 1rem;
`

const Image = styled.img`
  width: 110px;
  height: 110px;
  margin: 5px;
`

const Content = styled.div`
  width: 350px;
  min-height: 350px;
  padding: 0 10px;
  ${{ ...Outline.border.gray }}
  border-radius: ${Outline.borderRadius.base}px;
`
const Title = styled.p`
  ${{ ...Typography.fontWeight.bold }}
  ${{ ...Typography.fontSize.x50 }}
`

const Author = styled.div`
  display: flex;
  margin: 12px 0;
  ${{ ...Typography.fontSize.x40 }};
  ${{ ...Typography.fontWeight.regular }};
`
const GrayText = styled.p`
  ${{ ...Typography.text.grayText }}
`

const GreenText = styled.p`
  color: ${Color.neutral.green};
`
const Price = styled.div`
  display: flex;
`
const Text = styled.p``
const BoldText = styled.p`
  ${{ ...Typography.fontWeight.bold }}
  ${{ ...Typography.fontSize.x30 }}
  display: flex;
`
const Creator = styled.div`
  width: 50%;
`
const Avatar = styled.img`
  width: ${Sizing.icons.x25}px;
  height: ${Sizing.icons.x25}px;
  border-radius: ${Outline.borderRadius.small};
  margin-right: 10px;
`
const FooterContent = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const ButtonBuy = styled.div`
  ${{ ...Button.btn.primary }};
  width: ${Sizing.x240}px;
  margin-right: ${Sizing.x40}px;
  text-align: center;
  &:hover {
    opacity: 0.8;
  }
`
const ButtonBid = styled.div`
  ${{ ...Button.btn.secondary }};
  width: ${Sizing.x240}px;
  &:hover {
    opacity: 0.8;
  }
`

export default function GameExplore() {
  const GridList = () => {
    const matrix = new Array<Array<any>>()
    const list = ListGameItem
    for (let i = 0, k = -1; i < list.length; i++) {
      if (i % 3 == 0) {
        k++
        matrix[k] = []
      }
      matrix[k].push(list[i])
    }
    return matrix.map((mt, i) => (
      <div style={{ display: 'flex' }} key={i}>
        {mt.map((item, index) => (
          <Image src={item.image} key={index} />
        ))}
      </div>
    ))
  }
  const ContentItem = () => {
    return (
      <Content>
        <Title>Beach Dj Setup</Title>
        <Author>
          <GrayText>By</GrayText> xxxxx
        </Author>
        <BoldText>Multiple Edition</BoldText>
        <Price>
          <GrayText>Highest bid</GrayText> <GreenText>0,21 ETH</GreenText>
        </Price>
        <GrayText>A high quality beach party setup. For your wild beach party. See more</GrayText>
        <div style={{ display: 'flex', marginTop: 20 }}>
          <Creator>
            <GrayText>Creator</GrayText>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
              <Avatar src={SrcAvatar} />
              <Text>xxxxxx</Text>
            </div>
          </Creator>

          <Creator>
            <GrayText>Collection</GrayText>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
              <Avatar src={SrcLogo} />
              <Text>Polrare</Text>
            </div>
          </Creator>
        </div>
        <FooterContent>
          <ButtonBuy>Buy now</ButtonBuy>
          <ButtonBid>Place a Bids</ButtonBid>
        </FooterContent>
      </Content>
    )
  }
  return (
    <Container>
      <ItemGroup>{GridList()}</ItemGroup>
      <ItemGroup>
        <GameSvg.Main width={350} height={350} />
      </ItemGroup>
      <ItemGroup>{ContentItem()}</ItemGroup>
    </Container>
  )
}
