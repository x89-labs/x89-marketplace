import styled from 'styled-components'
import React, { useState } from 'react'
import * as Asset from 'assets'
import { useIsDarkMode } from 'state/user/hooks'
import Modal from 'components/Modal'
import CreateForm from './createForm'
import { Button, Color, Outline, Sizing, Typography } from 'styles'
import { Forms } from 'state/mint/config'
import { Type } from 'models/formInput'
import { getIn } from 'formik'
import StablePrice from '../stablePrice'
import Logo from '../../../assets/images/favicon.png'
import SelectTableDate from '../selectTableDate'
import ic_questionmark from '../../../assets/svg/ic_questionmark.svg'
import Switch from '../../Switch'
type OptionMintCreate = {
  formik?: any
  isSingle?: boolean
  showBtnAdvanced?: boolean
  actShowBtnAdvanced: () => void
}

const TextInput = styled.div`
  margin-top: 40px;
  margin-right: 14px;
  .form__group {
    position: relative;
    margin-top: 10px;
    background: ${({ theme }) => theme.bg1};
    height: 48px;
    display: flex;
    flex-direction: row;
    border: 1px solid ${Color.neutral.gray};
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
const AdvancedSetting = styled.div`
  ${{ ...Outline.border.gray }}
  padding: 10px 0;
  margin-right: 14px;
  width: auto;
  margin-top: 2rem;
  text-align: center;
  border: 1px solid ${Color.neutral.gray};
  border-radius: 3rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  background: ${({ theme }) => theme.bg5};
  color: ${({ theme }) => theme.text1};
`
const CreateBtn = styled.div`
  ${{ ...Button.btn.primary }};
  width: 240px;
  height: 48px;
  text-align: center;
`
const CreateItem = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-right: 14px;
  justify-content: space-between;
`

const ErrorMessage = styled.div`
  color: red;
  ${{ ...Typography.fontSize.x20 }}
  ${{ ...Typography.fontWeight.bold }}
`
const UnlockPurchased = styled.div`
  margin-top: 16px;
  display: flex;
`
const UnlockTitle = styled.h2`
  ${{ ...Typography.fontSize.x50 }}
  width: 18rem;
  margin: 0;
  background: ${Color.linearGradient.button};
  background-size: 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const Title = styled.p`
  ${{ ...Typography.header.x30 }}
`
const TitleSmall = styled.span`
  color: ${Color.neutral.gray};
  ${{ ...Typography.header.x20 }}
  font-weight: 500;
`

const Unsaved = styled.span`
  ${{ ...Typography.fontSize.x30 }}
  color: ${Color.neutral.gray}
`

const Text = styled.p`
  ${{ ...Typography.fontSize.x20 }}
  color: ${Color.neutral.gray}
  margin: 4px 0;
`

const Percent = styled.span`
  ${{ ...Typography.fontSize.x20 }}
  color: ${Color.neutral.gray}
  width: 13px;
  height: 20px;
  margin-right: 10px;
  margin-top: 15px;
