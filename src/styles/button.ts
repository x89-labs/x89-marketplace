import { CSSProperties } from 'styled-components'
import { Color, Outline, Sizing } from 'styles'

import * as Colors from './color'
import * as Typography from './typography'

type Button = 'primary' | 'secondary'
export const btn: Record<Button, CSSProperties> = {
  primary: {
    display: 'flex',
    background: Colors.linearGradient.button,
    borderRadius: Outline.borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    ...Typography.fontSize.x30,
    ...Typography.fontWeight.semibold,
    color: Colors.neutral.white,
    padding: 8,
    cursor: 'pointer',
  },
  secondary: {
    textAlign: 'center',
    background: `linear-gradient(#fff, #fff) padding-box, ${Color.linearGradient.button} border-box`,
    color: Color.neutral.green,
    ...Typography.fontSize.x30,
    ...Typography.fontWeight.semibold,
    padding: 8,
    border: `2.5px solid transparent`,
    borderRadius: Outline.borderRadius.base,
    display: `inline-block`,
    cursor: 'pointer',
  },
}
