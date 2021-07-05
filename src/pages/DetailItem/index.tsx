import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getItem } from 'state/explore/actions'
import { useExploreState } from 'state/explore/hooks'
import styled from 'styled-components'

export default function DetailItem() {
  const dispatch = useDispatch()
  const state = useExploreState()
  useEffect(() => {
    let href = window.location.href
    href = href.substring(href.lastIndexOf('/') + 1)
    console.log(href)
    dispatch(getItem(href))
  }, [])
  console.log(state.item)

  return <div>DetailItem</div>
}
