import StableSelect from 'components/StableSelect'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { listItems } from 'state/explore/actions'
import { useExploreState } from 'state/explore/hooks'
import styled from 'styled-components'

const BodyExplore = styled.div`
  width: 100%;
  padding: 0 38px;
`
const Header = styled.div`
  display: flex;
`
const Item = styled.div`
  width: 16rem;
  height: 16rem;
  margin: 0 10px;
  position: relative;
  cursor: pointer;
  .image {
    border-radius: 10px;
    position: absolute;
    width: 100%;
    transition: transform 0.2s;
    height: 100%;
  }
  .image:hover {
    transform: scale(1.1);
  }
  .content {
    position: absolute;
    padding: 10px;
    font-weight: bolder;
    .itemName {
      color: #fff;
      margin: 0;
      font-size: 20px;
    }
    .author {
      margin: 0;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`
const TopSeller = styled.div`
  .title {
    margin-top: 20px;
    display: flex;
    font-size: 26px;
    font-weight: bold;
    .seller {
    }
    .days {
    }
  }
`
const optionsSeller = [
  {
    name: 'Seller',
    id: '1',
  },
  {
    name: 'Buyer',
    id: '2',
  },
]

const optionsDay = [
  {
    name: '1 day',
    id: '1',
  },
  {
    name: '7 days',
    id: '2',
  },
  {
    name: '30 days',
    id: '3',
  },
]

export default function Explore() {
  const dispatch = useDispatch()
  const state = useExploreState()
  useEffect(() => {
    dispatch(listItems())
  }, [])

  return (
    <BodyExplore>
      <Header>
        {state.listItem.map((item, index) => (
          <Item key={index}>
            <img src={item.image} className="image" />
            <div className="content">
              <p className="itemName">{item.name}</p>
              {item.createdBy !== '' && <p className="author">By {item.createdBy}</p>}
            </div>
          </Item>
        ))}
      </Header>
      <TopSeller>
        <div className=" title">
          Top
          <StableSelect option={optionsSeller} />
          in
          <StableSelect option={optionsDay} />
        </div>
      </TopSeller>
    </BodyExplore>
  )
}
