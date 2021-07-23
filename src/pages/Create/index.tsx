import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import * as Icon from 'react-feather'
import singger_create from '../../assets/images/nft-create/singger_create.png'
import multi_create from '../../assets/images/nft-create/multi_create.png'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { fieldChange } from 'state/explore/actions'
import { Color, Typography } from 'styles'
import { useIsDarkMode } from 'state/user/hooks'
import * as Asset from 'assets'

export default function Create({ history }: RouteComponentProps) {
  const dispatch = useDispatch()
  const darkMode = useIsDarkMode()
  useEffect(() => {
    dispatch(fieldChange({ fieldName: 'href', fieldValue: window.location.href }))
  }, [])
  const Create = styled.div`
    .create {
      border: 2px solid transparent;
      border-radius: 15px;
      display: inline-block;
      background: ${darkMode ? Color.linearGradient.black : `linear-gradient(#fff,#fff)`} padding-box,
        ${Color.linearGradient.button} border-box;
      position: relative;
      width: 250px;
      height: 270px;
      /* border: 2px solid lightgray; */
      border-radius: 16px;
      margin: 10px;
      padding: 49px 16px 33px 16px;
      background-color: white;
      cursor: pointer;
    }
    .createComponent {
      width: 214px;
      height: 220px;
      padding: auto;
    }
    .imageCreate {
      width: 85px;
      height: 135px;
      margin: auto;
      display: block;
    }
    .timedAuction {
      ${{ ...Typography.header.x10 }}
      position: absolute;
      top: -16px;
      right: 55px;
      width: 142px;
      padding: 10px 0;
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
    text-align: center;
    ${{ ...Typography.header.x70 }}
  `
  const Text = styled.p`
    ${{ ...Typography.fontSize.x30 }}
    ${{ ...Typography.fontWeight.bold }}
    color: ${({ theme }) => theme.text5};
    text-align: center;
  `

  const Around = styled.div`
    width: 580px;
    display: flex;
    align-items: center;
    flex-direction: column;
    @media only screen and (max-width: 700px) {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    h4 {
      text-align: center;
      color: ${({ theme }) => theme.text1};
    }
    h3:hover {
      cursor: pointer;
    }
  `

  const CreateMint = styled.div`
    display: flex;
    flex-direction: row;
    @media only screen and (max-width: 700px) {
      display: flex;
      flex-direction: column;
    }
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
              <Asset.Fire width={16} height={16} />
              Time Auction
            </div>
            <div className="imageCreate">{darkMode ? <Asset.SingleCreateDark /> : <Asset.SingleCreateLight />}</div>
            <h4>Single</h4>
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
          <h4>Multiple</h4>
        </div>
      </Create>
    )
  }

  return (
    <>
      <Around>
        <Title>Create collectible</Title>
        <Text>
          Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want to sell one
          collectible multiple times
        </Text>
        <CreateMint>
          <SingleComponent />
          <MultipleComponent />
        </CreateMint>
        <Text>We do not own your private keys and cannot access your funds without your confirmation</Text>
      </Around>
    </>
  )
}
