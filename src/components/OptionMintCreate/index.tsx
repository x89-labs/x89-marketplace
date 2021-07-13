import styled from 'styled-components'
import React, { useState } from 'react'
import * as Asset from 'assets'
import { useIsDarkMode } from 'state/user/hooks'
import { useDispatch } from 'react-redux'
import { postItem } from 'state/mint/actions'
import { useMintState } from 'state/mint/hooks'
import { BodyItem } from 'models/bodyItem'
import Modal from 'components/Modal'
import CreateForm from './createForm'
import { NavLink } from 'react-router-dom'

type OptionMintCreate = {
  formik?: any
}
const LableTitle = styled.h4`
  font-weight: 700;
  margin: 0;
`
const TextInput = styled.div`
  margin-top: 40px;
  margin-right: 20px;
  .form__group {
    margin-top: 10px;
    width: 100%;
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
    color: #060a10;
    font-weight: 700;
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
  margin-top: 2rem;
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
    margin: 10px 0;
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
const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})``
export default function OptionMintCreate({ formik }: OptionMintCreate) {
  const darkMode = useIsDarkMode()
  const [showBtnAdvanced, setShowBtnAdvanced] = useState(true)
  const [isopen, setOpen] = useState(false)
  const state = useMintState()

  const CreateCollection = () => {
    return (
      <div className="marketplace" onClick={() => setOpen(true)}>
        <Asset.Plus className="image" fill={darkMode ? '#ffffff' : '#000000'} />
        <h4>Create </h4>
      </div>
    )
  }

  return (
    <div>
      <LableTitle>Choose collection</LableTitle>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Create>
          <CreateCollection />
        </Create>
      </div>
      <AdvancedSetting onClick={() => setShowBtnAdvanced(!showBtnAdvanced)}>
        {showBtnAdvanced == true ? 'Show Advenced Setting' : 'Hide Advenced Setting'}
      </AdvancedSetting>
      <div hidden={showBtnAdvanced}>
        <TextInput>
          <LableTitle>Properties</LableTitle>
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
        <StyledNavLink
          id={`stats-nav-link`}
          to={'/myitem'}
          className="createBtn"
          onClick={() => {
            formik.handleSubmit()
          }}
        >
          Create Item
        </StyledNavLink>
        <p>Unsaved changes </p>
      </CreateItem>
      <Modal isOpen={isopen} onDismiss={() => setOpen(false)}>
        <CreateForm />
      </Modal>
    </div>
  )
}
