import React, { useEffect, useRef } from 'react'
import * as Asset from 'assets'
import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fieldChange } from 'state/mint/actions'
import { useMintState } from 'state/mint/hooks'
import { theme } from 'theme'

const Container = styled.div`
  margin-top: 1.2rem;
  align-self: center;
  justify-content: center;
  width: 50%;
`
const Title = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text1};
`
const Around = styled.div`
  display: flex;
  color: #9c9292;
  margin: 0;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  &:hover {
    color: #000;
  }
  h4 {
    margin: 2px;
  }
`
const DropDown = styled.div`
  margin-top: 0.6rem;
  background-color: #fff;
  box-shadow: rgb(4 4 5 / 20%) 0px 7px 36px -8px;
  border-radius: 5px;
  width: auto;
  padding: 12px;
  height: auto;
  position: absolute;
  .item {
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    width: auto;
    .itemName {
      display: flex;
      align-items: center;
    }
    p {
      margin-left: 12px;
      font-size: 16px;
      color: #000;
      font-weight: 700;
    }
  }
  .item:hover {
    background-color: #f0f0f0;
  }
`

export default function Categories() {
  const state = useMintState()
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)
  const [selected, setSelected] = useState<string>()

  return (
    <Container>
      <Title>Categories</Title>
      <Around
        onClick={() => {
          setShow(false)
        }}
      >
        <h4>{state.categorieId ? state.categorieId : ''}</h4>
        <Asset.DownArrow width={12} height={12} fill={'#9c9292'} />
      </Around>
      <DropDown hidden={show} className="dropdown">
        {state.categories?.map((item, index) => (
          <div
            className="item"
            key={index}
            onClick={() => {
              setSelected(item.categoryName)
              setShow(true)
              dispatch(fieldChange({ fieldName: 'categorieId', fieldValue: item.id }))
            }}
          >
            <div className="itemName">
              <p>{item.categoryName}</p>
            </div>
            {selected === item.categoryName && <Asset.Check width={16} height={16}></Asset.Check>}
          </div>
        ))}
      </DropDown>
    </Container>
  )
}
