import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Container,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
} from 'reactstrap'
import classnames from 'classnames'
import * as Asset from 'assets'
import { Item } from 'models/item'
import { Title } from 'pages/styled'
import { Color } from 'styles'
import { useIsDarkMode } from 'state/user/hooks'
import { ListHotBid } from 'state/explore/config'

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
const optionsItem = ['Sale', 'Owned', 'Created', 'Colection', 'Followers']

export default function Myitem() {
  const darkMode = useIsDarkMode()
  const [activeTab, setActiveTab] = useState(optionsItem[0])
  const toggle = (tab: any) => {
    if (activeTab !== tab) setActiveTab(tab)
  }
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
              <Card style={{ backgroundColor: 'transparent' }}>
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
  return (
    <Container>
      <NavTab>
        <Nav tabs>
          {optionsItem.map((v) => (
            <NavItem key={v}>
              <NavLink
                className={classnames({ active: activeTab === v })}
                onClick={() => {
                  toggle(v)
                }}
              >
                {v}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeTab} className="p-3 tab-content" style={{ minHeight: '40vh' }}>
          <TabPane tabId="Sale">
            <Row>{Block(ListHotBid.slice(0, 4))}</Row>
          </TabPane>
          <TabPane tabId="Owned">
            <Row>{Block(ListHotBid.slice(1, 4))}</Row>
          </TabPane>
          <TabPane tabId="Created">
            <Row>{Block(ListHotBid.slice(2, 4))}</Row>
          </TabPane>
          <TabPane tabId="Colection">
            <Row>{Block(ListHotBid.slice(3, 4))}</Row>
          </TabPane>
          <TabPane tabId="Followers">
            <Row>{Block(ListHotBid.slice(2, 3))}</Row>
          </TabPane>
        </TabContent>
      </NavTab>
    </Container>
  )
}
