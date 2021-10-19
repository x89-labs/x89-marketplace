import React, { useEffect, useRef } from 'react'
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { fieldChange, getListItems } from 'state/explore/actions'
import { useExploreState } from 'state/explore/hooks'
import * as Asset from 'assets'
import styled from 'styled-components'
import { Button, Color, Typography } from 'styles'
import { ListHotBid } from 'state/explore/config'
import { getCategories } from 'state/mint/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { useOnClickOutside } from 'hooks/useOnClickOutside'

import { Item } from 'models/item'
import PlaceholderLoading from './placeholderLoading'
import { useIsDarkMode } from 'state/user/hooks'
import { RouteComponentProps } from 'react-router-dom'

// import * as theme from 'theme'
// import ItemView from './ItemView'
// import HeaderExplore from 'components/Header/Explore'
// import PlaceholderLoading from './placeholderLoading'
// import SelectTable from 'components/Mint/selectTable'
// import { relative } from 'path/posix'
// import Modal from 'components/Modal'
// import Categories from 'components/Mint/categories'

// const TopSellerItem = styled.div`
//   background: ${({ theme }) => theme.bg3};
//   cursor: pointer;
//   border-radius: ${Outline.borderRadius.base}px;
//   display: flex;
//   min-width: ${Sizing.x255}px;
//   max-width: ${Sizing.x320}px;
//   padding: ${Sizing.x10}px;
//   align-items: center;
//   margin: 8px 0;
//   height: ${Sizing.x80}px;
//   box-shadow: 0px 4px 26px rgba(99, 36, 237, 0.16);
//   &:hover {
//     box-shadow: 2px 4px 8px #f0f0f0;
//   }
//   @media only screen and (max-width: 700px) {
//     width: 100%;
//   }
// `
// const Avatar = styled.div`
//   width: ${Sizing.x40}px;
//   height: ${Sizing.x40}px;
//   border-radius: ${Outline.borderRadius.small}px;
//   margin-left: ${Sizing.x10}px;
//   position: relative;
//   background-size: cover;
//   background-position: center center;
//   background-image: url(${Asset.SrcAvatar});
// `

// const Text = styled.p`
//   ${{ ...Typography.fontSize.x20 }}
//   margin: 0;
// `
// const Image = styled.img``
// const ContentGroup = styled.div`
//   margin-top: ${Sizing.x60}px;
// `
// const Filter = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   * {
//     display: flex;
//     align-items: center;
//     flex-wrap: wrap;
//   }
//   .itemFilter {
//     ${{ ...Typography.fontWeight.bold }}
//     background:#1D1D1D;
//     padding: 12px 24px;
//     border-radius: ${Outline.borderRadius.small}px;
//     color: ${Color.neutral.white};
//     margin: 0 20px;
//     cursor: pointer;
//     &:hover {
//       color: ${Color.neutral.black};
//       background: ${Color.neutral.yellow};
//     }
//     @media only screen and (max-width: 700px) {
//       display: none;
//     }
//   }
//   .btnFilter {
//     cursor: pointer;
//     background: #353945;
//     padding: 4px 24px;
//     border-radius: ${Outline.borderRadius.small}px;
//     height: 50px;
//     color: ${Color.neutral.white};
//     @media only screen and (max-width: 700px) {
//       display: none;
//     }
//   }
// `
// const ListItem = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
// `
// const FilterContainer = styled.div`
//   position: absolute;
//   top: 60px;
//   right: 0;
//   z-index: 1;
//   width: 200px;
//   background: ${({ theme }) => theme.bg6};
//   padding: 10px;
//   border: 1px solid #e0d3fb;
//   box-sizing: border-box;
//   box-shadow: 0px 4px 26px rgba(53, 223, 177, 0.16);
//   border-radius: 8px;
//   display: flex;
//   flex-direction: column;
//   .sortBy {
//     width: 100%;
//     justify-content: space-between;
//     cursor: pointer;
//   }
//   p {
//     color: #939393;
//     ${{ ...Typography.fontSize.x20 }}
//     ${{ ...Typography.fontWeight.bold }}
//   }
// `
// const optionsSeller = [
//   {
//     name: 'Seller',
//     id: '1',
//   },
//   {
//     name: 'Buyer',
//     id: '2',
//   },
// ]

const BtnLoadmore = styled.div`
  ${{ ...Button.btn.secondary }};
  margin-top: 1rem;
  text-align: center;
`
const Title = styled.div`
  display: flex;
  align-items: center;
  ${{ ...Typography.header.x70 }}
`
export default function Explore({ history }: RouteComponentProps) {
  const darkMode = useIsDarkMode()
  const dispatch = useDispatch()
  const state = useExploreState()
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
  }, [dispatch])

  const onLoadMore = () => {
    dispatch(fieldChange({ fieldName: 'limit', fieldValue: state.limit + 4 }))
  }

  // const Item = (value: Item) => {
  //   return (
  //     <Col className="mt-4" sm="3" xs="12">
  //       <Card>
  //         <CardImg style={{ minHeight: 300, maxHeight: 300, objectFit: 'cover' }} src={value.image} />
  //         <CardBody>
  //           <CardTitle tag="h5">{value.name}</CardTitle>
  //           <CardText>{value.description.slice(0, 100)}</CardText>
  //           <CardText>
  //             <small className="text-muted">
  //               {value.price} {value.symbol}
  //             </small>
  //           </CardText>
  //         </CardBody>
  //       </Card>
  //     </Col>
  //   )
  // }
  const Block = (list: Item[], nameBlock?: string, icon?: any) => {
    return (
      <Container>
        {nameBlock && (
          <Row>
            <Title className="mt-3">
              {nameBlock}
              {icon}
            </Title>
          </Row>
        )}
        <Row>
          {list.map((value, index) => (
            <Col className="mt-4" lg="3" md="4" sm="6" xs="12" key={index}>
              <Card style={{ backgroundColor: 'transparent' }} onClick={() => Detail(value.id)}>
                <CardImg style={{ minHeight: 250, maxHeight: 250, objectFit: 'cover' }} src={value.urlFile} />
                <CardBody style={{ background: darkMode ? Color.linearGradient.black : Color.linearGradient.white }}>
                  <CardTitle tag="h5">{value.name}</CardTitle>
                  <CardText className="text-justify">{value.descriptions?.slice(0, 70)}</CardText>
                  <CardText>
                    <small className="text-muted">
                      {value.price} {value.symbol}
                    </small>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    )
  }

  const Detail = (id: string) => {
    return history.push(`/items/${id}`)
  }
  return (
    <>
      {ListHotBid?.length > 0 ? (
        <Container fluid>
          {ListHotBid.length != 0 &&
            Block(ListHotBid.slice(0, 4), 'Live Auction', <Asset.Fire width={24} height={24} />)}
          {ListHotBid.length > 0 && Block(ListHotBid.slice(0, 4), 'Hot Bids', <Asset.Star width={24} height={24} />)}
          {ListHotBid.length > 0 && Block(ListHotBid, 'Discovery')}
          {ListHotBid.length > 4 ? <BtnLoadmore onClick={onLoadMore}>Load More</BtnLoadmore> : null}
        </Container>
      ) : (
        <PlaceholderLoading />
      )}
    </>
  )
}
