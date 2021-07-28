import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Color, Outline, Sizing } from 'styles'

const Container = styled.div``
const Item = styled.div`
  position: relative;
  border-radius: ${Outline.borderRadius.base}px;
  min-width: ${Sizing.x255}px;
  height: ${Sizing.x320}px;
  ${{ ...Outline.border.gray }}
  margin: 0 10px;
`

const Image = styled.div`
  width: ${Sizing.screen.width};
  height: ${Sizing.x255}px;
  border-radius: ${Outline.borderRadius.base}px;
  background: #ccc;
  overflow: hidden;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  text-align: center;
`
export default function PlaceholderLoading() {
  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {[...Array(4)].map((index) => (
          <Item key={index}>
            <Image>aaa</Image>
          </Item>
        ))}
      </div>
    </Container>
  )
}
