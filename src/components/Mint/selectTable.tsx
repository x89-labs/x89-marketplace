import React, { useEffect, useRef } from 'react'
import * as Asset from 'assets'
import styled from 'styled-components'
import { useState } from 'react'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { useDispatch } from 'react-redux'
import { fieldChange, searchItems } from 'state/explore/actions'
import { useMintState } from 'state/mint/hooks'
import { Button, Color, Sizing, Typography } from 'styles'
interface SelectTableProps {
  option?: any[]
  width?: any
  textColor?: string
  onClick?: () => void
}

export default function SelectTable({ option, width, textColor, onClick }: SelectTableProps) {
  const [show, setShow] = useState(true)
  const [selected, setSelected] = useState()
  const open = useModalOpen(ApplicationModal.DROPDOWN)
  const toggle = useToggleModal(ApplicationModal.DROPDOWN)
  const node = useRef<HTMLDivElement>()
  useOnClickOutside(node, open ? toggle : undefined)
  const dispatch = useDispatch()
  const state = useMintState()

  const Container = styled.div`
    padding: 10px;
    align-self: center;
    min-width: ${width};
    justify-content: space-between;
    postiton: relative;
  `
  const Around = styled.div`
    display: flex;
    color: ${Color.neutral.purple};
    margin: 0;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    h4 {
      margin: 0;
    }
  `
  const DropDown = styled.div`
    margin-top: 1rem;
    background: ${({ theme }) => theme.bg2};
    box-shadow: rgb(4 4 5 / 20%) 0px 7px 36px -8px;
    border-radius: 5px;
    min-width: 300px;
    padding: 12px;
    height: auto;
    position: absolute;
    z-index: 1;
    .item {
      display: flex;
      cursor: pointer;
      justify-content: space-between;
      align-items: center;
      width: auto;
      .itemName {
        display: flex;
        align-items: center;
        margin-right: 1rem;
      }
      p {
        ${{ ...Typography.fontSize.x30 }}
        ${{ ...Typography.fontWeight.bold }}
        margin-left: 12px;
        color: ${({ theme }) => theme.text1};
      }
    }
    .item:hover {
      background: ${({ theme }) => theme.bg6};
    }
  `
  return (
    <Container ref={node as any}>
      <Around onClick={() => setShow(false)}>
        <h4>{selected ? selected : option && option[0]?.name}</h4>

        <Asset.DownArrow width={12} height={12} />
      </Around>
      <DropDown hidden={show}>
        {option?.map((item, index) => (
          <div
            className="item"
            key={index}
            onClick={() => {
              onClick && onClick()
              setSelected(item.name)
              setShow(true)
              if (item.name === 'Seller') {
                dispatch(fieldChange({ fieldName: 'topSeller', fieldValue: item.name }))
              } else if (item.name === 'Buyer') {
                dispatch(fieldChange({ fieldName: 'topSeller', fieldValue: item.name }))
              }
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
    </Container>
  )
}
