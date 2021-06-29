import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { FormGroup, Label, Input } from 'reactstrap'
import * as Icon from 'react-feather'
import * as Asset from '../../assets'
import styled from 'styled-components'
import { useIsDarkMode } from 'state/user/hooks'
import UploadFile from 'components/UploadFile'
import ReactPlayer from 'react-player'
import { useMintState } from 'state/mint/hooks'
import OptionMintCreate from 'components/OptionMintCreate'
import { TableSelection } from 'components/TableSelection'

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
      width: 90%;
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
    input::placeholder {
      color: #fff;
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
  const optionsToken = [
    {
      name: 'USDS',
      icon: <img src={Asset.SrcUSDC} width={20} height={20} />,
      id: '1',
    },
    {
      name: 'ETH',
      icon: <img src={Asset.SrcETH} width={20} height={20} />,
      id: '2',
    },
    {
      name: 'BTC',
      icon: <img src={Asset.SrcETH} width={20} height={20} />,
      id: '3',
    },
  ]

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
            {switchType === SwitchType.FixedPrice && (
              <TextInput>
                <h3 style={{ margin: 0 }}>Price</h3>
                <div className="form__group ">
                  <input type="input" placeholder="Enter price for one piece ..." name="name" id="name" />
                  <TableSelection option={optionsToken} />
                </div>
                <p>Service fee 2.5%</p>
                <p>You will receive 0 ETH0</p>
              </TextInput>
            )}
          </div>
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
