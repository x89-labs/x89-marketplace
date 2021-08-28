import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import * as Icon from 'react-feather'
import * as Asset from '../../assets'
import styled from 'styled-components'
import { useIsDarkMode } from 'state/user/hooks'
import ReactPlayer from 'react-player'
import { useMintState } from 'state/mint/hooks'
import { Color, Outline, Typography } from 'styles'
import { Forms, validationFormCreateSchema } from '../../state/mint/config'
import { Type } from 'models/formInput'
import { useDispatch } from 'react-redux'
import { getIn, useFormik } from 'formik'
import { BodyItem } from 'models/bodyItem'
import { actBtnAdvanced, getCategories, postItem } from 'state/mint/actions'
import { useActiveWeb3React } from 'hooks/web3'
import { Ipfs } from 'hooks/ipfs'
import Switch from 'react-switch'
import { POLRARE_ADDRESS } from 'constants/addresses'
import Categories from 'components/Mint/categories'
import UploadFile from 'components/Mint/UploadFile'
import StableSelect from 'components/Mint/selectTable'
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

enum SwitchType {
  FixedPrice = 1,
  UnlimitedAuction,
}

export const Multiple = ({ history }: RouteComponentProps) => {
  const state = useMintState()
  const [switchType, setSwitchType] = useState<SwitchType>()
  const [checked, setChecked] = useState(true)

  const dispatch = useDispatch()
  const { account } = useActiveWeb3React()

  const formik = useFormik({
    initialValues: state.initValues,
    validationSchema: validationFormCreateSchema,
    onSubmit: (values) => {
      if (state.file) {
        const file = state.file
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = async () => {
          Ipfs.GetHash(reader.result)
            .then((hash) => {
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
                  totalQuantity: values.totalQuantity,
                  createdBy: account!,
                  type: state.fileType,
                  categoryName: state.categorie.categoryName,
                }

                dispatch(postItem(body))
              }
            })
            .catch((e) => {
              console.log(e.message)
            })
        }
      }
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
  const Around = styled.div`
    .labelUpload {
      color: ${({ theme }) => theme.text5};
    }
    .unlockOncePurchased {
      color: linear-gradient(to right, blue, pink);
    }
  `
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  `
  const Text = styled.p`
    ${{ ...Typography.fontSize.x20 }}
    color: ${Color.neutral.gray}
    margin: 4px 0;
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
      @media only screen and (max-width: 700px) {
        width: 160px;
      }
    }

    .image {
      width: 40px;
      height: 40px;
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
  const Title = styled.p`
    ${{ ...Typography.header.x30 }}
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
  const UnlockPurchased = styled.div`
    display: flex;
  `
  const UnlockTitle = styled.h2`
    background-color: #ca4246;
    width: 18rem;
    margin: 0;
    background-image: linear-gradient(
      145deg,
      rgb(12, 80, 255) 0%,
      rgb(12, 80, 255) 13%,
      rgb(91, 157, 255) 25.73%,
      rgb(255, 116, 241) 75%,
      rgb(255, 116, 241) 100%
    );
    background-size: 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `
  const ErrorMessage = styled.div`
    color: red;
    font-weight: 700;
    font-size: 0.8rem;
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
  const ShowBtnAdvanced = () => {
    dispatch(actBtnAdvanced())
  }
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
                    defaultValue={getIn(formik.values, f.id)}
                  />
                </div>
                <ErrorMessage>{errorMessage(f.id)}</ErrorMessage>

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
                    defaultValue={getIn(formik.values, f.id)}
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

  return (
    <Container>
      <Around>
        <Title onClick={() => history.goBack()}>{FeatherIcon(icons)}</Title>
        <h1 style={{ textAlign: 'center' }}>Create {CreateType()} collectible</h1>
        <Title>Upload File</Title>
        <div style={{ paddingRight: 14 }}>
          <UploadFile />
        </div>
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
    </Container>
  )
}
