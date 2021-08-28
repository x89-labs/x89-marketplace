import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import * as Icon from 'react-feather'
import styled from 'styled-components'
import * as Asset from '../../assets'
import { useIsDarkMode } from 'state/user/hooks'
import { useMintState } from 'state/mint/hooks'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { actBtnAdvanced, fieldChange, fileChange, getCategories, postItem, resetForm } from 'state/mint/actions'
import { getIn, useFormik } from 'formik'
import { BodyItem } from 'models/bodyItem'
import { useActiveWeb3React } from 'hooks/web3'
import { Forms, validationFormCreateSchema } from '../../state/mint/config'

import { Ipfs } from 'hooks/ipfs'

import { POLRARE_ADDRESS } from 'constants/addresses'
import { Color, Outline, Typography } from 'styles'
import Categories from 'components/Mint/categories'
import UploadFile from 'components/Mint/UploadFile'

import OptionMintCreate from 'components/Mint/OptionMintCreate'
import { usePolrareNft } from 'hooks/usePolrareNft'
import Modal from 'components/Modal'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { Description } from '@ethersproject/properties'
interface ico {
  icon: any
  name: string
}

const icons: ico = {
  icon: <Icon.ArrowLeft />,
  name: 'Manage collectible type',
}

const FeatherIcon = (icon: ico) => {
  return (
    <div style={{ position: 'relative', left: '0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <div>{icon.icon}</div>
      <div>{icon.name}</div>
    </div>
  )
}

export const Single = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch()
  const state = useMintState()
  const darkMode = useIsDarkMode()
  const { account } = useActiveWeb3React()
  const { mint } = usePolrareNft()
  const [openMint, setOpenMint] = useState(false)
  const formik = useFormik({
    initialValues: state.initValues,
    validationSchema: validationFormCreateSchema,
    onSubmit: (values) => {
      console.log(values)
      console.log(state.file)
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
              mint()
              if (state.categorie) {
                const body: BodyItem = {
                  royalties: 0,
                  categoryId: state.categorie.id,
                  name: values.name,
                  description: values.description,
                  price: values.price,
                  contractAddress: POLRARE_ADDRESS[1],
                  assetId: '1233',
                  symbol: state.symbol ?? 'ETH',
                  image: hash,
                  totalQuantity: 1,
                  createdBy: account!,
                  type: state.fileType,
                  categoryName: state.categorie.categoryName,
                }

                dispatch(postItem(body))
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

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  `
  const Around = styled.div`
    .labelUpload {
      color: ${({ theme }) => theme.text5};
    }

    .unlockOncePurchased {
      color: ${({ theme }) => theme.text5};
    }
  `

  const Title = styled.p`
    ${{ ...Typography.header.x30 }}
  `
  const Text = styled.p`
    ${{ ...Typography.fontSize.x20 }}
    color: ${Color.neutral.gray}
    margin: 4px 0;
  `
  const Checkbox = styled.input`
    width: 20px;
    height: 20px;
    margin-right: 1%;
    margin-top: 3%;
    margin-bottom: 1%;
    background: #ffffff;
    border: 1.5px solid #eaeef4;
    border-radius: 2px;
  `
  const Description = styled.div`
    width: 628px;
    label {
      color: ${Color.neutral.gray};
    }
  `
  const Preview = styled.div`
    position: sticky;
    top: 60px;
    margin: 5rem 0 0 2rem;
    height: 390px;
    width: 240px;
    @media only screen and (max-width: 700px) {
      display: none;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
      border: 1px solid ${({ theme }) => theme.text5};
      background: ${({ theme }) => theme.bg6};
      height: 320px;
      width: 240px;
      padding: 22px 24px;
    }

    .unlockContent {
      height: 20px;
      width: 190px;
      padding: 22px 24px;
    }

    .image {
      width: 180px;
      border-radius: 5px;
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

  const PreviewFile = () => {
    if (state.file) {
      if (state.file.type.includes('image')) {
        return <img src={URL.createObjectURL(state.file)} width={'90%'} height={240} className="image" />
      } else {
        return (
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
      }
    } else return <></>
  }

  const CreateType = () => {
    return 'single'
  }
  const ShowBtnAdvanced = () => {
    dispatch(actBtnAdvanced())
  }
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

  return (
    <Container>
      <Around>
        <Title onClick={() => history.goBack()}>{FeatherIcon(icons)}</Title>
        <h1 style={{ textAlign: 'center' }}>Create {CreateType()} collectible</h1>
        <Title>Upload File</Title>
        <UploadFile />
        <Description>
          <Checkbox type="checkbox" />
          <label>I declare that this is an original artwork.</label>
          <label>I understand that no plagiarism is allowed,</label>
          <label>and that the artwork can be removed anytime if detected.</label>
        </Description>
        <Categories />
        <OptionMintCreate
          formik={formik}
          isSingle={true}
          showBtnAdvanced={state.showBtnAdvanced}
          actShowBtnAdvanced={ShowBtnAdvanced}
        />
      </Around>
      <Preview>
        <h4 style={{ marginBottom: 10, marginTop: 29.28 }}>Preview</h4>
        <div className="content">
          <Text hidden={state.file ? true : false}> Upload file to preview your brand new NFT</Text>
          <PreviewFile />
        </div>
      </Preview>
      <Modal isOpen={openMint} onDismiss={() => setOpenMint(false)}>
        <LoadingForm />
      </Modal>
    </Container>
  )
}
