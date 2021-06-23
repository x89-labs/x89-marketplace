import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import * as Icon from 'react-feather'
import singger_create from '../../assets/images/nft-create/singger_create.png'
import singger_create_timed_auctions from '../../assets/images/nft-create/singger_create_timed_auctions.png'
import multi_create from '../../assets/images/nft-create/multi_create.png'
import styled from 'styled-components'

interface ico {
  icon: any
  name: string
}

const icons: ico = {
  icon: <Icon.ArrowLeft />,
  name: 'Go Back',
}

const FeatherIcon = (icon: ico) => {
  return (
    <div style={{ position: 'relative', left: '0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <div>{icon.icon}</div>
      <div>{icon.name}</div>
    </div>
  )
}

export default function Create({ history }: RouteComponentProps) {
  const Create = styled.div`
    .create {
      position: relative;
      width: 250px;
      height: 270px;
      border: 1px solid lightgray;
      border-radius: 16px;
      margin: 10px;
      padding: 49px 16px 33px 16px;
      background-color: white;
      cursor: pointer;
    }

    @media (min-width: 550px and max-width: 700px) {
      .create {
        position: relative;
        width: 230px;
        height: 220px;
        border: 1px solid lightgray;
        border-radius: 16px;
        margin: 8px;
        padding: 49px 16px 33px 16px;
        background-color: white;
        cursor: pointer;
      }
    }

    @media (max-width: 550px) {
      .create {
        position: relative;
        width: 190px;
        height: 220px;
        border: 1px solid lightgray;
        border-radius: 16px;
        margin: 8px;
        padding: 49px 16px 33px 16px;
        background-color: white;
        cursor: pointer;
      }
    }

    .createComponent {
      width: 214px;
      height: 220px;
      padding: auto;
    }

    @media (max-width: 550px) {
      .createComponent {
        width: 170px;
        height: 220px;
        padding: auto;
      }
    }

    .create:hover {
      border: 1px solid gray;
      border-radius: 16px;
    }

    .imageCreate {
      width: 85px;
      height: 135px;
      margin: auto;
      display: block;
    }

    .timedAuction {
      position: absolute;
      top: -16px;
      right: -16px;
      width: 140px;
      height: 30px;
    }
  `

  const Around = styled.div`
    p {
      margin: 44px 0;
      color: ${({ theme }) => theme.text5};
      fontweight: 500;
    }
    h4 {
      text-align: center;
      color: #000000;
    }
    h3:hover {
      cursor: pointer;
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
            <img className="timedAuction" src={singger_create_timed_auctions} alt="Time_auction" />
            <img className="imageCreate" src={singger_create} alt="Singger_Create" />
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
          <img className="imageCreate" src={multi_create} alt="Multi_Create" />
          <h4>Multiple</h4>
        </div>
      </Create>
    )
  }

  return (
    <>
      <Around style={{ width: '516px' }}>
        <h3 onClick={() => history.goBack()}>{FeatherIcon(icons)}</h3>
        <h1>Create collectible</h1>
        <p>
          Choose “Single” if you want your collectible to be one of a kind or “Multiple” if you want to sell one
          collectible multiple times
        </p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <SingleComponent />
          <MultipleComponent />
        </div>
        <p>We do not own your private keys and cannot access your funds without your confirmation</p>
      </Around>
    </>
  )
}
