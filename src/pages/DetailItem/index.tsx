import { parse } from 'qs'
import React, { useEffect, useState } from 'react'
import { Bold } from 'react-feather'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { getItem } from 'state/explore/actions'
import { useExploreState } from 'state/explore/hooks'
import styled from 'styled-components'
import { display } from 'styled-system'
import { Button, Color, Sizing, Typography } from 'styles'
import { shortenAddress } from 'utils'

enum SwitchType {
  Details = 1,
  Bids = 2,
  History = 3,
}

const Container = styled.div`
  width: 100%;
  max-height: 32rem;
  display: flex;
`
const Image = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .file {
    width: 60%;
    height: 100%;
    border-radius: 10px;
  }
`
const ContentItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid ${Color.neutral.gray2};
  width: 40%;
`
const HeaderContent = styled.div`
  padding: 0 1rem;
`
const Creator = styled.div`
  margin-top: 20px;
`
const BodyContent = styled.div``
const SwitchTab = styled.div`
  display: flex;
  margin-top: 1rem;
  border-bottom: 1px solid ${Color.neutral.gray2};
`
const Tab = styled.div`
  padding: 5px 10px;
  cursor: pointer;
`
const FooterContent = styled.div`
  border-top: 2px solid ${Color.neutral.gray2};
  height: 35%;
  display: flex;
  bottom: 0;
  justify-content: space-around;
  align-items: center;
`
const Author = styled.p`
  display: flex;
  margin: 12px 0 10px 0;
  ${{ ...Typography.fontSize.x40 }};
  ${{ ...Typography.fontWeight.regular }};
`

const GrayText = styled.p`
  ${{ ...Typography.text.grayText }}
`

const GreenText = styled.p`
  color: ${Color.neutral.green};
  margin: 0;
`

const Text = styled.p`
  margin: 0;
`
const BoldText = styled.p`
  ${{ ...Typography.fontWeight.bold }}
  ${{ ...Typography.fontSize.x30 }}
  display: flex;
  margin: 0;
`

const Edition = styled.div``

const HighBid = styled.div`
  margin-left: 20px;
  display: flex;
`

const Collection = styled.div``

const NameItem = styled.p`
  ${{ ...Typography.fontSize.x70 }};
  ${{ ...Typography.fontWeight.bold }};
  margin: 0;
`

const ContentBtn = styled.div`
  ${{ ...Button.btn.secondary }};
  position: absolute;
  width: 98%;
  height: 90%;
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
  ${{ ...Button.btn.primary }};
  width: ${Sizing.x240}px;
  height: 48px;
  padding: 0;
  position: relative;
  &:hover {
    opacity: 0.8;
  }
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
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }
  const ReadMore = (text: string) => {
    return (
      <div>
        {isReadMore ? text.slice(0, 100) + '. . .' : text}
        <span
          onClick={toggleReadMore}
          style={{
            color: 'blue',
            cursor: 'pointer',
          }}
        >
          <GreenText>{isReadMore ? ' Read More' : ' Show Less'}</GreenText>
        </span>
      </div>
    )
  }

  const PreviewFile = () => {
    if (item) {
      if (item.type.includes('image')) {
        return <img src={item.image} className="file" />
      } else if (item.type.includes('video')) {
        return (
          <div className="file">
            <ReactPlayer
              url={item.image}
              muted={true}
              playing={true}
              controls={true}
              loop={true}
              width={'100%'}
              height={'100%'}
              style={{ borderRadius: '10px' }}
            />
          </div>
        )
      }
    }
  }
  return (
    <Container>
      <Image>{PreviewFile()}</Image>
      <ContentItem>
        <div style={{ overflowY: 'scroll', height: '65%' }}>
          <HeaderContent>
            <NameItem>{item?.name}</NameItem>
            <Author>
              <GrayText>By</GrayText> {item?.owner && shortenAddress(item?.owner)}
            </Author>
            <div style={{ display: 'flex' }}>
              {item?.totalQuantity && item?.totalQuantity > 1 ? (
                <BoldText>
                  Multiple Edition <GrayText>1/{item?.totalQuantity}</GrayText>
                </BoldText>
              ) : (
                <div>
                  <BoldText>
                    Single Edition <GrayText>1/{item?.totalQuantity}</GrayText>
                  </BoldText>
                </div>
              )}
              <HighBid>
                <GrayText>Highest bid</GrayText> <GreenText>0,21 ETH</GreenText>
              </HighBid>
            </div>
            {item?.description && item?.description.length > 100 ? (
              ReadMore(item.description)
            ) : (
              <Text>{item?.description}</Text>
            )}
            <div style={{ display: 'flex' }}>
              <Creator>
                <GrayText>Creator</GrayText>
                <Text>{item?.owner ? shortenAddress(item.owner) : ''}</Text>
              </Creator>

              <Collection></Collection>
            </div>
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
        </div>
        <div
          style={{
            width: '100%',
            height: 2,
            background:
              'linear-gradient(226.07deg, #02E879 8.39%, #279EA5 28.31%, #475CCC 47.69%, #5B34E4 61.69%, #6324ED 68.92%)',
          }}
        />
        <FooterContent>
          <ButtonBuy>
            Buy for {item?.price} {item?.symbol}
          </ButtonBuy>
          <ButtonBid>
            <ContentBtn>Place a Bids</ContentBtn>
          </ButtonBid>
        </FooterContent>
      </ContentItem>
    </Container>
  )
}
