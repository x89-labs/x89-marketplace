import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Web3ReactManager from '../components/Web3ReactManager'
import ErrorBoundary from '../components/ErrorBoundary'
import styled from 'styled-components/macro'

// import { useExploreState } from 'state/explore/hooks'

// import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
// import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Explore from './Explore'

import Create from './Create'
import { Multiple } from './Create/Multiple'
import { Single } from './Create/Single'
// import DetailItem from './DetailItem'
// import Stats from './Stats'
// import MyItem from './MyItems'
// import EditProfile from './MyItems/editProfile'

const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-flow: column;
  align-items: center;
  max-width: 1400px;
  width: 100%;
  margin: auto;
`
const BodyWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding-top: 80px;
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

export default function App() {
  // const href = useExploreState().href

  return (
    <ErrorBoundary>
      {/* <Route component={DarkModeQueryParamReader} />
      <Route component={ApeModeQueryParamReader} /> */}
      <AppWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/" component={Explore} />
              <Route exact strict path="/explore" component={Explore} />
              <Route exact strict path="/create" component={Create} />
              <Route exact strict path={`/create/erc721`} component={Single} />
              <Route exact strict path="/create/erc1155" component={Multiple} />
              {/* <Route exact strict path="/stats" component={Stats} />
              <Route exact strict path={`/detail/:itemid`} component={DetailItem} />
              <Route exact strict path={`/profile`} component={MyItem} />
              <Route exact strict path={`/edit-profile`} component={EditProfile} /> */}
            </Switch>
          </Web3ReactManager>
        </BodyWrapper>
        <Footer />
        {/* {href.includes('detail') ? <></> : <Footer />} */}
      </AppWrapper>
    </ErrorBoundary>
  )
}
