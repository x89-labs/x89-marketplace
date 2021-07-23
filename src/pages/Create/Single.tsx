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
import { Forms, validationFormCreateSchema } from './config'
import { Type } from 'models/formInput'
import { Ipfs } from 'hooks/ipfs'
import Switch from 'react-switch'
import useIsXNFTContract from 'hooks/useXNFTContract'
import { XNFT_ADDRESS } from 'constants/addresses'
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

enum SwitchType {
  FixedPrice = 1,
  TimedAuction,
  UnlimitedAuction,
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
  const [switchType, setSwitchType] = useState<SwitchType>()
  const [checked, setChecked] = useState(true)
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
              contractAddress: XNFT_ADDRESS[1],
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
      // formik.resetForm()
      // dispatch(resetForm({ value: 'resetform' }))
    },
  })

  const errorMessage = (fieldName: string) => {
    const touched = getIn(formik.touched, fieldName)
    const error = getIn(formik.errors, fieldName)
    if (touched && error) {
      return error
    }
    return undefined
  }

  useEffect(() => {
    setSwitchType(SwitchType.FixedPrice)
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
  const Create = styled.div`
    * {
      display: flex;
      flex-direction: row;
    }

    .marketplace {
      display: flex;
      flex-direction: column;
      width: 170px;
      height: 140px;
      border: 2px solid lightgray;
      border-radius: 16px;
      margin: 20px 10px 0 0;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      text-align: center;
      @media only screen and (max-width: 700px) {
        width: 112px;
        height: 120px;
      }
    }

    .image {
      width: 40px;
      height: 40px;
    }
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
  const TextInput = styled.div`
    margin-top: 40px;
    margin-right: 20px;
    .form__group {
      margin-top: 10px;
      background: ${({ theme }) => theme.bg1};
      height: 48px;
      display: flex;
      flex-direction: row;
      border: 1px solid #ccc;
      justify-content: flex-end;
      border-radius: 10px;
    }
    input {
      background: ${({ theme }) => theme.bg1};
      color: ${({ theme }) => theme.text1};
      width: 100%;
      border: none;
      outline: none;
      margin: 4px;
    }
  `
  const ErrorMessage = styled.div`
    color: red;
    ${{ ...Typography.fontSize.x30 }}
    ${{ ...Typography.fontWeight.bold }}
  `
  const UnlockPurchased = styled.div`
    display: flex;
  `
  const UnlockTitle = styled.h2`
    width: 18rem;
    margin: 0;
    background: ${Color.linearGradient.button};
    background-size: 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
  const FixedPrice = () => {
    return (
      <div
        className="marketplace"
        onClick={() => setSwitchType(SwitchType.FixedPrice)}
        style={{
          border: switchType === SwitchType.FixedPrice ? '2px solid rgb(0, 102, 255)' : '2px solid lightgray',
        }}
      >
        <Asset.FixedPrice className="image" fill={darkMode ? '#ffffff' : '#000000'} />
        <h4>Fixed price</h4>
      </div>
    )
  }

  const TimedAuction = () => {
    return (
      <div
        className="marketplace"
        onClick={() => setSwitchType(SwitchType.TimedAuction)}
        style={{
          border: switchType === SwitchType.TimedAuction ? '2px solid rgb(0, 102, 255)' : '2px solid lightgray',
        }}
      >
        <Asset.TimedAuction className="image" fill={darkMode ? '#ffffff' : '#000000'} />
        <h4>Timed auction</h4>
      </div>
    )
  }

  const UnlimitedAuction = () => {
    return (
      <div
        className="marketplace"
        onClick={() => setSwitchType(SwitchType.UnlimitedAuction)}
        style={{
          border: switchType === SwitchType.UnlimitedAuction ? '2px solid rgb(0, 102, 255)' : '2px solid lightgray',
        }}
      >
        <Asset.UnlimitedAuction className="image" fill={darkMode ? '#ffffff' : '#000000'} />
        <h4>Unlimited auction</h4>
      </div>
    )
  }

  const FormInput = (location?: string) => {
    return Forms.map((r, i) => {
      if (location === r.location) {
        return r.control?.map((f, index) => {
          if (f.type === Type.Input) {
            return (
              <TextInput key={index}>
                <Title style={{ margin: 0 }}>{f.title}</Title>
                <div className="form__group ">
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
                <div className="form__group ">
                  <input
                    id={f.id}
                    type={'input'}
                    placeholder={f.placeHolder}
                    onBlur={(e) => formik.setFieldValue(f.id, e.target.value)}
                    defaultValue={getIn(formik.values, f.id)}
                  />
                  <StableSelect option={f.option} id={f.idDropdown} />
                </div>
                <Text>{f.panel}</Text>
              </TextInput>
            )
          } else if (f.type === Type.Dropdown) {
            return (
              <TextInput style={{ width: '50%' }} key={f.id}>
                <h3 style={{ margin: 0 }}>{f.title}</h3>
                <div className="form__group ">
                  <StableSelect option={f.option} width={'100%'} />
                </div>
              </TextInput>
            )
          }
        })
      }
    })
  }

  return (
    <Container>
      <Around>
        <Title onClick={() => history.goBack()}>{FeatherIcon(icons)}</Title>
        <h1 style={{ textAlign: 'center' }}>Create {CreateType()} collectible</h1>
        <Title>UploadFile</Title>
        <UploadFile />
        <Categories />
        <div style={{ marginTop: 40 }}>
          <Title>Put on marketplace</Title>
          <div style={{ marginBottom: 20 }}>
            {switchType === 1 ? (
              <Text>Enter price to allow users instantly purchase your NFT</Text>
            ) : switchType === 2 ? (
              <Text>Set a period of time for which buyers can place bids</Text>
            ) : (
              <Text>{`Put your new NFT on Polrare's marketplace`}</Text>
            )}

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Create>
                <div>
                  <FixedPrice />
                  <TimedAuction />
                  <UnlimitedAuction />
                </div>
              </Create>
            </div>
          </div>

          <div>
            {switchType === SwitchType.FixedPrice && FormInput('price')}
            {switchType === SwitchType.TimedAuction && FormInput('bids')}
          </div>
          <UnlockPurchased>
            <div>
              <UnlockTitle>Unlock once purchased</UnlockTitle>
              <Text>Content will be unlocked after successful transaction</Text>
            </div>
            <Switch
              onChange={() => setChecked(!checked)}
              checked={checked}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={40}
            />
          </UnlockPurchased>
          {FormInput('infomation')}
          <OptionMintCreate formik={formik} />
        </div>
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
