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
import StableSelect from '../stableSelect'
import StablePrice from '../stablePrice'
import StableDate from '../stableDate'

type OptionMintCreate = {
  formik?: any
  isSingle?: boolean
}
const TextInput = styled.div`
  margin-top: 40px;
  margin-right: 20px;
  .form__group {
    position: relative;
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
const AdvancedSetting = styled.div`
  ${{ ...Outline.border.gray }}
  padding: 10px 0;
  width: 100%;
  margin-top: 2rem;
  text-align: center;
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
const Text = styled.p`
  ${{ ...Typography.fontSize.x20 }}
  color: ${Color.neutral.gray}
  margin: 4px 0;
`

enum SwitchType {
  FixedPrice = 1,
  TimedAuction,
  UnlimitedAuction,
}
export default function OptionMintCreate({ formik, isSingle }: OptionMintCreate) {
  const darkMode = useIsDarkMode()
  const [showBtnAdvanced, setShowBtnAdvanced] = useState(true)
  const [isopen, setOpen] = useState(false)
  const [switchType, setSwitchType] = useState<SwitchType>(SwitchType.FixedPrice)

  const CreateCollection = () => {
    return (
      <div className="marketplace" onClick={() => setOpen(true)}>
        <Asset.Plus className="image" fill={darkMode ? '#ffffff' : '#000000'} />
        <h4>Create </h4>
      </div>
    )
  }
  const Create = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    .marketplace {
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
                    type={'number'}
                    placeholder={f.placeHolder}
                    onBlur={(e) => {
                      e.preventDefault()
                      const { value } = e.target
                      const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/
                      if (regex.test(value.toString())) {
                        formik.setFieldValue(f.id, e.target.value)
                      }
                    }}
                    defaultValue={getIn(formik.values, f.id)}
                  />
                  <StablePrice option={f.option} />
                </div>
                <Text>{f.panel}</Text>
              </TextInput>
            )
          } else if (f.type === Type.Dropdown) {
            return (
              <TextInput style={{ width: '50%' }} key={f.id}>
                <h3 style={{ margin: 0 }}>{f.title}</h3>
                <div className="form__group ">
                  <StableDate option={f.option} width={'100%'} />
                </div>
              </TextInput>
            )
          }
        })
      }
    })
  }

  const errorMessage = (fieldName: string) => {
    const touched = getIn(formik.touched, fieldName)
    const error = getIn(formik.errors, fieldName)
    if (touched && error) {
      return error
    }
    return undefined
  }
  return (
    <div>
      <div style={{ marginTop: 40 }}>
        <Title>Put on marketplace</Title>
        {switchType === 1 ? (
          <Text>Enter price to allow users instantly purchase your NFT</Text>
        ) : switchType === 2 ? (
          <Text>Set a period of time for which buyers can place bids</Text>
        ) : (
          <Text>{`Put your new NFT on Polrare's marketplace`}</Text>
        )}

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Create>
            <FixedPrice />
            {isSingle && <TimedAuction />}
            <UnlimitedAuction />
          </Create>
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
        </UnlockPurchased>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Create>
            <CreateCollection />
          </Create>
        </div>
        {FormInput('infomation')}
      </div>
      <AdvancedSetting onClick={() => setShowBtnAdvanced(!showBtnAdvanced)}>
        {showBtnAdvanced == true ? 'Show Advenced Setting' : 'Hide Advenced Setting'}
      </AdvancedSetting>
      <div hidden={showBtnAdvanced}>
        <TextInput>
          <Title>Properties</Title>
          <div style={{ display: 'flex' }}>
            <div className="form__group " style={{ marginRight: 10 }}>
              <input type="input" placeholder="e.g. Size" />
            </div>
            <div className="form__group ">
              <input type="input" placeholder="e.g.M" />
            </div>
          </div>
        </TextInput>
      </div>
      <CreateItem>
        <CreateBtn
          onClick={() => {
            formik.handleSubmit()
          }}
        >
          Mint
        </CreateBtn>
        <p>Unsaved changes </p>
      </CreateItem>
      <Modal isOpen={isopen} onDismiss={() => setOpen(false)}>
        <CreateForm />
      </Modal>
    </div>
  )
}
