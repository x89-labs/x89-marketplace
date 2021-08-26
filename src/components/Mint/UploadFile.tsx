import useFilePicker from 'hooks/useFilePicker'
import React, { useEffect } from 'react'
import { FormGroup, Label } from 'reactstrap'
import { useAppDispatch } from 'state/hooks'
import { deleteFile, fieldChange, fileChange } from 'state/mint/actions'
import { useMintState } from 'state/mint/hooks'
import styled from 'styled-components'
import * as Asset from 'assets'
import { useIsDarkMode } from 'state/user/hooks'
import ReactPlayer from 'react-player'
import { Color } from 'styles'

const Around = styled.div`
  margin-top: 10px;
  width: 628px;
  height: auto;
  border: 1px dashed ${Color.neutral.gray};
  display: flex;
  justify-content: center;
  padding: 30px 0;
  border-radius: 16px;
  position: relative;
  background: ${({ theme }) => theme.bg3};
  @media only screen and (max-width: 700px) {
    width: 100%;
  }
`
const CloseBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  position: absolute;
  padding: 4px 3px;
  top: 20px;
  right: 39px;
  border: 1px solid ${Color.neutral.gray};
  cursor: pointer;
  .closeBtn {
    margin: 10px;
  }
  @media only screen and (max-width: 700px) {
    right: 14px;
    top: 10px;
  }
`
const ChooseFile = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin: 14px auto;
  display: flex;
  padding: 20px;
  border: 1px solid ${Color.neutral.gray};
  background: ${({ theme }) => theme.bg2};
  cursor: pointer;
`

export default function UploadFile() {
  const state = useMintState()
  const dispatch = useAppDispatch()
  const darkMode = useIsDarkMode()
  const [openFileSelector, { plainFiles }] = useFilePicker({
    multiple: false,
    accept: ['.png', '.jpg', '.mp4', '.mov', '.gif', '.svg'],
    readAs: 'DataURL',
  })

  useEffect(() => {
    plainFiles[0] && dispatch(fileChange({ value: plainFiles[0] }))
    plainFiles[0] && dispatch(fieldChange({ fieldName: 'fileType', fieldValue: plainFiles[0].type }))
  }, [plainFiles[0]])

  const PreviewFile = () => {
    if (state.file) {
      if (state.file.type.includes('image')) {
        return <img src={URL.createObjectURL(state.file)} width={'70%'} height={240} style={{ borderRadius: 10 }}></img>
      } else {
        return (
          <ReactPlayer
            url={URL.createObjectURL(state.file)}
            playing={false}
            muted={true}
            controls={true}
            width={'70%'}
            height={'auto'}
          />
        )
      }
    } else return <></>
  }

  return (
    <Around>
      <FormGroup hidden={state.file ? true : false}>
        <Label className="labelUpload">PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</Label>
        <br />
        <ChooseFile onClick={() => openFileSelector()}>
          <Asset.Plus width={20} height={20} />
        </ChooseFile>
      </FormGroup>
      <FormGroup hidden={state.file ? false : true}>
        <CloseBtn
          onClick={() => {
            state.file && dispatch(deleteFile({ value: state.file }))
          }}
        >
          <Asset.Close width={12} height={12} className="closeBtn" fill={darkMode ? '#fff' : '#000'} />
        </CloseBtn>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PreviewFile />
        </div>
      </FormGroup>
    </Around>
  )
}
