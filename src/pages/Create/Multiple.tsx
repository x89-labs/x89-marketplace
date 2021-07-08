import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import * as Icon from 'react-feather'
import * as Asset from '../../assets'
import styled from 'styled-components'
import { useIsDarkMode } from 'state/user/hooks'
import UploadFile from 'components/UploadFile'
import ReactPlayer from 'react-player'
import { useMintState } from 'state/mint/hooks'
import OptionMintCreate from 'components/OptionMintCreate'
import StableSelect from 'components/StableSelect'
import { Forms } from './config'
import { Type } from 'models/formInput'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { BodyItem } from 'models/bodyItem'
import { contractAddress } from 'client/callSmContract'
import { postItem } from 'state/mint/actions'
import { useActiveWeb3React } from 'hooks/web3'

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

enum SwitchType {
  FixedPrice = 1,
  UnlimitedAuction,
}

export const Multiple = ({ history }: RouteComponentProps) => {
  const state = useMintState()
  const [switchType, setSwitchType] = useState<SwitchType>()
  const dispatch = useDispatch()
  const { account } = useActiveWeb3React()

  const formik = useFormik({
    initialValues: state.initValues,
    // validationSchema:
    onSubmit: (values) => {
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
  }, [])
  const Around = styled.div`
    p {
      color: ${({ theme }) => theme.text5};
      fontweight: 500;
      margin: 6px;
    }

    h3:hover {
      cursor: pointer;
    }

    .labelUpload {
      color: ${({ theme }) => theme.text5};
    }
    .unlockOncePurchased {
      color: linear-gradient(to right, blue, pink);
    }
  `
  const LableTitle = styled.h4`
    font-weight: 700;
    margin: 0;
  `
  const Create = styled.div`
    * {
      display: flex;
      flex-direction: row;
    }

    .create {
      display: flex;
      flex-direction: column;
      width: 140px;
      height: 140px;
      border: 2px solid lightgray;
      border-radius: 16px;
      padding: 0 20px;
      margin: 10px;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .marketplace {
      display: flex;
      flex-direction: column;
      width: 220px;
      height: 140px;
      border: 2px solid lightgray;
      border-radius: 16px;
      padding: 0 20px;
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
      align-items: center;
      text-align: center;
      justify-content: center;
    }

    .unlockContent {
      height: 20px;
      width: 190px;
      padding: 22px 24px;
    }
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

  const FormInput = (location?: string) => {
    return Forms.map((r, i) => {
      if (location === r.location) {
        return r.control?.map((f, index) => {
          if (f.type === Type.Input) {
            return (
              <TextInput key={index}>
                <LableTitle style={{ margin: 0 }}>{f.title}</LableTitle>
                <div className="form__group ">
                  <input
                    id={f.id}
                    type={'input'}
                    placeholder={f.placeHolder}
                    onBlur={(e) => formik.setFieldValue(f.id, e.target.value)}
                  />
                </div>
                <p>{f.panel}</p>
              </TextInput>
            )
          } else if (f.type === Type.InputDropdown) {
            return (
              <TextInput key={index}>
                <LableTitle style={{ margin: 0 }}>{f.title}</LableTitle>
                <div className="form__group ">
                  <input
                    id={f.id}
                    type={'input'}
                    placeholder={f.placeHolder}
                    onBlur={(e) => formik.setFieldValue(f.id, e.target.value)}
                  />
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
  const CreateType = () => {
    return 'multiple'
  }
  const darkMode = useIsDarkMode()

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

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Around style={{ width: '516px' }}>
        <h3 onClick={() => history.goBack()}>{FeatherIcon(icons)}</h3>
        <h1>Create {CreateType()} collectible</h1>
        <h2>Upload file</h2>
        <UploadFile />
        <div>
          <h2>{`Put on marketplace`}</h2>
          <div>
            {switchType === SwitchType.FixedPrice ? (
              <p>{`Enter price to allow users instantly purchase your NFT`}</p>
            ) : (
              <p>{` Allow other users to make bids on your NFT`}</p>
            )}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Create>
                <div>
                  <FixedPrice />
                  <UnlimitedAuction />
                </div>
              </Create>
            </div>
            {switchType === SwitchType.FixedPrice && FormInput('price')}
          </div>
          <OptionMintCreate formik={formik} />
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
