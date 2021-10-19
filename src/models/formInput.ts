export interface FormInput {
  location?: string
  row?: number[]
  control?: FormDetail[]
}

export interface FormDetail {
  title?: string
  titleSmall?: string
  type?: Type
  panel?: string
  panel1?: string
  id: string
  idDropdown?: string
  placeHolder?: string
  required?: boolean
  multiple?: boolean
  option?: any[]
  row: number
  width?: string
}

export enum Type {
  Input = 1,
  InputDropdown,
  InputPercent,
  Dropdown,
  InputNumber,
}
export interface Option {
  name?: string
  icon?: any
  id?: string
}
