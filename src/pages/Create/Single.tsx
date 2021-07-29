import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import * as Icon from 'react-feather'
import styled from 'styled-components'
import * as Asset from '../../assets'
import { useIsDarkMode } from 'state/user/hooks'
import { useMintState } from 'state/mint/hooks'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { fieldChange, fileChange, getCategories, postItem, resetForm } from 'state/mint/actions'
import { getIn, useFormik } from 'formik'
import { BodyItem } from 'models/bodyItem'
import { useActiveWeb3React } from 'hooks/web3'
import { Forms, validationFormCreateSchema } from '../../state/mint/config'
import { Type } from 'models/formInput'
import { Ipfs } from 'hooks/ipfs'
import Switch from 'react-switch'
import useIsXNFTContract from 'hooks/usePolrareNft'
import { POLRARE_ADDRESS } from 'constants/addresses'
import { Color, Typography } from 'styles'
import Categories from 'components/Mint/categories'
import UploadFile from 'components/Mint/UploadFile'
import StableSelect from 'components/Mint/stableSelect'
import OptionMintCreate from 'components/Mint/OptionMintCreate'
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
  const { addFee } = useIsXNFTContract()

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
          if (hash) {
            dispatch(fieldChange({ fieldName: 'ipfsHash', fieldValue: hash }))
          }

          if (state.categorie) {
            const body: BodyItem = {
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
            console.log(body)
            addFee()
            dispatch(postItem(body))
            window.location.href = '/#/myitem'
          }
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
  const Preview = styled.div`
    .preview {
      postition: fixed;
      margin: 4rem 0 0 2rem;
      position: relative;
      height: 390px;
      width: 240px;
      @media only screen and (max-width: 700px) {
        display: none;
      }
    }

    .pr {
      position: sticky;
      top: 10px;
    }

    .content {
      border-radius: 16px;
      border: 1px solid ${({ theme }) => theme.text5};
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
      margin-top: 86px;
      margin-left: 8px;
      width: 90%;
      height: 100px;
      border-radius: 5px;
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

  return (
    <Container>
      <Around>
        <Title onClick={() => history.goBack()}>{FeatherIcon(icons)}</Title>
        <h1 style={{ textAlign: 'center' }}>Create {CreateType()} collectible</h1>
        <Title>UploadFile</Title>
        <UploadFile />
        <Categories />
        <OptionMintCreate formik={formik} isSingle={true} />
      </Around>
      <Preview>
        <div className="preview">
          <div className="pr">
            <h4>Preview</h4>
            <div className="content">
              <Text hidden={state.file ? true : false}> Upload file to preview your brand new NFT</Text>
              <PreviewFile />
            </div>
          </div>
        </div>
      </Preview>
    </Container>
  )
}
