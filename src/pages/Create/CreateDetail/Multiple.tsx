import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { FormGroup, Label, Input } from 'reactstrap'
import * as Icon from 'react-feather'
import styled from 'styled-components'
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
export const Multiple = ({ history }: RouteComponentProps) => {
  const Around = styled.div`
    p {
      color: rgba(4, 4, 5, 0.5);
      fontweight: 500;
    }

    h3:hover {
      cursor: pointer;
    }

    .labelUpload {
      color: rgba(4, 4, 5, 0.5);
    }
    .unlockOncePurchased {
      color: linear-gradient(to right, blue, pink);
    }

    .form__group {
      position: relative;
      padding: 15px 0 0;
      margin-top: 10px;
      width: 50%;
    }
    .form__field {
      font-family: inherit;
      width: 100%;
      border: 0;
      border-bottom: 2px solid gray;
      outline: 0;
      padding: 7px 0;
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
      border-image: linear-gradient(to right, #11998e, #38ef7d);
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
      border: 1px solid rgba(4, 4, 5, 0.1);
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

    p {
      color: rgba(4, 4, 5, 0.5);
      font-weight: bold;
    }
  `

  const CreateType = () => {
    return 'multiple'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Around style={{ width: '516px' }}>
        <h3 onClick={() => history.goBack()}>{FeatherIcon(icons)}</h3>
        <h1>Create {CreateType()} collectible</h1>
        <h2>Upload file</h2>
        <div
          style={{
            width: '460px',
            height: '140px',
            padding: '32px 60px 32px 60px',
            border: '1px dashed lightgray',
            borderRadius: '16px',
          }}
        >
          <FormGroup>
            <Label className="labelUpload">{`PNG, GIF, WEBP, MP4 or MP3. Max 100mb.`}</Label>
            <br />
            <Input type="file" name="file" />
          </FormGroup>
        </div>
        <div>
          <h2>{`Put on marketplace`}</h2>
          <div>
            <p>{`Enter price to allow users instantly purchase your NFT`}</p>
            <p>{`Put your new NFT on Rarible's marketplace`}</p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Create>
                <div>
                  <div className="create">
                    <img
                      className="image"
                      src="https://rarible.com/static/a1ad72f9c7e601882faf9d4ce2ae275f.svg"
                      alt="img"
                    />
                    <h4>Fixed price</h4>
                  </div>
                  <div className="create">
                    <img src="https://rarible.com/static/3964cd18f98b562e56c6c74062686822.svg" alt="img" />
                    <h4>Timed auction</h4>
                  </div>
                  <div className="create">
                    <img
                      className="image"
                      src="https://rarible.com/static/d392e670a870dc4ef09d4f1ed08d6abd.svg"
                      alt="img"
                    />
                    <h4>Unlimited auction</h4>
                  </div>
                </div>
              </Create>
            </div>
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
              <p> Upload file to preview your brand new NFT</p>
            </div>
          </div>
        </div>
      </Preview>
    </div>
  )
}
