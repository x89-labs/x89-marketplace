import React, { useEffect, useRef } from 'react'
import * as Asset from 'assets'
import styled from 'styled-components'
import { useState } from 'react'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { useDispatch } from 'react-redux'
import { useMintState } from 'state/mint/hooks'
import { Button, Outline, Sizing, Typography } from 'styles'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { flex } from 'styled-system'
interface SelectTableDateProps {
  option?: any[]
  width?: any
}

export default function SelectTableDate({ option, width }: SelectTableDateProps) {
  const [show, setShow] = useState(true)
  const [datePicker, setDatePicker] = useState(true)
  const [selected, setSelected] = useState()
  const [timeSelect, setTimeSelect] = useState(true)
  const [hour, setHour] = useState<number>()
  const [minute, setMinute] = useState<number>()
  const [noon, setNoon] = useState('')
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
    .timeSelect {
      display: flex;
      justify-content: space-between;
    }
  `

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
      margin: 0 5px;
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

  const TimeSelect = styled.div`
    height: 300px;
    width: 132px;
    padding: 5px;
    background: ${({ theme }) => theme.bg2};
    box-shadow: 0px 4px 26px rgba(53, 223, 177, 0.16);
    border-radius: 8px;
    position: absolute;
    top: -37px;
    right: -65px;
    display: flex;
    .columnTime {
      overflow: scroll;
      width: 33%;
      ::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
  `

  const ItemTime = styled.div`
    width: 36px;
    height: 36px;
    display: flex;
    border-radius: ${Outline.borderRadius.base}px;
    cursor: pointer;
    margin-top: 2px;
    justify-content: center;
    align-items: center;
    &:hover {
      background: #aef2e0;
    }
  `

  const FormTime = [{ name: 'AM' }, { name: 'PM' }]
  return (
    <Container ref={node as any}>
      <Around onClick={() => setShow(!show)}>
        <div style={{ display: 'flex' }}>
          <h4>{day ? day.toLocaleDateString() : selected ? selected : option && option[0]?.name}</h4>
          <h4>{hour && hour > 0 ? `${hour}:${minute}  ${noon}` : ''}</h4>
        </div>
        <Asset.DownArrow width={12} height={12} />
      </Around>
      <DropDown hidden={show}>
        {option?.map((item, index) => (
          <div
            className="item"
            key={index}
            onClick={() => {
              if (item.name === 'Pick spicific date') {
                setDatePicker(false)
                setSelected(undefined)
              } else {
                setSelected(item.name)
                setDay(undefined)
                setHour(-1)
              }
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
      <DatePicker hidden={datePicker}>
        <DayPicker
          className="dayPicker"
          onDayClick={(day: Date) => {
            setDay(day)
            setTimeSelect(false)
          }}
          selectedDays={day ? day : undefined}
        />
        <div className="timeSelect">
          <p>Select Time</p>
          <p>
            {hour} : {minute} {noon}
          </p>
        </div>
        <BtnApply
          onClick={() => {
            setTimeSelect(true)
            setDatePicker(true)
          }}
        >
          Apply
        </BtnApply>
        <div hidden={timeSelect}>
          <TimeSelect>
            <div className="columnTime">
              {[...Array(12)].map((item, i) => (
                <ItemTime
                  key={i}
                  onClick={() => setHour(i)}
                  style={{ background: hour === i ? '#0085FF' : '', color: hour === i ? '#fff' : '' }}
                >
                  {i}
                </ItemTime>
              ))}
            </div>
            <div className="columnTime">
              {[...Array(60)].map(
                (item, i) =>
                  i > 0 && (
                    <ItemTime
                      key={i}
                      onClick={() => setMinute(i)}
                      style={{ background: minute === i ? '#0085FF' : '', color: minute === i ? '#fff' : '' }}
                    >
                      {i}
                    </ItemTime>
                  )
              )}
            </div>
            <div className="columnTime">
              {FormTime.map((item, i) => (
                <ItemTime
                  key={i}
                  onClick={() => setNoon(item.name)}
                  style={{ background: noon === item.name ? '#0085FF' : '', color: noon === item.name ? '#fff' : '' }}
                >
                  {item.name}
                </ItemTime>
              ))}
            </div>
          </TimeSelect>
        </div>
      </DatePicker>
    </Container>
  )
}
