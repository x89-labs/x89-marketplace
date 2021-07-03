import useFilePicker from 'hooks/useFilePicker'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FormGroup, Label } from 'reactstrap'
import { useAppDispatch } from 'state/hooks'
import { deleteFile, fileChange } from 'state/mint/actions'
import { useMintState } from 'state/mint/hooks'
import styled from 'styled-components'
import * as Asset from 'assets'
import { useIsDarkMode } from 'state/user/hooks'
import { Ipfs } from 'client/ipfs'
import ReactPlayer from 'react-player'

const Around = styled.div`
  margin-top: 10px;
  width: 460px;
  height: auto;
  padding: 32px 60px 32px 60px;
  border: 1px dashed lightgray;
  borderradius: 16px;
  position: relative;
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
const ChooseFile = styled.div`
  cursor: pointer;
  margin-top: 16px;
  margin-left: 100px;
  text-align: center;
  width: 8rem;
  font-weight: bold;
  padding: 12px;
  border-radius: 40px;
  color: rgba(0, 102, 255, 0.9);
  background: rgba(0, 102, 255, 0.2);
`

export default function UploadFile() {
  const state = useMintState()
  const dispatch = useAppDispatch()
  const darkMode = useIsDarkMode()
  const [openFileSelector, { plainFiles }] = useFilePicker({
    multiple: false,
    accept: ['.png', '.jpg', '.mp4', '.mov'],
    readAs: 'DataURL',
  })

  useEffect(() => {
    plainFiles[0] && dispatch(fileChange({ value: plainFiles[0] }))
  }, [plainFiles[0]])

  const PreviewFile = () => {
    if (state.file) {
      if (state.file.type.includes('image')) {
        return <img src={URL.createObjectURL(state.file)} width={'90%'} height={240} style={{ borderRadius: 10 }}></img>
      } else {
        return (
          <ReactPlayer
            url={URL.createObjectURL(state.file)}
            playing={false}
            muted={true}
            controls={true}
            width={'90%'}
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
        <ChooseFile onClick={() => openFileSelector()}>Choose File</ChooseFile>
      </FormGroup>
      <FormGroup hidden={state.file ? false : true}>
        <CloseBtn
          onClick={() => {
            state.file && dispatch(deleteFile({ value: state.file }))
          }}
        >
          <Asset.Close width={8} height={8} className="closeBtn" fill={darkMode ? '#fff' : '#000'} />
        </CloseBtn>
        <PreviewFile />
        {/* <p
          onClick={() => {
            state.file && Ipfs.add(URL.createObjectURL(state.file))
          }}
          style={{ cursor: 'pointer' }}
        >
          Ok
        </p> */}
      </FormGroup>
    </Around>
  )
}
