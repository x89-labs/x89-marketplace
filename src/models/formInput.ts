export interface FormInput {
  location?: string
  control?: FormDetail[]
}

export interface FormDetail {
  title?: string
  type?: Type
  panel?: string
  id: string
  idDropdown?: string
  placeHolder?: string
  required?: boolean
  multiple?: boolean
  option?: any[]
}

export enum Type {
  Input = 1,
  InputDropdown,
  Dropdown,
  InputNumber,
}
export interface Option {
  name?: string
  icon?: any
  id?: string
}
