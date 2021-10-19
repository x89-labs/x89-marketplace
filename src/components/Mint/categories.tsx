import React from 'react'
import * as Asset from 'assets'
import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fieldChange } from 'state/mint/actions'
import { useMintState } from 'state/mint/hooks'
import { Color, Outline, Typography } from 'styles'

const cate = [
  {
    id: '4fa53b94-0be7-4e51-a5f8-9a63fcaec305',
    name: 'Art',
    descriptions: null,
    icon: null,
    isActive: 1,
    backgroundImage: null,
    createdDate: '2021-08-25T03:36:58.585Z',
    modifiedDate: '2021-08-25T03:36:58.585Z',
  },
  {
    id: 'd80412ed-5b10-4481-9a9a-ed789d5677ed',
    name: 'Game',
    descriptions: null,
    icon: null,
    isActive: 1,
    backgroundImage: null,
    createdDate: '2021-08-25T03:36:58.585Z',
    modifiedDate: '2021-08-25T03:36:58.585Z',
  },
  {
    id: 'e110febe-a573-43d1-9f6b-183e7f87d03d',
    name: 'Music',
    descriptions: null,
    icon: null,
    isActive: 1,
    backgroundImage: null,
    createdDate: '2021-08-25T03:36:58.585Z',
    modifiedDate: '2021-08-25T03:36:58.585Z',
  },
  {
    id: 'eaf705a7-dc2f-4562-93e6-7a69be5a39fc',
    name: 'Photography',
    descriptions: null,
    icon: null,
    isActive: 1,
    backgroundImage: null,
    createdDate: '2021-08-25T03:36:58.585Z',
    modifiedDate: '2021-08-25T03:36:58.585Z',
  },
]
const Container = styled.div`
  width: 50%;
  margin-top: 15px;
`
const Title = styled.p`
  ${{ ...Typography.fontSize.x30 }}
  ${{ ...Typography.fontWeight.bold }}
  color: ${({ theme }) => theme.text1};
  margin-bottom: 10px;
`
const Around = styled.div`
  background: ${({ theme }) => theme.bg1};
  height: 48px;
  flex-direction: row;

  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px;
  color: ${Color.neutral.gray};
  border-radius: ${Outline.borderRadius.base}px;
  align-items: center;
  border: 1px solid ${Color.neutral.gray};
`
const DropDown = styled.div`
  background: ${({ theme }) => theme.bg2};
  border-radius: 8px;
  width: 250px;
  padding: 12px;
  height: auto;
  z-index: 1;
  .item {
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-radius: 8px;
    .itemName {
      display: flex;
      align-items: center;
      margin-right: 1rem;
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
          setShow(!show)
        }}
      >
        <span>{state.categorie?.name ? state.categorie?.name : cate && cate[0].name}</span>
        <Asset.DownArrow width={12} height={12} fill={'#9c9292'} />
      </Around>
      <DropDown hidden={show} className="dropdown mt-3">
        {cate?.map((item, index) => (
          <div
            className="item"
            key={index}
            onClick={() => {
              setShow(!show)
              dispatch(fieldChange({ fieldName: 'categorie', fieldValue: item }))
            }}
          >
            <div className="itemName">
              <span>{item.name}</span>
            </div>
            {state.categorie?.id === item.id && <Asset.Check width={16} height={16} />}
          </div>
        ))}
      </DropDown>
    </Container>
  )
}
