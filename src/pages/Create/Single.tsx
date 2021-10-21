import * as Asset from '../../assets'
import * as Icon from 'react-feather'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ReactPlayer from 'react-player'
import { RouteComponentProps } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { getIn, useFormik } from 'formik'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { Container, Row, Col, FormGroup, Label } from 'reactstrap'
import Logo from '../../assets/images/favicon.png'

import { Ipfs } from 'hooks/ipfs'
import useFilePicker from 'hooks/useFilePicker'

import { useIsDarkMode } from 'state/user/hooks'
import { useMintState } from 'state/mint/hooks'
import { fieldChange, fileChange, resetForm, deleteFile } from 'state/mint/actions'
import { Forms, validationFormCreateSchema } from 'state/mint/config'

import { Type } from 'models/formInput'
import Modal from 'components/Modal'
import Categories from 'components/Mint/categories'
import StablePrice from 'components/Mint/stablePrice'
import SelectTableDate from 'components/Mint/selectTableDate'

import { Outline, Typography } from 'styles'
import styled from 'styled-components'
import { Around, Button, ErrorMessage, FlexAround, LabelInput, TextDescription, TextInput } from 'pages/styled'

// style component
const Preview = styled.div`
  position: sticky;
  top: 10vh;
  @media only screen and (max-width: 700px) {
    display: none;
  }
  .content {
    position: absolute;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.text5};
    background: ${({ theme }) => theme.bg6};
    height: 400px;
    width: 100%;
    padding: 22px 24px;
  }

  .unlockContent {
    height: 20px;
    width: 190px;
    padding: 22px 24px;
  }

  .image {
    width: 100%;
    height: 100%;
    max-height: 270px;
    border-radius: 5px;
    display: block;
    object-fit: contain;
  }
`
const LoadingContainer = styled.div`
width: 100%
padding: 10px;
.header {
  ${{ ...Typography.fontSize.x50 }}
  ${{ ...Typography.fontWeight.bold }}
}
.mint {
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
}
.content {
  margin-left: 2rem;
}
.btn {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  border-radius: ${Outline.borderRadius.base}px;
  cursor: pointer;
}
.btnLoading {
  background: rgb(230, 230, 230);
  color: rgb(255, 255, 255);
}
.btnCancel{
  ${{ ...Outline.border.gray }}
}
`

