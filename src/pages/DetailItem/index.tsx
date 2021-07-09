import React, { useEffect, useState } from 'react'
import { Bold } from 'react-feather'
import { useDispatch } from 'react-redux'
import { getItem } from 'state/explore/actions'
import { useExploreState } from 'state/explore/hooks'
import styled from 'styled-components'

enum SwitchType {
  Details = 1,
  Bids = 2,
  History = 3,
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
const Image = styled.div`
  width: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .image {
    width: 70%;
    height: 70%;
    border-radius: 10px;
  }
`
const ContentItem = styled.div`
  color: #000;
  background-color: #e6e6e6;
  border-left: 1px solid #ccc;
  width: 35%;
`
const HeaderContent = styled.div`
  padding: 0 1rem;
`
const InfoItem = styled.div`
  display: flex;
`
const Creator = styled.div`
  margin-top: 3rem;
`
const BodyContent = styled.div``
const SwitchTab = styled.div`
  display: flex;
  margin-top: 1rem;
  border-bottom: 1px solid #ccc;
`
const Tab = styled.div`
  padding: 5px 10px;
  cursor: pointer;
`
const FooterContent = styled.div`
  margin-top: 12rem;
  border-top: 1px solid #ccc;
  display: flex;
  bottom: 0;
  height: 5rem;
  justify-content: space-between;
  align-items: center;
`
const TitleBold = styled.p`
  margin: 0;
  font-weight: bold;
`
const TitleNormal = styled.p`
  display: flex;
  margin: 0;
  color: rgba(4, 4, 5, 0.4);
  font-weight: bold;
`
const NameItem = styled.p`
  font-size: 2rem;
  font-weight: bolder;
  margin-bottom: 0;
`
const ButtonBuy = styled.div`
  background-color: rgb(0, 102, 255);
  color: #fff;
  padding: 0 24px;
  border-radius: 48px;
  height: 48px;
  margin-right: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
const ButtonBid = styled.div`
  background-color: #0066ff26;
  color: #0066ff;
  padding: 0 24px;
  border-radius: 48px;
  height: 48px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
const Descreption = styled.div`
  margin-top: 1rem;
`

export default function DetailItem() {
  const [switchType, setSwitchType] = useState(SwitchType.Details)
  const dispatch = useDispatch()
  const item = useExploreState().item
  useEffect(() => {
    let href = window.location.href
    href = href.substring(href.lastIndexOf('/') + 1)
    dispatch(getItem(href))
  }, [])
  console.log(item)

  return (
    <Container>
      <Image>
        <img src={item?.image} className="image" />
      </Image>
      <ContentItem>
        <HeaderContent>
          <InfoItem>
            <NameItem>{item?.name}</NameItem>
          </InfoItem>
          <TitleBold>
            On sale for {item?.price} {item?.symbol}
          </TitleBold>
          <Descreption>{item?.description}</Descreption>
          <Creator>
            <TitleNormal>Creator</TitleNormal>
            <TitleNormal>{item?.owner}</TitleNormal>
          </Creator>
        </HeaderContent>

        <BodyContent>
          <SwitchTab>
            <Tab
              style={{ borderBottom: switchType === 1 ? '1px solid #000' : '' }}
              onClick={() => setSwitchType(SwitchType.Details)}
            >
              Details
            </Tab>
            <Tab
              style={{ borderBottom: switchType === 2 ? '1px solid #000' : '' }}
              onClick={() => setSwitchType(SwitchType.Bids)}
            >
              Bids
            </Tab>
            <Tab
              style={{ borderBottom: switchType === 3 ? '1px solid #000' : '' }}
              onClick={() => setSwitchType(SwitchType.History)}
            >
              History
            </Tab>
          </SwitchTab>
        </BodyContent>
        <FooterContent>
          <ButtonBuy>
            <p style={{ marginBottom: 0, fontWeight: 'bold' }}>
              Buy for {item?.price} {item?.symbol}
            </p>
          </ButtonBuy>
          <ButtonBid>
            <p style={{ marginBottom: 0, fontWeight: 'bold' }}>Place a Bids</p>
          </ButtonBid>
        </FooterContent>
      </ContentItem>
    </Container>
  )
}
