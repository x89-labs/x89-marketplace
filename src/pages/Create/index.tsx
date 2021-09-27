import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

import styled from 'styled-components'
// import { useDispatch } from 'react-redux'
// import { fieldChange } from 'state/explore/actions'
import { Color, Typography } from 'styles'
import { useIsDarkMode } from 'state/user/hooks'
import * as Asset from 'assets'

export default function Create({ history }: RouteComponentProps) {
  const darkMode = useIsDarkMode()

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fieldChange({ fieldName: 'href', fieldValue: window.location.href }))
  // }, [])

  const Create = styled.div`
    .create {
      border: 2px solid transparent;
      border-radius: 15px;
      background: ${darkMode ? Color.linearGradient.black : `linear-gradient(#fff,#fff)`} padding-box,
        ${Color.linearGradient.button} border-box;
      position: relative;
      border-radius: 16px;
      margin: 15px;
      padding: 70px;
      cursor: pointer;
    }
    .timedAuction {
      ${{ ...Typography.header.x10 }}
      position: absolute;
      top: -17px;
      right: 45px;
      width: 140px;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${({ theme }) => theme.bg3};
      color: ${({ theme }) => theme.text1};
      border-radius: 8px;
      border: 1px solid #939393;
    }
  `
  const Title = styled.p`
    ${{ ...Typography.header.x70 }}
  `
  const Text = styled.p`
    ${{ ...Typography.fontSize.x30 }}
    ${{ ...Typography.fontWeight.bold }}
    color: ${({ theme }) => theme.text5};
    margin-top: 20px;
  `

  const Single = () => {
    return history.push('/create/erc721')
  }

  const Multiple = () => {
    return history.push('/create/erc1155')
  }

  const SingleComponent = () => {
    return (
      <Create>
        <div className="create" onClick={Single}>
          <div className="createComponent">
            <div className="timedAuction">
              <Asset.Fire width={16} height={16} className="me-2" /> Time Auction
            </div>
            <div className="imageCreate">{darkMode ? <Asset.SingleCreateDark /> : <Asset.SingleCreateLight />}</div>
            <h4 className="mt-3">Single</h4>
          </div>
        </div>
      </Create>
    )
  }

  const MultipleComponent = () => {
    return (
      <Create>
        <div className="create" onClick={Multiple}>
          <div className="imageCreate">{darkMode ? <Asset.MultiCreateDark /> : <Asset.MultiCreateLight />}</div>
          <h4 className="mt-3">Multiple</h4>
        </div>
      </Create>
    )
  }

  return (
    <>
      <Container style={{ maxWidth: '800px', justifyContent: 'center', textAlign: 'center', marginTop: '3vh' }}>
        <Title>Create collectible</Title>
        <Text>
          Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want to sell one
          collectible multiple times
        </Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '30px auto' }}>
          <SingleComponent />
          <MultipleComponent />
        </div>
        <Text>We do not own your private keys and cannot access your funds without your confirmation</Text>
      </Container>
    </>
  )
}
