import { CSSProperties } from 'styled-components'
import { Outline, Sizing } from 'styles'

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
    padding: `${Sizing.x15}px 0`,
    cursor: 'pointer',
  },
  secondary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: Colors.neutral.white,
    borderRadius: Outline.borderRadius.base,
    cursor: 'pointer',
    ...Typography.fontSize.x30,
    ...Typography.fontWeight.bold,
    color: Colors.neutral.green,
  },
}
