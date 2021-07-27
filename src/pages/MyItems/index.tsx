import { useActiveWeb3React } from 'hooks/web3'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getMyItems } from 'state/mint/actions'
import { useMintState } from 'state/mint/hooks'
import styled from 'styled-components'
import ItemView from 'pages/Explore/ItemView'
import * as Asset from 'assets'
import { shortenAddress } from 'utils'
import { NavLink } from 'react-router-dom'
import { Outline, Typography } from 'styles'
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 100px;
  @media only screen and (max-width: 700px) {
    padding: 0;
  }
`
const Header = styled.div`
  width: 100%;
  height: 16rem;
  position: relative;
  display: flex;
  border-radius: 1rem;
  justify-content: center;
  background-size: cover;
  background-position: center center;
  background-image: url(https://ipfs.rarible.com/ipfs/QmaLi63zn9drDVH3Wku22kxZ1sLF5VjLnTHdy8CGC2CtNU);
`

const Avatar = styled.div`
  ${{ ...Outline.border.white }}
  position: absolute;
  bottom: -30px;
  width: 8rem;
  height: 8rem;
  background-color: #ccc;
  background-size: cover;
  background-position: center center;
  background-image: url(${Asset.SrcAvatar});
  border-radius: 50%;
`
const Name = styled.div`
  ${{ ...Typography.header.x30 }};
  color: ${({ theme }) => theme.text1};
  margin-top: 3rem;
`
const activeClassName = 'ACTIVE'
const EditProfile = styled(NavLink).attrs({
  activeClassName,
})`
  ${{ ...Outline.border.gray }}
  color: ${({ theme }) => theme.text1};
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.bg3};
  margin-top: 1rem;
  text-decoration: none;
`

const Option = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
`

const OptionItem = styled.div`
  margin: 10px;
  cursor: pointer;
`

const Content = styled.div`
  margin: 1rem;
  display: flex;
`

const optionsItem = ['Sale', 'Owned', 'Created', 'Colection', 'Followers']

export default function MyItem() {
  const dispatch = useDispatch()
  const { account } = useActiveWeb3React()
  const listItems = useMintState().listMyItem
  useEffect(() => {
    account && dispatch(getMyItems(account))
  }, [])

  const GridList = () => {
    const matrix = new Array<Array<any>>()
    const list = listItems
    if (list) {
      for (let i = 0, k = -1; i < list.length; i++) {
        if (i % 4 == 0) {
          k++
          matrix[k] = []
        }
        matrix[k].push(list[i])
      }
      return matrix.map((mt, i) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }} key={i}>
          {mt.map((item, index) => (
            <ItemView item={item} key={index} />
          ))}
        </div>
      ))
    }
  }

  const [selected, setSelected] = useState('Sale')
  return (
    <Container>
      <Header>
        <Avatar></Avatar>
        <Asset.YellowCheck style={{ position: 'absolute', width: 36, height: 36, marginLeft: 94, bottom: -28 }} />
      </Header>
      <Name>{account ? shortenAddress(account) : ''}</Name>
      <EditProfile to={`/edit-profile`}>Edit Profile</EditProfile>
      <Option>
        {optionsItem.map((item, index) => (
          <OptionItem
            key={index}
            style={{
              borderBottom: selected === item ? '1px solid #000' : '',
              fontWeight: selected === item ? 'bolder' : 500,
            }}
            onClick={() => setSelected(item)}
          >
            {item}
          </OptionItem>
        ))}
      </Option>
      {GridList()}
    </Container>
  )
}
