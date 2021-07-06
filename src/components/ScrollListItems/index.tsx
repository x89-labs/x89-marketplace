import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import './index.scss'

type UIProps = {
  listItems?: any[]
  renderList: Function
  onBottom?: boolean
  height?: number | string
  minHeight?: number | string
  maxHeight?: number | string
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  amount: number
}

const ScrollListItems = (props: UIProps) => {
  const [hasMore, setHasMore] = useState(true)
  const NextRecord = () => {
    if (props.amount === 0 || (props.listItems && props.listItems?.length >= props.amount)) {
      setHasMore(false)
    } else {
    }
  }
  const Loader = () => {
    if (!props.listItems) {
      return <p>wait a minute</p>
    } else if (props.listItems.length === 0) {
      return (
        <p className={`${props.onBottom && 'sub'}`} style={{ textAlign: 'center' }}>
          No Record
        </p>
      )
    }
  }
  return (
    <div className={`${props.onBottom && 'page'}`}>
      <InfiniteScroll
        dataLength={props.listItems?.length ?? 0}
        next={NextRecord}
        hasMore={hasMore}
        style={{
          width: props.width,
          minWidth: props.minWidth,
          maxWidth: props.maxWidth,
          height: props.height ?? 'calc(100vh - 240px)',
          minHeight: props.minHeight,
          maxHeight: props.maxHeight,
          overflowX: 'hidden',
          overflowY: 'scroll',
        }}
        loader={Loader}
      >
        <div className={`${props.onBottom && 'sub'}`}>{props.renderList()}</div>
      </InfiniteScroll>
    </div>
  )
}

export default ScrollListItems
