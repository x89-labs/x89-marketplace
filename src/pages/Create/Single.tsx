import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import * as Icon from 'react-feather'
import styled from 'styled-components'
import * as Asset from '../../assets'
import { useIsDarkMode } from 'state/user/hooks'
import { useMintState } from 'state/mint/hooks'
import StableSelect from 'components/StableSelect'
import OptionMintCreate from 'components/OptionMintCreate'
import UploadFile from 'components/UploadFile'
import ReactPlayer from 'react-player'
import Categories from 'components/Categories'
import { useDispatch } from 'react-redux'
import { fieldChange, getCategories, postItem } from 'state/mint/actions'
import { useFormik } from 'formik'
import { BodyItem } from 'models/bodyItem'
import { useActiveWeb3React } from 'hooks/web3'
import { contractAddress } from 'client/callSmContract'
import { Forms } from './config'
import { Type } from 'models/formInput'
import MyInput from 'components/Input'
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

  const formik = useFormik({
    initialValues: state.initValues,
    // validationSchema:
    onSubmit: (values) => {
      console.log(state.ipfsHash)
      console.log(state.categorieId)
      if (state.ipfsHash && state.categorieId) {
        const body: BodyItem = {
          categoryId: state.categorieId,
          name: values.name,
          description: values.description,
          price: values.price,
          contractAddress: contractAddress,
          assetId: '1233',
          symbol: values.symbol,
          image: state.ipfsHash,
          totalQuantity: 1,
          createdBy: account!,
        }
        dispatch(postItem(body))
      }
    },
  })
  useEffect(() => {
    setSwitchType(SwitchType.FixedPrice)
    dispatch(getCategories())
  }, [])

  const Around = styled.div`
    p {
      color: ${({ theme }) => theme.text5};
      fontweight: bold;
      line-height: 0.5;
    }
    h3 {
      margin: 0;
    }
    h3:hover {
      cursor: pointer;
    }
    h1 {
      margin: 1rem 0;
    }

    .labelUpload {
      color: ${({ theme }) => theme.text5};
    }

    .unlockOncePurchased {
      color: ${({ theme }) => theme.text5};
    }
  `
  const Create = styled.div`
    * {
      display: flex;
      flex-direction: row;
    }

    .marketplace {
      display: flex;
      flex-direction: column;
      width: 140px;
      height: 140px;
      border: 2px solid lightgray;
      border-radius: 16px;
      margin: 10px;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .image {
      width: 40px;
      height: 40px;
    }
  `

  const Preview = styled.div`
    .preview {
      position: relative;
      height: 390px;
      width: 240px;
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
  const LableTitle = styled.h4`
    font-weight: 700;
    margin: 0;
  `
  const TextInput = styled.div`
    margin-top: 40px;
    margin-right: 20px;
    .form__group {
      margin-top: 10px;
      background: #f7f2f7;
      height: 48px;
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid #ccc;
      justify-content: flex-end;
    }
    input {
      background: #f7f2f7;
      width: 100%;
      border: none;
      outline: none;
    }
    p {
      font-weight: 700;
      font-size: 0.8rem;
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
                <LableTitle style={{ margin: 0 }}>{f.title}</LableTitle>
                <div className="form__group ">
                  <MyInput id={f.id} type={'input'} placeholder={f.placeHolder} formik={formik} />
                </div>
                <p>{f.panel}</p>
              </TextInput>
            )
          } else if (f.type === Type.InputDropdown) {
            return (
              <TextInput key={index}>
                <LableTitle style={{ margin: 0 }}>{f.title}</LableTitle>
                <div className="form__group ">
                  <MyInput id={f.id} type={'input'} placeholder={f.placeHolder} formik={formik} />
                  <StableSelect option={f.option} />
                </div>
                <p>{f.panel}</p>
              </TextInput>
            )
          } else if (f.type === Type.Dropdown) {
            return (
              <TextInput style={{ width: '50%' }}>
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
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Around style={{ width: '516px' }}>
        <h3 onClick={() => history.goBack()}>{FeatherIcon(icons)}</h3>
        <h1>Create {CreateType()} collectible</h1>
        <LableTitle>UploadFile</LableTitle>
        <UploadFile />
        <Categories />
        <div style={{ marginTop: 40 }}>
          <LableTitle>Put on marketplace</LableTitle>
          <div style={{ marginBottom: 20 }}>
            {switchType === 1 ? (
              <p>Enter price to allow users instantly purchase your NFT</p>
            ) : switchType === 2 ? (
              <p>Set a period of time for which buyers can place bids</p>
            ) : (
              <p>{`Put your new NFT on Rarible's marketplace`}</p>
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

          {FormInput('infomation')}
          <OptionMintCreate />
        </div>
      </Around>
      <Preview>
        <div className="preview">
          <div className="pr">
            <h4>Preview</h4>
            <div className="content">
              <p hidden={state.file ? true : false}> Upload file to preview your brand new NFT</p>
              <PreviewFile />
            </div>
          </div>
        </div>
      </Preview>
    </div>
  )
}
