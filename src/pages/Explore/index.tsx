import StableSelect from 'components/StableSelect'
import ItemView from 'components/ItemView'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fieldChange, getListItems } from 'state/explore/actions'
import { useExploreState } from 'state/explore/hooks'
import styled from 'styled-components'
import * as Asset from 'assets'
import { optionsTopSeller, ListDicovery } from './config'
import { Color, Outline, Sizing, Button, Typography } from 'styles'
import HeaderExplore from 'components/HeaderExplore'
const BodyExplore = styled.div`
  width: 100%;
  padding: 0 ${Sizing.x140}px;
`
const BtnLoadmore = styled.div`
  ${{ ...Button.btn.primary }};
  width: ${Sizing.screen.width};
  height: ${Sizing.x40}px;
  margin-top: ${Sizing.x20}px;
  padding: 0;
  position: relative;
`
const ContentBtn = styled.div`
  ${{ ...Button.btn.secondary }};
  position: absolute;
  width: 99.6%;
  border-radius: 7px;
  padding: 5.5px;
`

const TopSellerItem = styled.div`
  ${{ ...Outline.border.purple }}
  background: ${({ theme }) => theme.bg3};
  cursor: pointer;
  border-radius: ${Outline.borderRadius.base}px;
  display: flex;
  min-width: ${Sizing.x255}px;
  max-width: ${Sizing.x320}px;
  padding: ${Sizing.x10}px;
  align-items: center;
  margin: 8px 0;
  height: ${Sizing.x80}px;
  &:hover {
    box-shadow: 2px 4px 8px #f0f0f0;
  }
`

const Avatar = styled.div`
  width: ${Sizing.x40}px;
  height: ${Sizing.x40}px;
  border-radius: ${Outline.borderRadius.small}px;
  margin-left: ${Sizing.x10}px;
  postiton: relative;
  background-size: cover;
  background-position: center center;
  background-image: url(${Asset.SrcAvatar});
`

const ContentSeller = styled.div`
  margin-left: ${Sizing.x20}px;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  ${{ ...Typography.header.x70 }}
  margin-bottom: 1rem;
`

const Text = styled.p`
  ${{ ...Typography.fontSize.x20 }}
  margin: 0;
`
const Image = styled.img``

const ContentGroup = styled.div`
  margin-top: ${Sizing.x100}px;
`

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  * {
    display: flex;
    align-items: center;
  }
  .itemFilter {
    ${{ ...Typography.fontWeight.bold }}
    background:#1D1D1D;
    padding: 12px 24px;
    border-radius: ${Outline.borderRadius.small}px;
    color: ${Color.neutral.white};
    margin: 0 20px;
    cursor: pointer;
    &:hover {
      color: ${Color.neutral.black};
      background: ${Color.neutral.yellow};
    }
  }
  .btnFilter {
    cursor: pointer;
    background: #353945;
    padding: 4px 24px;
    border-radius: ${Outline.borderRadius.small}px;
    height: 50px;
    color: ${Color.neutral.white};
  }
`
const ListItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const optionsSeller = [
  {
    name: 'Seller',
    id: '1',
  },
  {
    name: 'Buyer',
    id: '2',
  },
]

export default function Explore() {
  const dispatch = useDispatch()
  const state = useExploreState()
  useEffect(() => {
    dispatch(getListItems())
    dispatch(fieldChange({ fieldName: 'href', fieldValue: window.location.href }))
  }, [])

  const GridList = () => {
    const matrix = new Array<Array<any>>()
    const list = optionsTopSeller
    for (let i = 0, k = -1; i < list.length; i++) {
      if (i % 4 == 0) {
        k++
        matrix[k] = []
      }
      matrix[k].push(list[i])
    }
    return matrix.map((mt, i) => (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} key={i}>
        {mt.map((item, index) => (
          <TopSellerItem key={index}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{item.id}</Text>
              <Avatar />
            </div>
            <ContentSeller>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
            </ContentSeller>
          </TopSellerItem>
        ))}
      </div>
    ))
  }

  const onLoadMore = () => {
    dispatch(fieldChange({ fieldName: 'limit', fieldValue: state.limit + 4 }))
  }

  return (
    <BodyExplore>
      <HeaderExplore />

      <ContentGroup>
        <Title>
          Top
          <StableSelect option={optionsSeller} textColor={'rgb(0, 102, 255)'} />
        </Title>
        {GridList()}
      </ContentGroup>
      <ContentGroup>
        <Title>
          Live Auction <Asset.Fire width={24} height={24} />
        </Title>
        <ListItem>
          {state.listItem.map((item, index) => index < 4 && <ItemView item={item} key={index} isLiveAuction={true} />)}
        </ListItem>
      </ContentGroup>

      <ContentGroup>
        <Title>
          Hot Bids <Asset.Star width={24} height={24} />
        </Title>
        <ListItem>{state.listItem.map((item, index) => index < 4 && <ItemView item={item} key={index} />)}</ListItem>
      </ContentGroup>

      <ContentGroup>
        <Filter>
          <div>
            <Title>Discovery</Title>
            {ListDicovery.map((item, index) => (
              <div key={index} className="itemFilter">
                {item.name}
              </div>
            ))}
          </div>
          <div className="btnFilter">
            {`Filter & Sort`} <Image src={Asset.SrcFilter} />
          </div>
        </Filter>
        <ListItem>
          {state.listItem.slice(0, state.limit).map((item, index) => (
            <ItemView item={item} key={index} />
          ))}
        </ListItem>
        <BtnLoadmore onClick={onLoadMore}>
          <ContentBtn>Load More</ContentBtn>
        </BtnLoadmore>
      </ContentGroup>
    </BodyExplore>
  )
}
