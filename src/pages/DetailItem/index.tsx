import React, { useState } from 'react'
import { PutOnSaleType } from 'models/item'
import { Heart, MoreHorizontal, Octagon } from 'react-feather'

import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Table } from 'reactstrap'
import { shortenAddress } from 'utils'
import classnames from 'classnames'
import styled from 'styled-components'
import { Button } from 'pages/styled'

const NavTab = styled.div`
  .nav .active {
    background: ${({ theme }) => theme.active};
  }
  .tab-content::-webkit-scrollbar {
    display: none;
  }
  .tab-content {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`

const Price = styled.span`
  color: ${({ theme }) => theme.blue1};
`
const More = styled.ul`
  position: absolute;
  top: 40px;
  right: -10px;
  background: ${({ theme }) => theme.bg0};
  list-style: none;
  padding: 10px;
  a {
    text-align: right;
    &:hover {
      background: ${({ theme }) => theme.bg4};
    }
    &:active {
      background: transparent;
    }
  }
`

export default function DetailItem() {
  const [more, setMore] = useState(true)
  const [activeTab, setActiveTab] = useState('1')
  const toggle = (tab: any) => {
    if (activeTab !== tab) setActiveTab(tab)
  }
  const [item] = useState({
    id: 'a8a01adc-0dd5-4ed8-b942-85f5d9636b15',
    name: 'Built-In',
    descriptions:
      'Experience the art created and animated by Artificial Intelligence! \nIntroducing a new limited edition 4K AI video paintings with increased frame rate!\nWe additionally involved 4 new neural networks in the production process, which made it possible to decompose the video into frames, increase their number, then increase the size with improved quality and then glue them back into a full-fledged video. The production has become much more complicated and interesting. All owners of previous versions of AI video can contact us on Twitter and increase their video size for an additional fee',
    price: 22,
    symbol: 'ETH',
    numberOfCopies: 1,
    contractAddress: '0x398bcBcd555326A875C6e6A52907807303E6Af15',
    urlFile: 'https://ipfs.infura.io/ipfs/QmYqFj6rjGdrCaUDWLZjMaa9HAqbRoMgUnvbhLFBCjGfmz',
    categoryId: '9c9debff-35d5-4276-ba59-d606c8ed9859',
    createdBy: '0x0C7c950F4dFb218328fFAC4ba54C6BaF51be820e',
    owner: '0x0C7c950F4dFb218328fFAC4ba54C6BaF51be820e',
    expireTime: null,
    collectionId: '',
    royalties: 1,
    putOnSaleType: PutOnSaleType.FixedPrice,
    startingDate: new Date(),
    expirationDate: new Date(),
  })
  const [history] = useState([
    {
      action: 'Bid',
      name: 'Kien',
      avatar:
        'https://i0.wp.com/lh3.googleusercontent.com/-Jsg_ToJfbm4/WHmCdcXhHSI/AAAAAAAAAoU/XgAWhvRAASM/s0/58798274ad088.jpg',
      price: '12 Eth',
      txHash: '0x6136cef97e2347d4d98b818871b07551c2e522cdcad167bbaf90a7f23932e944',
      date: new Date().toLocaleDateString(),
    },
    {
      action: 'Bid Cancel',
      name: 'Kien',
      avatar:
        'https://i0.wp.com/lh3.googleusercontent.com/-Jsg_ToJfbm4/WHmCdcXhHSI/AAAAAAAAAoU/XgAWhvRAASM/s0/58798274ad088.jpg',
      price: '1 Eth',
      txHash: '0x6136cef97e2347d4d98b818871b07551c2e522cdcad167bbaf90a7f23932e944',
      date: new Date().toLocaleDateString(),
    },
    {
      action: 'Bid',
      name: 'Manh',
      avatar:
        'https://i0.wp.com/lh3.googleusercontent.com/-Jsg_ToJfbm4/WHmCdcXhHSI/AAAAAAAAAoU/XgAWhvRAASM/s0/58798274ad088.jpg',
      price: '5 PSB',
      txHash: '0x6136cef97e2347d4d98b818871b07551c2e522cdcad167bbaf90a7f23932e944',
      date: new Date().toLocaleDateString(),
    },
    {
      action: 'Bid',
      name: 'Lam',
      avatar:
        'https://i0.wp.com/lh3.googleusercontent.com/-Jsg_ToJfbm4/WHmCdcXhHSI/AAAAAAAAAoU/XgAWhvRAASM/s0/58798274ad088.jpg',
      price: '16 Eth',
      txHash: '0x6136cef97e2347d4d98b818871b07551c2e522cdcad167bbaf90a7f23932e944',
      date: new Date().toLocaleDateString(),
    },
  ])
  return (
    <Container fluid>
      <Row>
        <Col lg={7} className="preview p-3  text-center">
          <img src={item.urlFile} style={{ maxHeight: '85vh' }} alt="" />
        </Col>
        <Col lg={5} className="info p-3">
          {/* head */}
          <div className="info-header py-2 px-3 rounded d-flex justify-content-between">
            <span className="h5 mb-0 align-self-center">{`# ` + item.name}</span>
            <span style={{ position: 'relative' }}>
              <button className="px-1 border rounded">
                <Heart width={12} height={12} />
                <small>{` 25`}</small>
              </button>
              <MoreHorizontal
                style={{ cursor: 'pointer' }}
                className="info-more m-1 ms-2"
                onClick={() => setMore(!more)}
              />
              <More hidden={more}>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => {
                      setMore(!more)
                    }}
                  >
                    Refresh Metadata
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => {
                      setMore(!more)
                    }}
                  >
                    Share
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      setMore(!more)
                    }}
                    href="#"
                  >
                    Report
                  </a>
                </li>
              </More>
            </span>
          </div>
          {/* body */}
          <div className="info-body">
            <div className="price my-2 text-secondary">
              from <Price>{item.price + item.symbol}</Price>
              <Octagon className="mx-2 align-self-center" width={10} />
              {item.numberOfCopies} of {item.numberOfCopies} available
            </div>
            <div className="description">{item.descriptions}</div>
            <div className="creator my-3 d-flex ">
              <img src={item.urlFile} alt="" className="rounded-circle" style={{ width: 40, height: 40 }} />
              <span className="mx-3 align-self-center">Polrare</span>
              <span className="p-2 border rounded ms-auto">{shortenAddress(item.owner)}</span>
            </div>
            <NavTab>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => {
                      toggle('1')
                    }}
                  >
                    Detail
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => {
                      toggle('2')
                    }}
                  >
                    Bids
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '3' })}
                    onClick={() => {
                      toggle('3')
                    }}
                  >
                    History
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent
                activeTab={activeTab}
                className="p-3 tab-content"
                style={{ height: '35vh', overflowY: 'scroll', scrollbarWidth: 'none' }}
              >
                <TabPane tabId="1">
                  <Row>
                    <span className="text-secondary h6">Owner</span>
                    <div className="creator my-3">
                      <img src={item.urlFile} alt="" className="rounded-circle" style={{ width: 40, height: 40 }} />
                      <span className="mx-3">Polrare</span>
                    </div>
                    <span className="text-secondary h6">Properties</span>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Table>
                      <tbody>
                        {history.map((v) => (
                          <tr key={v.txHash}>
                            {/* <th className="align-self-center" scope="row">
                              {i + 1}
                            </th> */}
                            <td className="text-center" width={'10%'}>
                              <img src={v.avatar} alt="" style={{ width: 40, borderRadius: '50%' }} />
                            </td>
                            <td>
                              <span className="text-secondary">
                                <Price>{v.price + ` `}</Price>
                                by
                                <Price>{` ` + v.name + ` `}</Price>
                              </span>
                              <br />
                              <span className="text-secondary">{v.date}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Table>
                      <tbody>
                        {history.map((v) => (
                          <tr key={v.txHash}>
                            {/* <th className="align-self-center" scope="row">
                              {i + 1}
                            </th> */}
                            <td className="text-center" width={'10%'}>
                              <img src={v.avatar} alt="" style={{ width: 40, borderRadius: '50%' }} />
                            </td>
                            <td>
                              <span className="text-secondary">
                                {v.action + ` `}
                                <Price>{v.price}</Price>
                              </span>
                              <br />
                              <span className="text-secondary">
                                by
                                <Price>{` ` + v.name + ` `}</Price>
                                {v.date}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Row>
                </TabPane>
              </TabContent>
            </NavTab>
            <div className="action d-flex mt-5 justify-content-around">
              <Button>Buy for {item.price + item.symbol}</Button>
              <Button>Place a bid</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
