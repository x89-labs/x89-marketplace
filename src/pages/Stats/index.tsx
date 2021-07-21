import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fieldChange } from 'state/explore/actions'

import styled from 'styled-components'

const BodyExplore = styled.div`
  width: 100%;
  padding: 0 38px;
`

export default function Stats() {
  const dispatch = useDispatch()
  // const x = useMintNf()
  useEffect(() => {
    dispatch(fieldChange({ fieldName: 'href', fieldValue: window.location.href }))
    // dispatch(fieldChange());
  }, [])

  return (
    <BodyExplore>
      <a>Comming soon</a>
    </BodyExplore>
  )
}
