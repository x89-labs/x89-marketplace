import { CSSProperties } from 'styled-components'
import { Color } from 'styles'

type BorderRadius = 'small' | 'base' | 'large' | 'max'
export const borderRadius: Record<BorderRadius, number> = {
  small: 5,
  base: 10,
  large: 30,
  max: 9999,
}

type Border = 'gray' | 'transparent' | 'purple' | 'white'
export const border: Record<Border, CSSProperties> = {
  gray: {
    border: '1px solid #f0f0f0',
  },
  transparent: {
    border: '1px solid transparent',
  },
  purple: {
    border: '1px solid #280e5f',
  },
  white: {
    border: `1px solid ${Color.neutral.white}`,
  },
}
type BorderWidth = 'thin' | 'base' | 'thick'
export const borderWidth: Record<BorderWidth, number> = {
  thin: 1,
  base: 2,
  thick: 3,
}
