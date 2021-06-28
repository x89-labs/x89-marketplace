import React from 'react'
import * as Asset from 'assets'
import styled from 'styled-components'
import { useState } from 'react'

interface TableSelection {
  a?: string
  option?: any[]
  width?: any
}

const Around = styled.div`
  display: flex;
  color: #9c9292;
  margin: 0;
  cursor: pointer;
  justify-content: space-between;
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
  width: 10rem;
  padding: 6px;
  height: auto;
  position: absolute;
  .item {
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .itemName {
      display: flex;
      align-items: center;
    }
    p {
      margin-left: 5px;
      color: #000;
      font-weight: 700;
    }
  }
  .item:hover {
    background-color: #f0f0f0;
  }
`

export const TableSelection = ({ option, width }: TableSelection) => {
  const [show, setShow] = useState(true)
  const [selected, setSelected] = useState()

  return (
    <div style={{ alignSelf: 'center', width: width, justifyContent: 'space-between' }}>
      <Around onClick={() => setShow(false)}>
        <h4>{selected ? selected : ''}</h4>
        <Asset.DownArrow width={16} height={16} fill={'#9c9292'}></Asset.DownArrow>
      </Around>
      <DropDown hidden={show} className="dropdown">
        {option?.map((item, index) => (
          <div
            className="item"
            key={'item'}
            onClick={() => {
              setSelected(item.name)
              setShow(true)
            }}
          >
            <div className="itemName">
              {item.icon && item.icon}
              <p>{item.name}</p>
            </div>
            {selected === item.name && <Asset.Check width={16} height={16}></Asset.Check>}
          </div>
        ))}
      </DropDown>
    </div>
  )
}
