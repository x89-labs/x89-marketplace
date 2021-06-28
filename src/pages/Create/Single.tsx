import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { FormGroup, Label } from 'reactstrap'
import * as Icon from 'react-feather'
import styled from 'styled-components'
import useFilePicker from 'hooks/useFilePicker'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import * as Asset from '../../assets'
import { deleteFile, fileChange } from 'state/mint/actions'
import { useIsDarkMode } from 'state/user/hooks'
import { useMintState } from 'state/mint/hooks'
import { Ipfs } from 'client/ipfs'
import Web3 from 'web3'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { useTokenBalance } from 'state/wallet/hooks'
import { useDerivedStakeInfo, useStakingInfo } from 'state/stake/hooks'
import { useCurrency } from 'hooks/Tokens'
import { useV2Pair } from 'hooks/useV2Pairs'
import { useActiveWeb3React } from 'hooks/web3'
import { Currency } from '@uniswap/sdk-core'
import { TableSelection } from 'components/TableSelection'

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
  const dispatch = useAppDispatch()
  const state = useMintState()
  const darkMode = useIsDarkMode()
  const [switchType, setSwitchType] = useState<SwitchType>()
  const [showBtnAdvanced, setShowBtnAdvanced] = useState(true)

  const [typedValue, setTypedValue] = useState('')
  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  const { account } = useActiveWeb3React()
  const [currencyA, currencyB] = [useCurrency('b123'), useCurrency('c123')]
  const tokenA = (currencyA ?? undefined)?.wrapped
  const tokenB = (currencyB ?? undefined)?.wrapped

  const [, stakingTokenPair] = useV2Pair(tokenA, tokenB)
  const stakingInfo = useStakingInfo(stakingTokenPair)?.[0]
  const userLiquidityUnstaked = useTokenBalance(account ?? undefined, stakingInfo?.stakedAmount?.currency)
  const maxAmountInput = maxAmountSpend(userLiquidityUnstaked)
  const handleMax = useCallback(() => {
    maxAmountInput && onUserInput(maxAmountInput.toExact())
  }, [maxAmountInput, onUserInput])

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

    .form__field {
      font-family: inherit;
      width: 90%;
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
    p {
      margin-top: 10px;
      font-size: 14px;
      line-height: 0.4;
    }
    input {
      background: #f7f2f7;
      width: 100%;
      border: none;
      outline: none;
    }
  `
  const AdvancedSetting = styled.div`
    padding: 10px 0;
    width: 100%;
    margin-top: 4rem;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 3rem;
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
    background-color: #fff;
    color: #000;
  `

  const CreateItem = styled.div`
    display: flex;
    margin-top: 2rem;
    justify-content: space-between;
    align-items: center;
    .createBtn {
      color: #fff;
      padding: 0.8rem 2.5rem;
      border: 1px solid #ccc;
      text-align: center;
      border-radius: 3rem;
      font-size: 1rem;
      cursor: pointer;
      border: 0;
      background-color: #0066ff;
      p {
        font-size: 0.8rem;
        color: rgba(4, 4, 5, 0.5);
      }
    }
  `

  // const currency: Currency = [{ isNative: true, isToken: true }]
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
  const options = [
    {
      name: 'Right after listing',
      id: '1',
    },
    {
      name: 'Pick spicific date',
      id: '2',
    },
  ]
  const [openFileSelector, { plainFiles }] = useFilePicker({
    multiple: false,
    accept: ['.png', '.jpg', '.mp4', '.mov'],
    readAs: 'DataURL',
  })

  // const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545')

  useEffect(() => {
    dispatch(fileChange({ value: plainFiles[0] }))
  }, [plainFiles])

  const onSubmit = () => {
    state.file && Ipfs.add(URL.createObjectURL(state.file))
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

  const CreateCollection = () => {
    return (
      <div className="marketplace" onClick={() => console.log('aa')}>
        <Asset.Plus className="image" fill={darkMode ? '#ffffff' : '#000000'} />
        <h4>Create </h4>
      </div>
    )
  }
  const DecreptionItem = () => {
    return (
      <div className="marketplace" style={{ border: '2px solid rgb(0, 102, 255)' }}>
        <img src={Asset.SrcLogo} className="image" />
        <h4>Unicon </h4>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Around style={{ width: '516px' }}>
        <h3 onClick={() => history.goBack()}>{FeatherIcon(icons)}</h3>
        <h1>Create {CreateType()} collectible</h1>
        <LableTitle>Upload file</LableTitle>
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
              <p
                onClick={() => {
                  onSubmit()
                }}
                style={{ cursor: 'pointer' }}
              >
                Ok
              </p>
            </FormGroup>
          </div>
        </UploadFile>
        <div>
          <LableTitle>Put on marketplace</LableTitle>
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
              <TextInput>
                <LableTitle style={{ margin: 0 }}>Price</LableTitle>
                <div className="form__group ">
                  <input type="input" placeholder="Enter price for one piece ..." name="name" id="name" />
                  {/* <CurrencyInputPanel
                    value={typedValue}
                    onUserInput={onUserInput}
                    // onMax={handleMax}
                    showMaxButton={true}
                    // currency={stakingInfo.stakedAmount.currency}
                    label={''}
                    id="stake-liquidity-token"
                  /> */}
                  <TableSelection option={optionsToken} />
                </div>
                <p>Service fee 2.5%</p>
                <p>You will receive 0 ETH0</p>
              </TextInput>
            )}
            {switchType === SwitchType.TimedAuction && (
              <div>
                <TextInput>
                  <h3 style={{ margin: 0 }}>Minimum bid</h3>
                  <div className="form__group ">
                    <input type="input" placeholder="Enter price for one piece ..." name="name" id="name" />
                    <TableSelection option={optionsToken} />
                  </div>
                  <p>Bids below this amount won’t be allowed.</p>
                </TextInput>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                  <TextInput style={{ width: '50%' }}>
                    <h3 style={{ margin: 0 }}>Starting Date</h3>
                    <div className="form__group ">
                      <TableSelection option={options} width={'100%'} />
                    </div>
                  </TextInput>
                  <TextInput style={{ width: '50%' }}>
                    <h3 style={{ margin: 0 }}>Expiration Date</h3>
                    <div className="form__group ">
                      <TableSelection option={options} width={'100%'} />
                    </div>
                  </TextInput>
                </div>
              </div>
            )}
          </div>
          <div>
            <div>
              <h2 style={{ color: 'blue' }}>Unlock once purchased</h2>
              <p>Content will be unlocked after successful transaction</p>
            </div>
            <LableTitle>Choose collection</LableTitle>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Create>
                <div>
                  <CreateCollection />
                  <DecreptionItem />
                </div>
              </Create>
            </div>
            <TextInput>
              <LableTitle>Title</LableTitle>
              <div className="form__group ">
                <input type="input" placeholder="e.g.Remdemable T-Shirt with logo" />
              </div>
            </TextInput>
            <TextInput>
              <LableTitle>Descreption</LableTitle>
              <div className="form__group ">
                <input type="input" placeholder="e.g.Remdemable T-Shirt with logo" />
              </div>
              <p>With preserved line-breaks</p>
            </TextInput>
            <TextInput>
              <LableTitle>Royalties</LableTitle>
              <div className="form__group ">
                <input type="input" placeholder="Digital key, code to redeem or link to a file ..." />
              </div>
              <p>Suggested: 0%, 10%, 20%, 30%</p>
            </TextInput>
            <AdvancedSetting>Show Advenced Setting</AdvancedSetting>
            <CreateItem>
              <div className="createBtn">Create Item</div>
              <p>Unsaved changes </p>
            </CreateItem>
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
