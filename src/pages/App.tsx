import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Web3ReactManager from '../components/Web3ReactManager'
import ErrorBoundary from '../components/ErrorBoundary'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'
import Create from './Create'
import { Multiple } from './Create/Multiple'
import { Single } from './Create/Single'
import Explore from './Explore'
const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-flow: column;
  align-items: flex-start;
`
const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 120px;
  align-items: center;
  flex: 1;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 6rem;
  `};
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  return (
    <ErrorBoundary>
      <Route component={DarkModeQueryParamReader} />
      <Route component={ApeModeQueryParamReader} />
      <AppWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/explore" component={Explore} />
              <Route exact strict path="/create" component={Create} />
              <Route exact strict path={`/create/erc721`} component={Single} />
              <Route exact strict path="/create/erc1155" component={Multiple} />
            </Switch>
          </Web3ReactManager>
          <Marginer />
        </BodyWrapper>
        <Footer />
      </AppWrapper>
    </ErrorBoundary>
  )
}
