import React, { useEffect, useRef } from 'react'
import * as Asset from 'assets'
import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fieldChange } from 'state/mint/actions'
import { useMintState } from 'state/mint/hooks'
import { theme } from 'theme'
import { Color, Outline, Typography } from 'styles'

const Container = styled.div`
  margin-top: 1.2rem;
  align-self: center;
  justify-content: center;
  width: 200px;
`
const Title = styled.p`
  ${{ ...Typography.fontSize.x30 }}
  ${{ ...Typography.fontWeight.bold }}
  color: ${({ theme }) => theme.text1};
`
const Around = styled.div`
  display: flex;
  color: ${Color.neutral.gray};
  padding: 10px;
  border-radius: ${Outline.borderRadius.base}px;
  margin: 0;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${Color.neutral.gray};
  h4 {
    margin: 2px;
  }
`
const DropDown = styled.div`
  margin-top: 0.6rem;
  background: ${({ theme }) => theme.bg2};
  border-radius: 5px;
  width: 200px;
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

export default function Categories() {
  const state = useMintState()
  const dispatch = useDispatch()
  const [show, setShow] = useState(true)

  return (
    <Container>
      <Title>Categories</Title>
      <Around
        onClick={() => {
          setShow(false)
        }}
      >
        <h4>
          {state.categorie?.categoryName
            ? state.categorie?.categoryName
            : state.categories && state.categories[0].categoryName}
        </h4>
        <Asset.DownArrow width={12} height={12} fill={'#9c9292'} />
      </Around>
      <DropDown hidden={show} className="dropdown">
        {state.categories?.map((item, index) => (
          <div
            className="item"
            key={index}
            onClick={() => {
              setShow(true)
              dispatch(fieldChange({ fieldName: 'categorie', fieldValue: item }))
            }}
          >
            <div className="itemName">
              <p>{item.categoryName}</p>
            </div>
            {state.categorie?.id === item.id && <Asset.Check width={16} height={16} />}
          </div>
        ))}
      </DropDown>
    </Container>
  )
}