`

enum SwitchType {
  FixedPrice = 1,
  TimedAuction,
  UnlimitedAuction,
}
export default function OptionMintCreate({ formik, isSingle, showBtnAdvanced, actShowBtnAdvanced }: OptionMintCreate) {
  const darkMode = useIsDarkMode()
  //const [showBtnAdvanced, setShowBtnAdvanced] = useState(true)
  const [isopen, setOpen] = useState(false)
  const [SwitchOn, setSwitchOn] = useState(true)
  const [switchType, setSwitchType] = useState<SwitchType>(SwitchType.FixedPrice)

  const CreateCollection = () => {
    return (
      <div className="marketplace" onClick={() => setOpen(true)}>
        <Asset.Plus className="image" fill={darkMode ? '#ffffff' : '#000000'} />
        <h4 style={{ marginBottom: 0 }}>Create </h4>
      </div>
    )
  }
  const PolrareCollection = () => {
    return (
      <div className="marketplacePolrare">
        <img width={'40px'} src={darkMode ? Logo : Logo} alt="logo" />
        <h4 style={{ marginBottom: 0 }}>Polrare </h4>
      </div>
    )
  }
  const Create = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    .marketplacePolrare {
      border: 2px solid transparent
      border-radius: 15px;
      display: inline-block;
      background: ${darkMode ? Color.linearGradient.black : `linear-gradient(#fff,#fff)`} padding-box,
        ${Color.linearGradient.button} border-box;
      position: relative;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      width: 200px;
      height: 140px;
      margin-right: 14px;
      border-radius: 16px;
      justify-content: center;
      align-items: center;
      @media only screen and (max-width: 700px) {
        width: 100%;
        ${{ ...Typography.fontSize.x20 }}
        text-align: center;
      }
    }    
    .marketplace {
      border: 2px solid lightgray;
      border-radius: 15px;
      display: inline-block;
      background: ${darkMode ? Color.linearGradient.black : `linear-gradient(#fff,#fff)`} padding-box,
        ${Color.linearGradient.button} border-box;
      position: relative;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      width: 200px;
      height: 140px;
      margin-right: 14px;
      border-radius: 16px;
      justify-content: center;
      align-items: center;
      @media only screen and (max-width: 700px) {
        width: 100%;
        ${{ ...Typography.fontSize.x20 }}
        text-align: center;
      }
    }

    .image {
      width: 40px;
      height: 40px;
    }
  `
  const FixedPrice = () => {
    return (
      <div
        className="marketplace"
        onClick={() => setSwitchType(SwitchType.FixedPrice)}
        style={{
          border: switchType === SwitchType.FixedPrice ? '2px solid transparent' : '2px solid lightgray',
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
          border: switchType === SwitchType.TimedAuction ? '2px solid transparent' : '2px solid lightgray',
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
          border: switchType === SwitchType.UnlimitedAuction ? '2px solid transparent' : '2px solid lightgray',
        }}
      >
        <Asset.UnlimitedAuction className="image" fill={darkMode ? '#ffffff' : '#000000'} />
        <h4>{isSingle ? `Unlimited auction` : 'Open for bids'}</h4>
      </div>
    )
  }

  const FormInput = (location?: string) => {
    const controls: any = []
    Forms.map((f, i) => {
      if (location === f.location) {
        const rows = f.row
        rows?.map((r, rindex) => {
          const controlsInRow = f.control?.filter((o) => o.row == r)
          if (controlsInRow) {
            const divControl: any = []
            controlsInRow.map((c, cindex) => {
              let control = <></>
              if (c.type === Type.Input) {
                control = (
                  <TextInput key={cindex} style={{ width: c.width }}>
                    <Title style={{ margin: 0, height: 18.67 }}>
                      {c.title}
                      <TitleSmall>{c.titleSmall}</TitleSmall>
                    </Title>
                    <div className="form__group ">
                      <input
                        id={c.id}
                        type={'input'}
                        placeholder={c.placeHolder}
                        onBlur={(e) => formik.setFieldValue(c.id, e.target.value)}
                        defaultValue={getIn(formik.values, c.id)}
                      />
                    </div>
                    <ErrorMessage>{errorMessage(c.id)}</ErrorMessage>
                    <Text>{c.panel}</Text>
                  </TextInput>
                )
              } else if (c.type === Type.InputDropdown) {
                control = (
                  <TextInput key={cindex}>
                    <Title style={{ margin: 0 }}>{c.title}</Title>
                    <div className="form__group ">
                      <input
                        id={c.id}
                        type={'number'}
                        min="0"
                        placeholder={c.placeHolder}
                        onBlur={(e) => {
                          e.preventDefault()
                          const { value } = e.target
                          const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/
                          if (regex.test(value.toString())) {
                            formik.setFieldValue(c.id, e.target.value)
                          }
                        }}
                        defaultValue={getIn(formik.values, c.id)}
                      />
                      <StablePrice option={c.option} />
                    </div>
                    <Text>{c.panel}</Text>
                    <Text>{c.panel1}</Text>
                  </TextInput>
                )
              } else if (c.type === Type.Dropdown) {
                control = (
                  <TextInput style={{ width: '50%' }} key={c.id}>
                    <h3 style={{ margin: 0 }}>{c.title}</h3>
                    <div className="form__group ">
                      <SelectTableDate option={c.option} width={'100%'} />
                    </div>
                  </TextInput>
                )
              } else if (c.type === Type.InputPercent) {
                control = (
                  <TextInput key={cindex}>
                    <Title style={{ margin: 0 }}>{c.title}</Title>
                    <div className="form__group ">
                      <input
                        id={c.id}
                        type={'number'}
                        min="0"
                        placeholder={c.placeHolder}
                        onBlur={(e) => {
                          e.preventDefault()
                          const { value } = e.target
                          const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/
                          if (regex.test(value.toString())) {
                            formik.setFieldValue(c.id, e.target.value)
                          }
                        }}
                        defaultValue={getIn(formik.values, c.id)}
                      />
                      <Percent>%</Percent>
                    </div>
                    <Text>{c.panel}</Text>
                    <Text>{c.panel1}</Text>
                  </TextInput>
                )
              }
              divControl.push(control)
            })
            if (controlsInRow.length > 1) {
              controls.push(<div style={{ display: 'flex' }}>{divControl}</div>)
            } else {
              controls.push(divControl)
            }
          }
        })
      }
    })
    return controls
  }

  const errorMessage = (fieldName: string) => {
    const touched = getIn(formik.touched, fieldName)
    const error = getIn(formik.errors, fieldName)
    if (touched && error) {
      return error
    }
    return undefined
  }

  const onChangeSwitch = () => {
    setSwitchOn(!SwitchOn)
  }
  return (
    <div>
      <div style={{ marginTop: 40 }}>
        <Title>Put on marketplace</Title>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Create>
            <FixedPrice />
            {isSingle && <TimedAuction />}
            <UnlimitedAuction />
          </Create>
        </div>
        <br />
        {switchType === 1 ? (
          <Text>Enter price to allow users instantly purchase your NFT</Text>
        ) : switchType === 2 ? (
          <Text>Set a period of time for which buyers can place bids</Text>
        ) : (
          <Text>{`Put your new NFT on Polrare's marketplace`}</Text>
        )}

        <div>
          {switchType === SwitchType.FixedPrice && FormInput('price')}
          {switchType === SwitchType.TimedAuction && FormInput('bids')}
        </div>

        <UnlockPurchased>
          <div>
            <div style={{ display: 'flex', width: '100%' }}>
              <UnlockTitle>Unlock once purchased</UnlockTitle>
              <Switch value={SwitchOn} onChange={onChangeSwitch} />
            </div>
            <Text>Content will be unlocked after successful transaction</Text>
          </div>
        </UnlockPurchased>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Create>
            <CreateCollection />
            <PolrareCollection />
          </Create>
        </div>
        {FormInput('infomation')}
      </div>
      {/* <AdvancedSetting onClick={() => setShowBtnAdvanced(!showBtnAdvanced)}> */}
      <AdvancedSetting onClick={() => actShowBtnAdvanced()}>
        {showBtnAdvanced == true ? 'Show Advenced Setting' : 'Hide Advenced Setting'}
      </AdvancedSetting>
      <div hidden={showBtnAdvanced}>{FormInput('advance')}</div>
      <CreateItem>
        <CreateBtn
          onClick={() => {
            formik.handleSubmit()
          }}
        >
          Mint
        </CreateBtn>
        <p>
          <img src={ic_questionmark} />
          <Unsaved> Unsaved changes</Unsaved>
        </p>
      </CreateItem>
      <Modal isOpen={isopen} onDismiss={() => setOpen(false)}>
        <CreateForm />
      </Modal>
    </div>
  )
}