export const Single = ({ history }: RouteComponentProps) => {
  const { isSingle } = window.history.state.state
  const dispatch = useDispatch()
  const darkMode = useIsDarkMode()
  const state = useMintState()
  const [showImg, setShowImg] = useState(false)
  const toggle = () => setShowImg(!showImg)
  const [openMint, setOpenMint] = useState(false)
  const [item] = useState({
    name: '',
    descriptions: '',
    urlFile: '',
    price: 0,
    symbol: '',
    royalties: null,
    numberOfCopies: 1,
    putOnSaleType: 1,
    startingDate: null,
    expirationDate: null,
    categoryId: '',
    collectionId: '',
  })
  const [openFileSelector, { plainFiles }] = useFilePicker({
    multiple: false,
    accept: ['.png', '.jpg', '.mp4', '.mov', '.gif', '.svg'],
    readAs: 'DataURL',
  })
  useEffect(() => {
    plainFiles[0] && dispatch(fileChange({ value: plainFiles[0] }))
    plainFiles[0] && dispatch(fieldChange({ fieldName: 'fileType', fieldValue: plainFiles[0].type }))
  }, [plainFiles, dispatch])
  const formik = useFormik({
    initialValues: item,
    validationSchema: validationFormCreateSchema,
    onSubmit: () => {
      if (state.file) {
        setOpenMint(true)
        const file = state.file
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = async () => {
          Ipfs.GetHash(reader.result)
            .then((response: any) => {
              const hash = response.Hash
              dispatch(fieldChange({ fieldName: 'ipfsHash', fieldValue: hash }))
              if (state.categorie) {
                // dispatch(postItem(body))
                if (state.isCompleted === true) {
                  window.location.href = '/#/myitem'
                }
              }
            })
            .catch((e) => {
              console.log(e)
            })
        }
      }
      formik.resetForm()
      dispatch(resetForm({ value: 'resetform' }))
    },
  })
  const LoadingForm = () => {
    return (
      <LoadingContainer>
        <div className="header">Follow steps</div>
        <div className="mint">
          {state.isCompleted === true ? (
            <Asset.Check fill={'#ccc'} height={50} width={50} />
          ) : (
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          )}
          <div className="content">
            <LabelInput>Mint</LabelInput>
            <TextDescription>Send transaction to create your NFT</TextDescription>
          </div>
        </div>
        <div className=" btn btnLoading">Inprogress...</div>
        <div className="mint">
          <Asset.Check fill={'#ccc'} height={50} width={50} />
          <div className="content">
            <LabelInput>Approve</LabelInput>
            <TextDescription>This transaction is conducted only once per collection</TextDescription>
          </div>
        </div>
        <div className=" btn btnLoading">Start</div>
        <div className=" btn btnCancel" onClick={() => setOpenMint(false)}>
          Cancel
        </div>
      </LoadingContainer>
    )
  }
  // render input
  const FormInput = (location?: string) => {
    return Forms.map((r) => {
      if (location === r.location) {
        return r.control?.map((f, index) => {
          if (f.type === Type.Input) {
            return (
              <TextInput key={index}>
                <LabelInput style={{ margin: 0 }}>{f.title}</LabelInput>
                <div className="text-input ">
                  <input
                    id={f.id}
                    type={'input'}
                    placeholder={f.placeHolder}
                    onBlur={(e) => formik.setFieldValue(f.id, e.target.value)}
                    defaultValue={getIn(formik.values, f.id)}
                  />
                </div>
                <ErrorMessage>{errorMessage(f.id)}</ErrorMessage>
                <TextDescription>{f.panel}</TextDescription>
              </TextInput>
            )
          } else if (f.type === Type.InputDropdown) {
            return (
              <TextInput key={index}>
                <LabelInput style={{ margin: 0 }}>{f.title}</LabelInput>
                <div className="text-input">
                  <input
                    id={f.id}
                    type={'number'}
                    min="0"
                    placeholder={f.placeHolder}
                    onBlur={(e) => {
                      formik.setFieldValue(f.id, e.target.value)
                    }}
                    defaultValue={getIn(formik.values, f.id)}
                  />
                  <StablePrice option={f.option} />
                </div>
                <TextDescription>{f.panel}</TextDescription>
              </TextInput>
            )
          } else if (f.type === Type.Dropdown) {
            return (
              <TextInput style={{ width: '49%' }} key={f.id}>
                <LabelInput style={{ margin: 0 }}>{f.title}</LabelInput>
                <div className="text-input">
                  <SelectTableDate option={f.option} />
                </div>
              </TextInput>
            )
          } else if (f.type === Type.InputNumber) {
            return (
              <TextInput key={f.id}>
                <LabelInput style={{ margin: 0 }}>{f.title}</LabelInput>
                <div className="text-input">
                  <input
                    id={f.id}
                    type={'number'}
                    min="0"
                    placeholder={f.placeHolder}
                    onBlur={(e) => {
                      formik.setFieldValue(f.id, e.target.value)
                    }}
                    defaultValue={getIn(formik.values, f.id)}
                  />
                </div>
              </TextInput>
            )
          }
        })
      }
    })
  }
  const errorMessage = (fieldName: string) => {
    const touched = getIn(formik.touched, fieldName)
    const error = getIn(formik.errors, fieldName)
    if (touched && error) {
      return error
    }
    return undefined
  }

  return (
    <Container style={{ width: 1000 }}>
      {/* back window */}
      <Row>
        <LabelInput onClick={() => history.goBack()}>
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
        </LabelInput>
      </Row>
      <Row>
        <h1 className="my-4 bold text-center">Create {isSingle ? 'single' : 'multi'} collectible</h1>
      </Row>
      {/* info item */}
      <Row>
        <Col xs={8}>
          <LabelInput>Upload File</LabelInput>

          <Around>
            <FormGroup hidden={state.file ? true : false}>
              <Label className="d-block mb-3">PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</Label>
              <Asset.Plus
                onClick={() => openFileSelector()}
                width={72}
                height={72}
                style={{ borderRadius: '50%', border: '1px groove #cccc', padding: 10, cursor: 'pointer' }}
              />
            </FormGroup>
            <FormGroup hidden={state.file ? false : true}>
              <div
                onClick={() => {
                  state.file && dispatch(deleteFile({ value: state.file }))
                }}
              >
                {state.file && state.file.type.includes('image') ? (
                  <img src={URL.createObjectURL(state.file)} style={{ borderRadius: 10, maxHeight: 200 }}></img>
                ) : (
                  state.file && (
                    <ReactPlayer
                      url={URL.createObjectURL(state.file)}
                      playing={false}
                      muted={true}
                      controls={true}
                      width={'100%'}
                      style={{ maxHeight: 200, margin: 'auto' }}
                    />
                  )
                )}
              </div>
            </FormGroup>
          </Around>

          <Row
            style={{
              marginTop: 15,
            }}
          >
            <Categories />
            {isSingle === false && FormInput('multiple')}
            {FormInput('infomation')}
            {/* action */}
            <FlexAround>
              <Button
                onClick={() => {
                  formik.handleSubmit()
                }}
              >
                Mint
              </Button>
              <Button
                onClick={() => {
                  formik.resetForm()
                }}
              >
                Unsaved changes
              </Button>
            </FlexAround>
          </Row>

          {/* loading  */}
          <Modal isOpen={openMint} onDismiss={() => setOpenMint(false)}>
            <LoadingForm />
          </Modal>
        </Col>
        {/*  */}
        <Col xs={4}>
          <Preview>
            <LabelInput>Preview</LabelInput>
            <div className="content">
              <p className="text-center" hidden={state.file ? false : true}>
                <img width={'24px'} src={darkMode ? Logo : Logo} alt="logo" /> Polrare
              </p>
              <TextDescription hidden={state.file ? true : false}>
                Upload file to preview your brand new NFT
              </TextDescription>
              {state.file &&
                (state.file.type.includes('image') ? (
                  <img src={URL.createObjectURL(state.file)} className="image" onClick={toggle} />
                ) : (
                  <ReactPlayer
                    url={URL.createObjectURL(state.file)}
                    playing={false}
                    muted={true}
                    controls={true}
                    width={'90%'}
                    style={{ maxHeight: 200, margin: 'auto' }}
                  />
                ))}

              <TextDescription hidden={!isSingle && state.file ? false : true}>
                {getIn(formik.values, 'numberOfCopies') + ` `}
              </TextDescription>
              <TextDescription hidden={state.file ? false : true}>{getIn(formik.values, 'name')}</TextDescription>
              <Modal isOpen={showImg} onDismiss={toggle}>
                {state.file &&
                  (state.file.type.includes('image') ? (
                    <img style={{ width: '100%' }} src={URL.createObjectURL(state.file)} onClick={toggle} />
                  ) : (
                    <ReactPlayer
                      url={URL.createObjectURL(state.file)}
                      playing={false}
                      muted={true}
                      controls={true}
                      width={'90%'}
                      style={{ maxHeight: 200, margin: 'auto' }}
                    />
                  ))}
              </Modal>
              <div
                hidden={!isSingle && getIn(formik.values, 'numberOfCopies') > 1 ? false : true}
                style={{
                  position: 'absolute',
                  width: '95%',
                  height: '100%',
                  left: '2.5%',
                  borderRadius: 16,
                  zIndex: -1,
                  top: 7.5,
                  border: '1px solid #ccc',
                }}
              ></div>
              <div
                hidden={!isSingle && getIn(formik.values, 'numberOfCopies') > 1 ? false : true}
                style={{
                  position: 'absolute',
                  width: '86%',
                  height: '100%',
                  left: '7%',
                  borderRadius: 16,
                  zIndex: -2,
                  top: 15,
                  border: '1px solid #ccc',
                }}
              ></div>
            </div>
          </Preview>
        </Col>
      </Row>
    </Container>
  )
}
