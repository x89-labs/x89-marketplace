import React, { useEffect, useRef } from 'react'
import * as Asset from 'assets'
import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fieldChange, getCategories } from 'state/mint/actions'
import { useExploreState } from 'state/explore/hooks'
import { useMintState } from 'state/mint/hooks'

const Around = styled.div`
  display: flex;
  color: #9c9292;
  margin: 0;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
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
  const [selected, setSelected] = useState('')

  return (
    <div style={{ alignSelf: 'center', width: '80%', justifyContent: 'space-between', margin: '0 5px' }}>
      Categories
      <Around
        onClick={() => {
          setShow(false)
        }}
      >
        <h4>{selected ? selected : ''}</h4>
        <Asset.DownArrow width={12} height={12} fill={'#9c9292'} />
      </Around>
      <DropDown hidden={show} className="dropdown">
        {state.categories?.map((item, index) => (
          <div
            className="item"
            key={index}
            onClick={() => {
              setSelected(item.categoryName)
              dispatch(fieldChange({ fieldName: 'categorie', fieldValue: item.id }))
            }}
          >
            <div className="itemName">
              <p>{item.categoryName}</p>
            </div>
            {selected === item.categoryName && <Asset.Check width={16} height={16}></Asset.Check>}
          </div>
        ))}
      </DropDown>
    </div>
  )
}
