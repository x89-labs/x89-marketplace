import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import a from 'assets/images/boxes.png'
import { Button } from 'pages/styled'
export default function Box() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <img style={{ width: 800, display: 'block', margin: 'auto' }} src={a} alt="" />
          <Button to="">1000 PSB</Button>
        </Col>
      </Row>
    </Container>
  )
}
