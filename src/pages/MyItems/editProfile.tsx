import React, { useEffect, useState } from 'react'
import { useActiveWeb3React } from 'hooks/web3'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Color, Outline, Typography, Button } from 'styles'
import useFilePicker from 'hooks/useFilePicker'
import * as Asset from 'assets'
import { EditForm } from 'state/mint/config'
import { fileChange } from 'state/mint/actions'

export default function EditProfile() {
  const dispatch = useDispatch()
  const { account } = useActiveWeb3React()
  const [hidden, setHidden] = useState(false)
  const [openFileSelector, { plainFiles }] = useFilePicker({
    multiple: false,
    accept: ['.png', '.jpg', '.gif', '.svg'],
    readAs: 'DataURL',
  })
  useEffect(() => {
    plainFiles[0] && dispatch(fileChange({ value: plainFiles[0] }))
  }, [plainFiles[0]])

  return (
    <Container>
      <Infomation>
        <div>
          <Header>Edit Profile</Header>
          <Text>
            You can set preferred display name, create your branded profile URL and manage other personal settings
          </Text>
        </div>
        <div>
          {EditForm.map((item, index) => (
            <TextInput key={index}>
              <Title style={{ margin: 0 }}>{item.title}</Title>
              <div className="form__group ">
                <input id={item.id} type={'input'} placeholder={item.placeholder} />
              </div>
              <Description>{item.descreption}</Description>
            </TextInput>
          ))}
        </div>
        <BtnUpdate>Update profile</BtnUpdate>
      </Infomation>
      <Avatar>
        <Title>Avatar</Title>
        {plainFiles[0] ? (
          <Image src={URL.createObjectURL(plainFiles[0])} onClick={() => openFileSelector()} />
        ) : (
          <ChooseFile onClick={() => openFileSelector()}>
            <Asset.Plus width={50} height={50} style={{ padding: 10, borderRadius: '50%', background: '#000' }} />
          </ChooseFile>
        )}
        <Text>We recommend an image of at least 400x400. Gifs work too.</Text>
      </Avatar>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 165px;
  @media only screen and (max-width: 700px) {
    padding: 0;
  }
`
const Avatar = styled.div`
  margin-top: 8rem;
  width: 20%;
`
const Infomation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
`

const Header = styled.div`
  ${{ ...Typography.header.x70 }}
  color: ${({ theme }) => theme.text1}
text-align: center;
`
const Text = styled.p`
  ${{ ...Typography.fontSize.x30 }}
  ${{ ...Typography.fontWeight.bold }}
  margin: 0;
  text-align: center;
  color: ${Color.neutral.gray};
`
const Title = styled.p`
  ${{ ...Typography.header.x30 }}
`
const Description = styled.p`
  ${{ ...Typography.fontSize.x20 }}
  ${{ ...Typography.fontWeight.bold }}
  color: ${Color.neutral.gray};
`
const ChooseFile = styled.div`
  width: 100px;
  height: 100px;
  border-radius: ${Outline.borderRadius.base}px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${Color.neutral.gray2};
`
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
    background: ${({ theme }) => theme.bg2};
    color: ${({ theme }) => theme.text1};
    width: 100%;
    border: none;
    outline: none;
    margin: 4px;
  }
`
const Image = styled.img`
  border-radius: ${Outline.borderRadius.base}px;
  width: 200px;
  height: 200px;
  margin-top: 1rem;
  cursor: pointer;
  @media only screen and (max-width: 700px) {
    width: 70px;
    height: 70px;
  }
`

const BtnUpdate = styled.div`
  ${{ ...Button.btn.primary }}
  width: 100%;
`
