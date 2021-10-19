import React, { useState } from 'react'
import { useIsDarkMode } from 'state/user/hooks'
import { PutOnSaleType } from 'models/item'
import { Heart, MoreHorizontal, Octagon } from 'react-feather'

import { Container, Row, Col, Button } from 'reactstrap'
import { shortenAddress } from 'utils'

export default function DetailItem() {
  const darkMode = useIsDarkMode()
  const [item] = useState({
    id: 'a8a01adc-0dd5-4ed8-b942-85f5d9636b15',
    name: 'Built-In',
    descriptions:
      'Experience the art created and animated by Artificial Intelligence! \nIntroducing a new limited edition 4K AI video paintings with increased frame rate!\nWe additionally involved 4 new neural networks in the production process, which made it possible to decompose the video into frames, increase their number, then increase the size with improved quality and then glue them back into a full-fledged video. The production has become much more complicated and interesting. All owners of previous versions of AI video can contact us on Twitter and increase their video size for an additional fee',
    price: 22,
    symbol: 'ETH',
    numberOfCopies: 1,
    contractAddress: '0x398bcBcd555326A875C6e6A52907807303E6Af15',
    urlFile: 'https://ipfs.infura.io/ipfs/QmYqFj6rjGdrCaUDWLZjMaa9HAqbRoMgUnvbhLFBCjGfmz',
    categoryId: '9c9debff-35d5-4276-ba59-d606c8ed9859',
    createdBy: '0x0C7c950F4dFb218328fFAC4ba54C6BaF51be820e',
    owner: '0x0C7c950F4dFb218328fFAC4ba54C6BaF51be820e',
    expireTime: null,
    collectionId: '',
    royalties: 1,
    putOnSaleType: PutOnSaleType.FixedPrice,
    startingDate: new Date(),
    expirationDate: new Date(),
  })
  return (
    <Container fluid>
      <Row>
        <Col lg={7} className="preview p-3  text-center">
          <img src={item.urlFile} style={{ maxHeight: '85vh' }} alt="" />
        </Col>
        <Col lg={5} className="info p-3">
          {/* head */}
          <div className="info-header border border-info py-2 px-3 rounded d-flex justify-content-between">
            <span className="h5 mb-0 align-self-center">{`# ` + item.name}</span>
            <span>
              <button className="px-1 border rounded">
                <Heart width={12} height={12} />
                <small>{` 25`}</small>
              </button>
              <MoreHorizontal className="info-more m-1 ms-2" />
            </span>
          </div>
          {/* body */}
          <div className="info-body">
            <div className="price my-2 text-secondary">
              from <span className="text-light">{item.price + item.symbol}</span>
              <Octagon className="mx-2 align-self-center" width={10} />
              {item.numberOfCopies} of {item.numberOfCopies} available
            </div>
            <div className="description">{item.descriptions}</div>
            <div className="creator my-3">
              <img src={item.urlFile} alt="" className="rounded-circle" style={{ width: 40, height: 40 }} />
              <span className="mx-3">Polrare</span>
              <span className="p-2 border rounded ms-2">{shortenAddress(item.owner)}</span>
            </div>
            <div className="action">
              <Button>Buy for {item.price + item.symbol}</Button>
              <Button>Place a bid</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
