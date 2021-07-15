import React, { useEffect, useRef } from 'react'
import * as Asset from 'assets'
import styled from 'styled-components'
import { useState } from 'react'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { textColor } from 'styled-system'
import { useDispatch } from 'react-redux'
import { fieldChange } from 'state/mint/actions'
import { useMintState } from 'state/mint/hooks'
interface TableSelection {
  a?: string
  option?: any[]
  width?: any
  textColor?: string
  id?: string
}

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
  min-width: 8rem;
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

export default function StableSelect({ option, width, textColor, id }: TableSelection) {
  const [show, setShow] = useState(true)
  const [selected, setSelected] = useState()
  const open = useModalOpen(ApplicationModal.DROPDOWN)
  const toggle = useToggleModal(ApplicationModal.DROPDOWN)
  const node = useRef<HTMLDivElement>()
  useOnClickOutside(node, open ? toggle : undefined)
  const dispatch = useDispatch()
  const state = useMintState()

  return (
    <div
      style={{ alignSelf: 'center', width: width, justifyContent: 'space-between', margin: '0 5px' }}
      ref={node as any}
    >
      <Around
        onClick={() => {
          setShow(false)
        }}
      >
        <h4 style={{ color: textColor ? textColor : '' }}>{selected ? selected : option && option[0]?.name}</h4>
        <Asset.DownArrow width={12} height={12} fill={textColor ?? '#9c9292'} />
      </Around>
      <DropDown hidden={show} className="dropdown">
        {option?.map((item, index) => (
          <div
            className="item"
            key={index}
            onClick={() => {
              setSelected(item.name)
              setShow(true)
              id && dispatch(fieldChange({ fieldName: id, fieldValue: item.name }))
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
