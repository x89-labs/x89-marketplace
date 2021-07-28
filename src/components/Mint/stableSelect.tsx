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
import { Button, Sizing, Typography } from 'styles'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
interface TableSelection {
  a?: string
  option?: any[]
  width?: any
  textColor?: string
  id?: string
}

export default function StableSelect({ option, width, textColor, id }: TableSelection) {
  const [show, setShow] = useState(true)
  const [datePicker, setDatePicker] = useState(true)
  const [selected, setSelected] = useState()
  const [day, setDay] = useState<Date>()
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
  const DatePicker = styled.div`
    padding: 10px;
    width: 260px;
    background: ${({ theme }) => theme.bg2};
    justify-content: center;
    position: absolute;
    z-index: 12;
    margin-left: 20rem;
    @media only screen and (max-width: 700px) {
      margin-left: 0;
    }
    .dayPicker {
      width: 230px;
    }
  `

  const Time = styled.div``
  const BtnApply = styled.div`
    ${{ ...Button.btn.primary }};
    width: ${Sizing.x240}px;
    text-align: center;
  `
  const Around = styled.div`
    display: flex;
    color: #9c9292;
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
    right: 0;
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
        <h4>{day ? day.toLocaleDateString() : selected ? selected : option && option[0]?.name}</h4>

        <Asset.DownArrow width={12} height={12} />
      </Around>
      <DropDown hidden={show}>
        {option?.map((item, index) => (
          <div
            className="item"
            key={index}
            onClick={() => {
              setSelected(item.name)
              setShow(true)
              if (item.name === 'Pick spicific date') {
                setDatePicker(false)
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
      <DatePicker hidden={datePicker}>
        <DayPicker
          className="dayPicker"
          onDayClick={(day: Date) => {
            setDay(day)
          }}
          selectedDays={day ? day : undefined}
        />
        Select Time
        <BtnApply onClick={() => setDatePicker(true)}>Apply</BtnApply>
      </DatePicker>
    </Container>
  )
}
