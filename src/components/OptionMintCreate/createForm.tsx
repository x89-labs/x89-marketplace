import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useIsDarkMode } from 'state/user/hooks'
import { useDispatch } from 'react-redux'
import { useMintState } from 'state/mint/hooks'
import useFilePicker from 'hooks/useFilePicker'
import { BodyItem } from 'models/bodyItem'
import { fieldChange, fileChange, postItem } from 'state/mint/actions'
import { useFormik } from 'formik'
import { Ipfs } from 'hooks/ipfs'
import { useActiveWeb3React } from 'hooks/web3'
import * as Yup from 'yup'
import { validationFormCreateSchema } from 'pages/Create/config'
import { POLRARE_ADDRESS } from 'constants/addresses'

const Container = styled.div`
  padding: 1rem;
  width: 100%;
`
const Title = styled.p`
  margin: 0;
  font-size: 1.5rem;
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
  border-radius: 3.5rem;
  margin: 1rem;
  background-color: #ccc;
`
const ChooseFile = styled.div`
  width: 50%;
  justify-self: flex-end;
  margin-top: 1rem;
`
const ButtonChoose = styled.div`
  color: #0066ff;
  margin-top: 1rem;
  background: #0066ff26;
  padding: 0.8rem;
  font-weight: bold;
  width: 8rem;
  border-radius: 2rem;
  cursor: pointer;
`
const BoldText = styled.p`
  font-weight: bold;
  margin: 0;
`
const NormalText = styled.p`
  margin: 0 2px;
  font-size: 14px;
  color: ${({ theme }) => theme.text5};
  font-weight: 700;
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
  background: rgb(0, 102, 255);
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
        <ViewImage>{plainFiles[0] && <Image src={URL.createObjectURL(plainFiles[0])}></Image>}</ViewImage>
        <ChooseFile>
          <NormalText>We recommend an image of at least 400x400. Gifs work too.</NormalText>
          <ButtonChoose onClick={() => openFileSelector()}>Choose File</ButtonChoose>
        </ChooseFile>
      </Header>
      <Content>
        <TextInput>
          <BoldText>Display name (required)</BoldText>
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
          <BoldText>Symbol (required)</BoldText>
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
        </TextInput>
        <TextInput>
          <BoldText>Description (optional)</BoldText>
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
