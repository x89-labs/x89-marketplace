import React, { useEffect } from 'react'
import * as Asset from 'assets'
import * as Icon from 'react-feather'
import { useDispatch } from 'react-redux'
import useFilePicker from 'hooks/useFilePicker'
import { EditForm } from 'state/mint/config'
import { fileChange } from 'state/mint/actions'
import { Col, Container, Row } from 'reactstrap'
import { Around, Button, ErrorMessage, LabelInput, SubTitle, TextDescription, TextInput, Title } from 'pages/styled'
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
          </div>
        </span>
      </Row>
      <Row>
        <Col>
          <div className="text-center">
            <Title>Edit Profile</Title>
            <SubTitle>
              You can set preferred display name, create your branded profile URL and manage other personal settings
            </SubTitle>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          {EditForm.map((f) => (
            <TextInput key={f.id}>
              <LabelInput style={{ margin: 0 }}>{f.title}</LabelInput>
              <div className="text-input ">
                <input
                  id={f.id}
                  type={'input'}
                  placeholder={f.placeHolder}
                  // onBlur={(e) => formik.setFieldValue(f.id, e.target.value)}
                  // defaultValue={getIn(formik.values, f.id)}
                />
              </div>
              <ErrorMessage></ErrorMessage>
              <TextDescription>{f.panel}</TextDescription>
            </TextInput>
          ))}
        </Col>
        <Col xs={4} className="text-center">
          <LabelInput style={{ marginTop: 15, marginBottom: 0 }}>Avatar</LabelInput>
          {plainFiles[0] ? (
            <img
              className="d-block my-3"
              style={{ height: 220, width: 220, margin: 'auto', objectFit: 'cover', borderRadius: '50%' }}
              src={URL.createObjectURL(plainFiles[0])}
              onClick={() => openFileSelector()}
            />
          ) : (
            <Around>
              <Asset.Plus
                width={72}
                height={72}
                onClick={() => openFileSelector()}
                style={{ borderRadius: '50%', border: '1px groove #cccc', padding: 10, cursor: 'pointer' }}
              />
            </Around>
          )}
          <TextDescription>We recommend an image of at least 200x200. Gifs work too.</TextDescription>
        </Col>
      </Row>
      <Row>
        <Button className="w-25 m-auto mt-5 text-center">Update profile</Button>
      </Row>
    </Container>
  )
}
