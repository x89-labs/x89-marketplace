import * as Icon from 'react-feather'
import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

interface DropDownProps {
  a?: string
  option?: any[]
}

const Around = styled.div`
  .Around {
    width: 200px;
    height: 50px;
  }
`
const DropDown = styled.div`
  .dropdown {
    width: 5rem;
    height: 10rem;
    background-color: #ccc;
    position: absolute;
  }
`

export const DropDownUI = ({}: DropDownProps) => {
  const [show, setShow] = useState(true)
  return (
    <div>
      <h3>abc</h3>
      <Icon.ArrowDown onClick={() => setShow(false)} />
      <DropDown hidden={show}>
        <div className="dropdown">aaa</div>
      </DropDown>
    </div>
  )
}
