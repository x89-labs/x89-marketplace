import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import boxred from 'assets/images/boxes/boxesred.png'
// import boxesgreen from 'assets/images/boxes/boxesgreen.png'
// import boxes from 'assets/images/boxes/boxes.png'
import { Button, Title, SubTitle } from 'pages/styled'
export default function Box() {
  return (
    <Container fluid className="my-5">
      <Row>
        <Col>
          <Title className="text-center">Polrare boxes</Title>
          <SubTitle className="text-center">
            Polrare box contains various items with certain drop rates. The higher quality of the Polrare box is, the
            higher the drop rate for the high-quality items is.
          </SubTitle>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <img style={{ width: '100%', display: 'block', margin: 'auto' }} src={boxred} alt="" />
          <div className="mt-5">
            <Button>1000 PSB</Button>
          </div>
          {/* <img style={{ width: '100%', display: 'block', margin: 'auto' }} src={boxesgreen} alt="" />
          <Button to="">1000 PSB</Button>
          <img style={{ width: '100%', display: 'block', margin: 'auto' }} src={boxes} alt="" />
          <Button to="">1000 PSB</Button> */}
        </Col>
      </Row>
    </Container>
  )
}
