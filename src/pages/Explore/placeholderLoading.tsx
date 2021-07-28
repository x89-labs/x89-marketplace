import React, { useEffect } from 'react'
import { optionsTopSeller } from 'state/explore/config'
import styled from 'styled-components'
import { Color, Outline, Sizing } from 'styles'

const Container = styled.div`
  .loading {
    position: relative;
    background: #b8b8b8;
    overflow: hidden;
  }
  .loading::after {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background-image: linear-gradient(to left, transparent, #f0f0f0, transparent);
    animation: loading 1s infinite;
  }
  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
  .title {
    margin: 1rem 0;
    width: 180px;
    height: 40px;
  }
  .text {
    width: 180px;
    height: 30px;
    margin-top: 1rem;
    border-radius: ${Outline.borderRadius.small}px;
  }
  .name {
    margin: 4px 0;
    width: 100px;
    height: 20px;
  }
  .avatar {
    margin-right: 10px;
    width: 24px;
    height: 24px;
  }
  @media only screen and (max-width: 700px) {
    width: 100%;
    margin-top: 1rem;
  }
`

const Item = styled.div`
  position: relative;
  border-radius: ${Outline.borderRadius.base}px;
  min-width: ${Sizing.x255}px;
  ${{ ...Outline.border.gray }}
  box-shadow: 0 0 0 1px #ccc;
  margin: 0 10px;
`

const Image = styled.div`
  width: ${Sizing.screen.width};
  height: ${Sizing.x255}px;
  border-radius: ${Outline.borderRadius.base}px;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`
const TopSellerItem = styled.div`
  width: 255px;
  height: 60px;
  margin: 1rem 0;
  border-radius: ${Outline.borderRadius.base}px;
`
const Owner = styled.div`
  padding: 8px 0px;
  display: flex;
  border-bottom: 1px solid #353945;
`
const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export default function PlaceholderLoading() {
  const GridList = () => {
    const matrix = new Array<Array<any>>()
    for (let i = 0, k = -1; i < 12; i++) {
      if (i % 4 == 0) {
        k++
        matrix[k] = []
      }
      matrix[k].push(i)
    }
    return matrix.map((mt, i) => (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} key={i}>
        {mt.map((item, index) => (
          <TopSellerItem className="loading" key={index} />
        ))}
      </div>
    ))
  }

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {[...Array(4)].map((index) => (
          <Item key={index}>
            <Image className="loading" />
            <Content>
              <div className="loading text" />
              <div className="loading text" />
            </Content>
          </Item>
        ))}
      </div>

      <div className="loading title" />
      {GridList()}
      <div className="loading title" />
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {[...Array(4)].map((index) => (
          <Item key={index}>
            <Image className="loading" />
            <div style={{ padding: 5 }}>
              <div className="loading name" />
              <Owner>
                <div className="loading avatar" />
                <div className="loading name" />
              </Owner>
              <InfoItem>
                <div className="loading name" />
                <div className="loading name" />
              </InfoItem>
              <InfoItem>
                <div className="loading name" />
                <div className="loading name" />
              </InfoItem>
            </div>
          </Item>
        ))}
      </div>
    </Container>
  )
}
