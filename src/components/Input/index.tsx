import React, { memo, useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fieldChange } from 'state/mint/actions'
import { useMintState } from 'state/mint/hooks'

type Input = {
  id?: string
  type?: string
  placeholder?: string
  onChange?: (e: any) => void
  formik?: any
}

const MyInput = ({ id, type, placeholder, onChange, formik }: Input) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const state = useMintState()
  const handleOnChange = useCallback((fieldName: string, fieldValue: string) => {
    // formik.setFieldValue(fieldName, fieldValue)
    dispatch(fieldChange({ fieldName: fieldName, fieldValue: fieldValue }))
  }, [])
  console.log(state.name)
  return useMemo(() => {
    // The rest of your rendering logic
    return (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          if (e.target.value && e.target.value !== '') {
            handleOnChange(id!, e.target.value)
          }
        }}
      />
    )
  }, [])
}

export default MyInput
