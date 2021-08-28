import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useIsDarkMode } from 'state/user/hooks'
import { useDispatch } from 'react-redux'
import { useMintState } from 'state/mint/hooks'
import useFilePicker from 'hooks/useFilePicker'
import { BodyItem } from 'models/bodyItem'
import * as Asset from 'assets'
import { fieldChange, fileChange, postItem } from 'state/mint/actions'
import { useFormik } from 'formik'
import { Ipfs } from 'hooks/ipfs'
import { useActiveWeb3React } from 'hooks/web3'
import * as Yup from 'yup'
import { validationFormCreateSchema } from 'state/mint/config'
import { POLRARE_ADDRESS } from 'constants/addresses'
import { Color } from 'styles'
const Container = styled.div`
  padding: 1rem;
  width: 100%;
  background: #fff;
`
const Title = styled.p`
  margin: 0;
  font-size: 1.5rem;
  color: #000000;
  font-weight: bolder;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const Image = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 3.5rem;
`
const ViewImage = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 8px;
  margin: 1rem;
  background: #eaeef4;
`
const ChooseFile = styled.div`
  width: 60%;
  justify-self: flex-end;
  margin-top: 1rem;
`
const ButtonChoose = styled.div`
  color: #353945;
  margin-top: 1rem;
  background: #0066ff26;
  padding: 0.8rem;
  font-weight: bold;
  text-align: center;
  width: 100%;
  background: #ffffff
  border: 1px solid #E0D3FB;
  box-sizing: border-box;
  box-shadow: 0px 8px 25px rgba(53, 223, 177, 0.16);
  border-radius: 16px;
  cursor: pointer;
`
const BoldText = styled.p`
  color: #000000;
  font-weight: bold;
  margin: 0;
  span {
    color: ${Color.neutral.gray};
    font-size: 14px;
    font-weight: 500;
  }
`
const BorderIcon = styled.div`
  background: #fffffe;
  border: 1px solid #939393;
  box-sizing: border-box;
  border-radius: 61px;
  width: 60px;
  height: 60px;
  padding: 18px;
  margin: 26px;
`
const NormalText = styled.p`
  margin: 5px 2px;
  font-size: 14px;
  color: ${({ theme }) => theme.text5};
  font-weight: 500;
`
const NormalTextUpload = styled.p`
  margin: 0 2px;
  font-size: 15px;
  color: ${({ theme }) => theme.text5};
  font-weight: 600;
`

const Content = styled.div``
const TextInput = styled.div`
  margin-bottom: 1rem;
  input {
    width: 100%;
    border: none;
    outline: none;
  }
`
const FormGroup = styled.div`
  width: 100%;
  background: #f7f2f7;
  height: 48px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ccc;
  justify-content: flex-end;
`

const ButtonCreate = styled.div`
  color: rgb(255, 255, 255);
  background: #6324ed;
  display: flex;
  height: 48px;
  font-size: 15px;
  font-weight: bolder;
  font-family: inherit;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 48px;
  border-radius: 48px;
`

export default function CreateModal() {
  const dispatch = useDispatch()
  const state = useMintState()
  const { account } = useActiveWeb3React()
  const [openFileSelector, { plainFiles }] = useFilePicker({
    multiple: false,
    accept: ['.png', '.jpg'],
  })

  useEffect(() => {
    plainFiles[0] && dispatch(fileChange({ value: plainFiles[0] }))
    plainFiles[0] && dispatch(fieldChange({ fieldName: 'fileType', fieldValue: plainFiles[0].type }))
  }, [plainFiles[0]])

  const formik = useFormik({
    initialValues: state.initValues,
    validationSchema: validationFormCreateSchema,
    onSubmit: (values) => {
      if (state.file) {
        const file = state.file
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = async () => {
          const hash = await Ipfs.GetHash(reader.result)
          if (state.symbol) {
            const body: BodyItem = {
              royalties: 0,
              categoryId: '9c9debff-35d5-4276-ba59-d606c8ed9859',
              name: values.name,
              description: values.description,
              price: values.price,
              contractAddress: POLRARE_ADDRESS[1],
              assetId: '1233',
              symbol: state.symbol,
              image: hash,
              totalQuantity: 1,
              createdBy: account!,
              type: state.fileType,
              categoryName: 'string',
            }
            console.log(body)
            dispatch(postItem(body))
          }
        }
      }
    },
  })

  return (
    <Container>
      <Title>Collection</Title>
      <Header>
        <ViewImage>
          {plainFiles[0] && <Image src={URL.createObjectURL(plainFiles[0])}></Image>}
          <BorderIcon>
            <Asset.Plus width={21} height={21} />
          </BorderIcon>
        </ViewImage>
        <ChooseFile>
          <NormalTextUpload>We recommend an image of at least 400x400. Gifs work too.</NormalTextUpload>
          <ButtonChoose onClick={() => openFileSelector()}>Choose File</ButtonChoose>
        </ChooseFile>
      </Header>
      <Content>
        <TextInput>
          <BoldText>
            Display name
            <span> (required)</span>
          </BoldText>
          <FormGroup>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter Token Name"
              onChange={(e) => {
                if (e.target.value !== '') {
                  formik.setFieldValue('name', e.target.value.trim())
                }
              }}
            />
          </FormGroup>
          <NormalText>Token name cannot be changed in future</NormalText>
        </TextInput>
        <TextInput>
          <BoldText>
            Symbol
            <span> (required)</span>
          </BoldText>
          <FormGroup>
            <input
              id="symbol"
              type="input"
              placeholder="Enter Token Symbol"
              onChange={(e) => {
                if (e.target.value !== '') {
                  formik.setFieldValue('symbol', e.target.value.trim())
                }
              }}
            />
          </FormGroup>
          <NormalText>With preserved line-breaks</NormalText>
        </TextInput>
        <TextInput>
          <BoldText>
            Description
            <span> (required)</span>
          </BoldText>
          <FormGroup>
            <input
              id="description"
              type="input"
              placeholder="Spread Some words about your token collection"
              onChange={(e) => {
                if (e.target.value !== '') {
                  formik.setFieldValue('description', e.target.value.trim())
                }
              }}
            />
          </FormGroup>
          <NormalText>With preserved line-breaks</NormalText>
        </TextInput>
        <TextInput>
          <BoldText>Short URL</BoldText>
          <FormGroup>
            <input
              id="shorlurl"
              type="input"
              placeholder="app.polrare.co/ Enter short URL"
              onChange={(e) => {
                if (e.target.value !== '') {
                  formik.setFieldValue('shorlurl', e.target.value.trim())
                }
              }}
            />
          </FormGroup>
          <NormalText>
            <span>Customize your URL on Polrare Market.</span>
            <span>Must only contain lowercase letters, numbers, and hyphens.</span>
          </NormalText>
        </TextInput>
      </Content>
      <ButtonCreate
        onClick={() => {
          formik.handleSubmit()
        }}
      >
        Create Collection
      </ButtonCreate>
    </Container>
  )
}
