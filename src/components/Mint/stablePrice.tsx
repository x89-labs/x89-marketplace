import React, { useEffect, useRef } from 'react'
import * as Asset from 'assets'
import styled from 'styled-components'
import { useState } from 'react'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { useDispatch } from 'react-redux'
import { fieldChange } from 'state/mint/actions'
import { useMintState } from 'state/mint/hooks'
import { Typography } from 'styles'
import 'react-day-picker/lib/style.css'
interface stablePriceProps {
  option?: any[]
  width?: any
}

export default function StablePrice({ option, width }: stablePriceProps) {
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
    justify-content: space-between;
  `
  const Around = styled.div`
    display: flex;
    color: #9c9292;
    margin: 0;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
  `
  const DropDown = styled.div`
    margin-top: 1rem;
    background: ${({ theme }) => theme.bg2};
    border-radius: 8px;
    min-width: 200px;
    padding: 15px;
    position: absolute;
    right: 0;
    z-index: 1;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 5px;
      border-radius: 8px;
      span {
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
      <Around onClick={() => setShow(!show)}>
        <span>{state.symbol ? state.symbol : option && option[0]?.name}</span>
        <Asset.DownArrow className="ms-2" width={12} height={12} />
      </Around>
      <DropDown hidden={show}>
        {option?.map((item, index) => (
          <div
            className="item"
            key={index}
            onClick={() => {
              setShow(true)
              dispatch(fieldChange({ fieldName: 'symbol', fieldValue: item.name }))
            }}
          >
            <div className="itemName">
              {item.icon && item.icon}
              <span>{item.name}</span>
            </div>
            {state.symbol === item.name && <Asset.Check width={16} height={16}></Asset.Check>}
          </div>
        ))}
      </DropDown>
    </Container>
  )
}
