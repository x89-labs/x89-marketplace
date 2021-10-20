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

import { Color, Outline, Typography } from 'styles'
import styled from 'styled-components'
import { Button } from 'pages/styled'

// style component
const Title = styled.p`
  ${{ ...Typography.header.x30 }}
`
const Text = styled.span`
  ${{ ...Typography.fontSize.x20 }}
  color: ${Color.neutral.gray}
`
const Around = styled.div`
  margin-top: 10px;
  height: auto;
  border: 1px dashed ${Color.neutral.gray};
  display: flex;
  justify-content: center;
  padding: 30px 0;
  border-radius: 16px;
  position: relative;
  background: ${({ theme }) => theme.lgbg1};
  @media only screen and (max-width: 700px) {
    width: 100%;
  }
`
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
const CloseBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  position: absolute;
  padding: 4px 3px;
  top: 20px;
  right: 39px;
  border: 1px solid ${Color.neutral.gray};
  cursor: pointer;
  .closeBtn {
    margin: 10px;
  }
  @media only screen and (max-width: 700px) {
    right: 14px;
    top: 10px;
  }
`
const ChooseFile = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin: 14px auto;
  display: flex;
  padding: 20px;
  border: 1px solid ${Color.neutral.gray};
  background: ${({ theme }) => theme.bg2};
  cursor: pointer;
`
const TextInput = styled.div`
  margin-top: 15px;
  // margin-right: 20px;
  width: 100%;
  .text-input {
    position: relative;
    margin-top: 10px;
    background: ${({ theme }) => theme.bg1};
    height: 48px;
    display: flex;
    border: 1px solid #ccc;
    justify-content: space-between;
    border-radius: 10px;
  }
  input {
    background: ${({ theme }) => theme.bg1};
    color: ${({ theme }) => theme.text1};
    width: 100%;
    border: none;
    outline: none;
    margin: 10px;
  }
`
const CreateItem = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: space-around;
`
const ErrorMessage = styled.div`
  color: red;
  ${{ ...Typography.fontSize.x20 }}
  ${{ ...Typography.fontWeight.bold }}
