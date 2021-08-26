import React, { useCallback } from 'react'
import styled from 'styled-components/macro'

const SwitchStyle = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #6324ed;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #6324ed;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`
const Checkbox = styled.input``

interface InputSwitchProps {
  value: boolean
  onChange: (value: boolean) => void
}

export default function Switch({ value, onChange }: InputSwitchProps) {
  const changeCallback = useCallback(
    (e) => {
      if (onChange) {
        onChange(e.target.value)
      }
    },
    [onChange]
  )

  return (
    <SwitchStyle>
      <Checkbox type="checkbox" onChange={changeCallback} checked={value} />
      <span className="slider round"></span>
    </SwitchStyle>
  )
}
