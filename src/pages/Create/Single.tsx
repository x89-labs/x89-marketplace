import React, { useEffect, useMemo, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { FormGroup, Label } from 'reactstrap'
import * as Icon from 'react-feather'
import styled from 'styled-components'
import useFilePicker from 'hooks/useFilePicker'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import * as Asset from '../../assets'
import { deleteFile, fileChange } from 'state/mint/actions'
import { useIsDarkMode } from 'state/user/hooks'
import { AppState } from 'state'
import { MintState } from 'state/mint/reducer'
import { useMintState } from 'state/mint/hooks'
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

const iconImage: ico = {
  icon: <Icon.Image />,
  name: 'Choose File',
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
  const [show, setShow] = useState(true)
  const dispatch = useAppDispatch()
  const state = useMintState()
  const [switchType, setSwitchType] = useState<SwitchType>()

  const Around = styled.div`
    p {
      color: ${({ theme }) => theme.text5};
      fontweight: 500;
      line-height: 0.5;
    }

    h3:hover {
      cursor: pointer;
    }

    .labelUpload {
      color: ${({ theme }) => theme.text5};
    }

    .unlockOncePurchased {
      color: ${({ theme }) => theme.text5};
    }

    .form__group {
      position: relative;
      padding: 15px 0 0;
      width: 50%;
    }

    .form__field {
      font-family: inherit;
      width: 100%;
      border: 0;
      border-bottom: 2px solid gray;
      outline: 0;
      background: transparent;
      transition: border-color 0.2s;

      &::placeholder {
        color: transparent;
      }

      &:placeholder-shown .form__label {
        cursor: text;
        top: 20px;
      }
    }

    .form__field:focus {
      .form__label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-weight: bold;
      }
      padding-bottom: 6px;
      font-weight: bold;
      border-width: 3px;
      border-image: ${({ theme }) => theme.text5};
      border-image-slice: 1;
    }

    .form__field {
      &:required,
      &:invalid {
        box-shadow: none;
      }
    }

    body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #222222;
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
    }

    .unlockContent {
      height: 20px;
      width: 190px;
      padding: 22px 24px;
    }

    p {
      color: ${({ theme }) => theme.text5};
      font-weight: bold;
    }
    .image {
      margin-top: 86px;
      margin-left: 8px;
      width: 90%;
      height: 100px;
      border-radius: 5px;
    }
  `
  const UploadFile = styled.div`
    .UploadFile {
      width: 460px;
      height: auto;
      padding: 32px 60px 32px 60px;
      border: 1px dashed lightgray;
      borderradius: 16px;
      position: relative;
    }
  `
  const CloseBtn = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    position: absolute;
    top: 20px;
    right: 62px;
    border: 1px solid #ccc;
    cursor: pointer;
    .closeBtn {
      margin: 10px;
    }
  `

  const [openFileSelector, { plainFiles }] = useFilePicker({
    multiple: false,
    accept: ['.png', '.jpg', '.mp4', '.mov'],
    readAs: 'DataURL',
  })

  useEffect(() => {
    dispatch(fileChange({ value: plainFiles[0] }))
  }, [plainFiles])

  const CreateType = () => {
    return 'single'
  }
  const darkMode = useIsDarkMode()

  const FixedPrice = () => {
    return (
      <div className="marketplace" onClick={() => setSwitchType(SwitchType.FixedPrice)}>
        <Asset.FixedPrice className="image" fill={darkMode ? '#ffffff' : '#000000'} />
        <h4>Fixed price</h4>
      </div>
    )
  }

  const TimedAuction = () => {
    return (
      <div className="marketplace" onClick={() => setSwitchType(SwitchType.TimedAuction)}>
        <Asset.TimedAuction className="image" fill={darkMode ? '#ffffff' : '#000000'} />
        <h4>Timed auction</h4>
      </div>
    )
  }

  const UnlimitedAuction = () => {
    return (
      <div className="marketplace" onClick={() => setSwitchType(SwitchType.UnlimitedAuction)}>
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
        <UploadFile>
          <div className="UploadFile">
            <FormGroup hidden={state.file ? true : false}>
              <Label className="labelUpload">PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</Label>
              <br />
              <h3 onClick={() => openFileSelector()}>{FeatherIcon(iconImage)}</h3>
            </FormGroup>
            <FormGroup hidden={state.file ? false : true}>
              <CloseBtn
                onClick={() => {
                  dispatch(deleteFile({ value: state.file }))
                }}
              >
                <Asset.Close width={8} height={8} className="closeBtn" fill={darkMode ? '#fff' : '#000'} />
              </CloseBtn>
              {state.file && (
                <img src={URL.createObjectURL(state.file)} width={'90%'} height={240} style={{ borderRadius: 10 }} />
              )}
            </FormGroup>
          </div>
        </UploadFile>
        <div>
          <h2>Put on marketplace</h2>
          <div style={{ marginBottom: 20 }}>
            <p>Enter price to allow users instantly purchase your NFT</p>
            <p>{`Put your new NFT on Rarible's marketplace`}</p>
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
            {switchType === SwitchType.FixedPrice && (
              <div>
                <h3 style={{ margin: 0 }}>Price</h3>
                <div className="form__group field">
                  <input
                    type="input"
                    className="form__field"
                    placeholder="Enter price for one piece ..."
                    name="name"
                    id="name"
                  />
                </div>
                <p>Service fee 2.5%</p>
                <p>You will receive 0 ETH0</p>
              </div>
            )}
            {switchType === SwitchType.TimedAuction && (
              <div>
                <h3 style={{ margin: 0 }}>Minimum bid</h3>
                <div className="form__group field">
                  <input
                    type="input"
                    className="form__field"
                    placeholder="Enter price for one piece ..."
                    name="name"
                    id="name"
                  />
                </div>
                <p>Bids below this amount won’t be allowed.</p>
              </div>
            )}
            {switchType === SwitchType.UnlimitedAuction && (
              <div>
                <h3 style={{ margin: 0 }}>Price</h3>
                <div className="form__group field">
                  <input
                    type="input"
                    className="form__field"
                    placeholder="Enter price for one piece ..."
                    name="name"
                    id="name"
                  />
                </div>
                <p>Service fee 2.5%</p>
                <p>You will receive 0 ETH0</p>
              </div>
            )}
          </div>
          <div>
            <h2 style={{ color: 'blue' }}>Unlock once purchased</h2>
            <p>Content will be unlocked after successful transaction</p>
            <div className="form__group field">
              <input
                type="input"
                className="form__field"
                placeholder="Digital key, code to redeem or link to a file ..."
                name="name"
                id="name"
              />
            </div>
            <p>Tip: Markdown syntax is supported</p>
          </div>
        </div>
      </Around>
      <Preview>
        <div className="preview">
          <div className="pr">
            <h4>Preview</h4>
            <div className="content">
              <p hidden={state.file ? true : false}> Upload file to preview your brand new NFT</p>
              {state.file && <img src={URL.createObjectURL(state.file)} className="image" />}
            </div>
          </div>
        </div>
      </Preview>
    </div>
  )
}
