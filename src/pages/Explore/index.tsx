import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fieldChange, getListItems, searchItems } from 'state/explore/actions'
import { useExploreState } from 'state/explore/hooks'
import styled from 'styled-components'
import * as Asset from 'assets'
import { Color, Outline, Sizing, Button, Typography } from 'styles'
import HeaderExplore from 'components/Header/Explore'
import ItemView from './ItemView'
import { ListHotBid, optionsTopBuyer, optionsTopSeller } from 'state/explore/config'
import { getCategories } from 'state/mint/actions'
import { useMintState } from 'state/mint/hooks'
import PlaceholderLoading from './placeholderLoading'
import Modal from 'components/Modal'
import Categories from 'components/Mint/categories'
import SelectTable from 'components/Mint/selectTable'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { relative } from 'path/posix'

const BodyExplore = styled.div`
  width: 100%;
  padding: 0 10%;
`

const BtnLoadmore = styled.div`
  ${{ ...Button.btn.secondary }};
  margin-top: 1rem;
  width: 100%;
`
const TopSellerItem = styled.div`
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
  box-shadow: 0px 4px 26px rgba(99, 36, 237, 0.16);
  &:hover {
    box-shadow: 2px 4px 8px #f0f0f0;
  }
  @media only screen and (max-width: 700px) {
    width: 100%;
  }
`

const Avatar = styled.div`
  width: ${Sizing.x40}px;
  height: ${Sizing.x40}px;
  border-radius: ${Outline.borderRadius.small}px;
  margin-left: ${Sizing.x10}px;
  position: relative;
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
  margin-top: ${Sizing.x60}px;
`

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  * {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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
    @media only screen and (max-width: 700px) {
      display: none;
    }
  }
  .btnFilter {
    cursor: pointer;
    background: #353945;
    padding: 4px 24px;
    border-radius: ${Outline.borderRadius.small}px;
    height: 50px;
    color: ${Color.neutral.white};
    @media only screen and (max-width: 700px) {
      display: none;
    }
  }
`
const ListItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const FilterContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  z-index: 1;
  width: 200px;
  background: ${({ theme }) => theme.bg6};
  padding: 10px;
  border: 1px solid #e0d3fb;
  box-sizing: border-box;
  box-shadow: 0px 4px 26px rgba(53, 223, 177, 0.16);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  .sortBy {
    width: 100%;
    justify-content: space-between;
    cursor: pointer;
  }
  p {
    color: #939393;
    ${{ ...Typography.fontSize.x20 }}
    ${{ ...Typography.fontWeight.bold }}
  }
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
  const [selectCategory, setSelectCategory] = useState('')
  const [filter, setFilter] = useState('')
  const state = useExploreState()
  const listCategories = useMintState().categories
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.FILTER_EXPLORE)
  const toggle = useToggleModal(ApplicationModal.FILTER_EXPLORE)
  useOnClickOutside(node, open ? toggle : undefined)
  useEffect(() => {
    setTimeout(() => {
      dispatch(getListItems())
    }, 1500)
    dispatch(fieldChange({ fieldName: 'href', fieldValue: window.location.href }))
    dispatch(getCategories())
  }, [])

  const listItem = useMemo(() => {
    const list = state.listItem
    return list
  }, [state.listItem])

  const FilterForm = () => {
    return (
      <FilterContainer>
        <Text>Sort By</Text>
        <div
          className="sortBy"
          onClick={() => {
            dispatch(searchItems({ sortBy: 'sort', name: 'price_asc' }))
            setFilter('Cheaper')
          }}
        >
          <p> Cheaper</p>
          {filter === 'Cheaper' && <Asset.Check width={16} height={16} />}
        </div>
        <div
          className="sortBy"
          onClick={() => {
            dispatch(searchItems({ sortBy: 'sort', name: 'price_desc' }))
            setFilter('Highest')
          }}
        >
          <p>Highest Price</p>
          {filter === 'Highest' && <Asset.Check width={16} height={16} />}
        </div>
        <div className="sortBy">
          <p>Most Liked</p>
          {filter === 'Liked' && <Asset.Check width={16} height={16} />}
        </div>
      </FilterContainer>
    )
  }
  const GridList = () => {
    const matrix = new Array<Array<any>>()
    const list = state.topSeller === 'Seller' ? optionsTopSeller : optionsTopBuyer
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
    <>
      {listItem?.length > 0 ? (
        <BodyExplore>
          <HeaderExplore />
          <ContentGroup>
            <Title>
              Top
              <SelectTable option={optionsSeller} textColor={'rgb(0, 102, 255)'} />
            </Title>
            {GridList()}
          </ContentGroup>
          <ContentGroup>
            <Title>
              Live Auction <Asset.Fire width={24} height={24} />
            </Title>
            <ListItem>
              {ListHotBid.map((item, index) => index < 4 && <ItemView item={item} key={index} isLiveAuction={true} />)}
            </ListItem>
          </ContentGroup>

          <ContentGroup>
            <Title>
              Hot Bids <Asset.Star width={24} height={24} />
            </Title>
            <ListItem>{ListHotBid.map((item, index) => index < 4 && <ItemView item={item} key={index} />)}</ListItem>
          </ContentGroup>

          <ContentGroup style={{ position: 'relative' }}>
            <Filter>
              <div>
                <Title>Discovery</Title>
                <div
                  className="itemFilter"
                  style={{
                    background: selectCategory === 'All' ? `${Color.neutral.yellow}` : '',
                    color: selectCategory === 'All' ? `${Color.neutral.black}` : '',
                  }}
                  onClick={() => {
                    dispatch(searchItems({ sortBy: 'categoryName', name: '' }))
                    setSelectCategory('All')
                  }}
                >
                  All
                </div>
                {listCategories &&
                  listCategories.map((item, index) => (
                    <div
                      key={index}
                      className="itemFilter"
                      style={{
                        background: selectCategory === item.categoryName ? `${Color.neutral.yellow}` : '',
                        color: selectCategory === item.categoryName ? `${Color.neutral.black}` : '',
                      }}
                      onClick={() => {
                        dispatch(searchItems({ sortBy: 'categoryName', name: item.categoryName }))
                        setSelectCategory(item.categoryName)
                      }}
                    >
                      {item.categoryName}
                    </div>
                  ))}
              </div>
              <div ref={node as any}>
                <div className="btnFilter" onClick={toggle}>
                  {`Filter & Sort`} <Image src={Asset.SrcFilter} />
                </div>
                {open && <FilterForm />}
              </div>
            </Filter>
            <ListItem>
              {state.listItem.slice(0, state.limit).map((item, index) => (
                <ItemView item={item} key={index} />
              ))}
            </ListItem>
            <BtnLoadmore onClick={onLoadMore}>Load More</BtnLoadmore>
          </ContentGroup>
        </BodyExplore>
      ) : (
        <PlaceholderLoading />
      )}
    </>
  )
}
