import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { getItems } from 'state/explore/actions'
import { useExploreState } from 'state/explore/hooks'
import { getExploreItem } from 'state/explore/reducer'

export default function Explore({ history }: RouteComponentProps) {
  const dispatch = useDispatch()
  const state = useExploreState()
  useEffect(() => {
    // dispatch(getExploreItem())
  }, [])

  return (
    <>
      <img
        src={
          'https://lh3.googleusercontent.com/NZUDGo8urD9r0MfIGHduqqaN27eRTA6XTnlbi1LnLKoRa4_UmSZ42NM0M_3CYX0yOOePaVLQ1dNQIT_Vx23xg6AmvuwxaLkvPxbc'
        }
      />
    </>
  )
}
