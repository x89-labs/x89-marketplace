import React, { useEffect } from 'react'
import * as Asset from 'assets'
import * as Icon from 'react-feather'
import { useDispatch } from 'react-redux'
import useFilePicker from 'hooks/useFilePicker'
import { EditForm } from 'state/mint/config'
import { fileChange } from 'state/mint/actions'
import { Col, Container, Row, Input } from 'reactstrap'
import { Button } from 'pages/styled'
import { RouteComponentProps } from 'react-router-dom'

export default function EditProfile({ history }: RouteComponentProps) {
  const dispatch = useDispatch()
  const [openFileSelector, { plainFiles }] = useFilePicker({
    multiple: false,
    accept: ['.png', '.jpg', '.gif', '.svg'],
    readAs: 'DataURL',
  })
  useEffect(() => {
    plainFiles[0] && dispatch(fileChange({ value: plainFiles[0] }))
  }, [plainFiles, dispatch])

  return (
    <Container className="my-5 w-50">
      <Row>
        <span onClick={() => history.goBack()}>
          <div
            style={{
              position: 'relative',
              left: '0',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <div>
              <Icon.ArrowLeft />
            </div>
            <div>Manage collectible type</div>
          </div>
        </span>
      </Row>
      <Row>
        <Col>
          <div className="text-center">
            <h1>Edit Profile</h1>
            <p>
              You can set preferred display name, create your branded profile URL and manage other personal settings
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <div>
            <div>
              {EditForm.map((item, index) => (
                <div key={index} className="mb-3">
                  <h5>{item.title}</h5>
                  <Input id={item.id} placeholder={item.placeholder} />
                  <small className="text-secondary">{item.description}</small>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col xs={4}>
          <div className="text-center">
            <h5 className="text-center">Avatar</h5>
            {plainFiles[0] ? (
              <img
                className="d-block my-3"
                style={{ height: 220, width: 220, margin: 'auto', objectFit: 'cover', borderRadius: '50%' }}
                src={URL.createObjectURL(plainFiles[0])}
                onClick={() => openFileSelector()}
              />
            ) : (
              <div
                style={{ border: '1px dashed grey', borderRadius: 15, padding: 30 }}
                onClick={() => openFileSelector()}
              >
                <Asset.Plus
                  width={80}
                  height={80}
                  style={{ borderRadius: '50%', border: '1px groove #cccc', padding: 10 }}
                />
              </div>
            )}
            <small className="text-secondary">We recommend an image of at least 200x200. Gifs work too.</small>
          </div>
        </Col>
      </Row>
      <Row>
        <Button className="w-25 m-auto text-center" to="">
          Update profile
        </Button>
      </Row>
    </Container>
  )
}
