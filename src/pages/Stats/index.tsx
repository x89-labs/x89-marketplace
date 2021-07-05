import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fieldChange } from 'state/stats/actions'

import styled from 'styled-components'

const BodyExplore = styled.div`
  width: 100%;
  padding: 0 38px;
`

export default function Stats() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fieldChange);
  }, [])

  return (
    <BodyExplore>
      <a>Comming soon</a>
    </BodyExplore>
  )
}
