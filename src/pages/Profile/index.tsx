import React from 'react'
import styled from 'styled-components'
import * as Asset from 'assets'
import { Container } from 'reactstrap'
import { ButtonLink } from 'pages/styled'
import { useWeb3React } from '@web3-react/core'
import { shortenAddress } from 'utils'
import Myitem from 'pages/MyItems'

const Profiles = styled.div`
  border-bottom: 1px dashed #cccccc;
  padding-bottom: 20px;
  margin-bottom: 20px;
  .cover {
    z-index: -1;
    max-height: 300px;
    width: 100%;
    object-fit: cover;
    border-radius: 0.25em;
  }
  .avatar {
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 50%;
    width: 12rem;
    height: 12rem;
    transform: translate(-50%, 25%);
    border-radius: 50%;
    object-fit: contain;
    border: 1px groove white;
    background: white;
  }
`

export default function Profile() {
  const { account } = useWeb3React()
  return (
    <Container className="my-5">
      <Profiles>
        <div style={{ position: 'relative' }}>
          <img src="https://ipfs.rarible.com/ipfs/QmaLi63zn9drDVH3Wku22kxZ1sLF5VjLnTHdy8CGC2CtNU" className="cover" />
          <img src="https://ipfs.infura.io/ipfs/QmSMMiVDoTYytR8fh327yFHAEfpAUGjwD8fdo2ahTMjfvb" className="avatar" />
          <Asset.YellowCheck style={{ position: 'absolute', left: '53%', bottom: -15, zIndex: 1 }} />
        </div>
        <div className="mt-5 text-center">
          <h5>{account ? 'Polrare Name' : ''}</h5>
          <h6 className="p-2 text-secondary m-auto my-1">{account ? shortenAddress(account) : ''}</h6>
          <ButtonLink to="profile/edit">Edit Profile</ButtonLink>
        </div>
      </Profiles>
      {/* my item */}
      <Myitem />
    </Container>
  )
}