`

export const Single = ({ history }: RouteComponentProps) => {
  const { isSingle } = window.history.state.state
  const dispatch = useDispatch()
  const darkMode = useIsDarkMode()
  const state = useMintState()

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
  // const [switchType, setSwitchType] = useState<PutOnSaleType>(PutOnSaleType.FixedPrice)

  const [openFileSelector, { plainFiles }] = useFilePicker({
    multiple: false,
    accept: ['.png', '.jpg', '.mp4', '.mov', '.gif', '.svg'],
    readAs: 'DataURL',
  })

  // const Create = styled.div`
  //   margin-top: 16px;
  //   display: flex;
  //   margin-right: 10px;
  //   .type-create {
  //     width: 32%;
  //     text-align: center;
  //     align-items: center;
  //     margin-right: 10px;
  //     justify-content: center;
  //     background: ${darkMode ? Color.linearGradient.black : `linear-gradient(#fff,#fff)`} padding-box,
  //       ${Color.linearGradient.button} border-box;
  //     border-radius: 16px;
  //     border: 2px solid transparent;
  //     padding: 15px 0;
  //     cursor: pointer;
  //   }
  //   .image {
  //     display: block;
  //     margin: 10px auto;
  //     width: 40px;
  //     height: 40px;
  //   }
  // `
  useEffect(() => {
    plainFiles[0] && dispatch(fileChange({ value: plainFiles[0] }))
    plainFiles[0] && dispatch(fieldChange({ fieldName: 'fileType', fieldValue: plainFiles[0].type }))
  }, [plainFiles, dispatch])
  // useEffect(() => {
  //   dispatch(getCategories())
  // }, [dispatch])

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
            <Title>Mint</Title>
            <Text>Send transaction to create your NFT</Text>
          </div>
        </div>
        <div className=" btn btnLoading">Inprogress...</div>
        <div className="mint">
          <Asset.Check fill={'#ccc'} height={50} width={50} />
          <div className="content">
            <Title>Approve</Title>
            <Text>This transaction is conducted only once per collection</Text>
          </div>
        </div>
        <div className=" btn btnLoading">Start</div>
        <div className=" btn btnCancel" onClick={() => setOpenMint(false)}>
          Cancel
        </div>
      </LoadingContainer>
    )
  }
  // // render type
  // const TypeCreate = (type: PutOnSaleType) => {
  //   return (
  //     <div
  //       className="type-create"
  //       onClick={() => setSwitchType(type)}
  //       style={{
  //         border: switchType === type ? '2px solid transparent' : '2px solid lightgray',
  //       }}
  //     >
  //       {type == PutOnSaleType.FixedPrice ? (
  //         <Asset.FixedPrice className="image" fill={darkMode ? '#ffffff' : '#000000'} />
  //       ) : type == PutOnSaleType.TimedAuction ? (
  //         <Asset.TimedAuction className="image" fill={darkMode ? '#ffffff' : '#000000'} />
  //       ) : (
  //         <Asset.UnlimitedAuction className="image" fill={darkMode ? '#ffffff' : '#000000'} />
  //       )}
  //       <span>
  //         {type == PutOnSaleType.FixedPrice
  //           ? 'Fixed Price'
  //           : type == PutOnSaleType.TimedAuction
  //           ? 'Timed Auction'
  //           : 'Unlimited Auction'}
  //       </span>
  //     </div>
  //   )
  // }
  // render input
  const FormInput = (location?: string) => {
    return Forms.map((r) => {
      if (location === r.location) {
        return r.control?.map((f, index) => {
          if (f.type === Type.Input) {
            return (
              <TextInput key={index}>
                <Title style={{ margin: 0 }}>{f.title}</Title>
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
                <Text>{f.panel}</Text>
              </TextInput>
            )
          } else if (f.type === Type.InputDropdown) {
            return (
              <TextInput key={index}>
                <Title style={{ margin: 0 }}>{f.title}</Title>
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
                <Text>{f.panel}</Text>
              </TextInput>
            )
          } else if (f.type === Type.Dropdown) {
            return (
              <TextInput style={{ width: '49%' }} key={f.id}>
                <Title style={{ margin: 0 }}>{f.title}</Title>
                <div className="text-input">
                  <SelectTableDate option={f.option} />
                </div>
              </TextInput>
            )
          } else if (f.type === Type.InputNumber) {
            return (
              <TextInput key={f.id}>
                <Title style={{ margin: 0 }}>{f.title}</Title>
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
        <Title onClick={() => history.goBack()}>
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
        </Title>
      </Row>
      <Row>
        <h1 className="my-4 bold text-center">Create {isSingle ? 'single' : 'multi'} collectible</h1>
      </Row>
      {/* info item */}
      <Row style={{ height: '100%' }}>
        <Col xs={8}>
          <Title>Upload File</Title>
          <Around>
            <FormGroup hidden={state.file ? true : false}>
              <Label className="labelUpload">PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</Label>
              <br />
              <ChooseFile onClick={() => openFileSelector()}>
                <Asset.Plus width={20} height={20} />
              </ChooseFile>
            </FormGroup>
            <FormGroup hidden={state.file ? false : true}>
              <CloseBtn
                onClick={() => {
                  state.file && dispatch(deleteFile({ value: state.file }))
                }}
              >
                <Asset.Close width={12} height={12} className="closeBtn" fill={darkMode ? '#fff' : '#000'} />
              </CloseBtn>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {state.file && state.file.type.includes('image') ? (
                  <img src={URL.createObjectURL(state.file)} style={{ borderRadius: 10, maxHeight: 200 }}></img>
                ) : (
                  state.file && (
                    <ReactPlayer
                      url={URL.createObjectURL(state.file)}
                      playing={false}
                      muted={true}
                      controls={true}
                      width={'90%'}
                      height={'auto'}
                    />
                  )
                )}
              </div>
            </FormGroup>
          </Around>

          <Categories />

          <Row
            style={{
              marginTop: 15,
            }}
          >
            {/* <Title>Put on type-create</Title>
            {switchType === 1 ? (
              <Text>Enter price to allow users instantly purchase your NFT</Text>
            ) : switchType === 2 ? (
              <Text>Set a period of time for which buyers can place bids</Text>
            ) : (
              <Text>{`Put your new NFT on Polrare's type-create`}</Text>
            )} */}
            {/* choose type */}
            {/* <Create>
              {TypeCreate(PutOnSaleType.FixedPrice)}
              {isSingle && TypeCreate(PutOnSaleType.TimedAuction)}
              {TypeCreate(PutOnSaleType.UnlimitedAuction)}
            </Create> */}
            {/* form info */}
            {/* <div>
              {switchType === PutOnSaleType.FixedPrice && FormInput('price')}
              <div style={{ justifyContent: 'space-between', display: 'flex', flexWrap: 'wrap' }}>
                {switchType === PutOnSaleType.TimedAuction && FormInput('bids')}
              </div>
            </div> */}
            {FormInput('infomation')}
            {isSingle === false && FormInput('multiple')}
            {/* action */}
            <CreateItem>
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
            </CreateItem>
          </Row>

          {/* loading  */}
          <Modal isOpen={openMint} onDismiss={() => setOpenMint(false)}>
            <LoadingForm />
          </Modal>
        </Col>
        {/*  */}
        <Col xs={4}>
          <Preview>
            <h4>Preview</h4>
            <div className="content">
              <p className="text-center" hidden={state.file ? false : true}>
                <img width={'24px'} src={darkMode ? Logo : Logo} alt="logo" /> Polrare
              </p>
              <Text hidden={state.file ? true : false}> Upload file to preview your brand new NFT</Text>
              {/* <PreviewFile /> */}
              {state.file && state.file.type.includes('image') ? (
                state.file ? (
                  <img src={URL.createObjectURL(state.file)} className="image" />
                ) : (
                  <div className="image">
                    <ReactPlayer
                      url={URL.createObjectURL(state.file)}
                      playing={false}
                      muted={true}
                      controls={true}
                      width={'90%'}
                      height={'auto'}
                    />
                  </div>
                )
              ) : (
                <></>
              )}
              <Text hidden={!isSingle && state.file ? false : true}> {getIn(formik.values, 'numberOfCopies')}</Text>
              <Text hidden={state.file ? false : true}> {getIn(formik.values, 'name')}</Text>
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
