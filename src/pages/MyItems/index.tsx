import { useActiveWeb3React } from 'hooks/web3'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getMyItems } from 'state/mint/actions'
import { useMintState } from 'state/mint/hooks'
import styled from 'styled-components'
import ItemView from 'components/ItemView'
import * as Asset from 'assets'
import { shortenAddress } from 'utils'
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
`
const Header = styled.div`
  width: 100%;
  height: 16rem;
  background-color: #ccc;
  position: relative;
  display: flex;
  border-radius: 1rem;
  justify-content: center;
  background-size: cover;
  background-position: center center;
  background-image: url(https://ipfs.rarible.com/ipfs/QmaLi63zn9drDVH3Wku22kxZ1sLF5VjLnTHdy8CGC2CtNU);
`

const Avatar = styled.div`
  border: 1px solid #fff;
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
  padding: 10px;
  margin-top: 3rem;
  color: #000;
  background-color: #ccc;
  border-radius: 20px;
`
const Menu = styled.div`
  margin-top: 2rem;
`
const Setting = styled.div`
  display: flex;
  flex-derection: row;
  justify-content: center;
  margin-bottom: 1rem;
`
const EditProfile = styled.div`
  color: #000;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 1rem;
`

const ThreeDot = styled.div`
  cursor: pointer;
  color: #000;
  text-align: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
`

const Option = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ccc;
`

const OptionItem = styled.div`
  margin: 10px;
  cursor: pointer;
`

const Content = styled.div`
  margin-top: 2rem;
  display: flex;
`

const optionsItem = ['On sale', 'Owned', 'Created', 'Liked', 'Activity', 'Following', 'Followers', 'Hidden']

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
        <div style={{ display: 'flex' }} key={i}>
          {mt.map((item, index) => (
            <Content key={index}>
              <ItemView item={item} key={index} />
            </Content>
          ))}
        </div>
      ))
    }
  }

  const [selected, setSelected] = useState('On sale')
  return (
    <Container>
      <Header>
        <Avatar></Avatar>
        <Asset.YellowCheck style={{ position: 'absolute', width: 36, height: 36, marginLeft: 94, bottom: -28 }} />
      </Header>
      <Name>{account ? shortenAddress(account) : ''}</Name>
      <Menu>
        <Setting>
          <EditProfile>Edit Profile</EditProfile>
          <ThreeDot>...</ThreeDot>
        </Setting>
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
      </Menu>
      {GridList()}
    </Container>
  )
}
