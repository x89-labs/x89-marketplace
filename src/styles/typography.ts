import { CSSProperties } from 'styled-components'
import { Color } from 'styles'

type FontSize = 'x10' | 'x20' | 'x30' | 'x40' | 'x50' | 'x60' | 'x70'
export const fontSize: Record<FontSize, CSSProperties> = {
  x10: {
    fontSize: 12,
  },
  x20: {
    fontSize: 14,
  },
  x30: {
    fontSize: 16,
  },
  x40: {
    fontSize: 19,
  },
  x50: {
    fontSize: 24,
  },
  x60: {
    fontSize: 32,
  },
  x70: {
    fontSize: 40,
  },
}

type FontWeight = 'regular' | 'semibold' | 'bold'
export const fontWeight: Record<FontWeight, CSSProperties> = {
  regular: {
    fontWeight: 400,
  },
  semibold: {
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bolder',
  },
}

type LetterSpacing = 'x30' | 'x40'
export const letterSpacing: Record<LetterSpacing, number> = {
  x30: 2,
  x40: 3,
}

type LineHeight = 'x10' | 'x20' | 'x30' | 'x40' | 'x50' | 'x60' | 'x70'
export const lineHeight: Record<LineHeight, CSSProperties> = {
  x10: {
    lineHeight: 20,
  },
  x20: {
    lineHeight: 22,
  },
  x30: {
    lineHeight: 24,
  },
  x40: {
    lineHeight: 26,
  },
  x50: {
    lineHeight: 32,
  },
  x60: {
    lineHeight: 38,
  },
  x70: {
    lineHeight: 40,
  },
}

type Header = 'x10' | 'x20' | 'x30' | 'x40' | 'x50' | 'x60' | 'x70'
export const header: Record<Header, CSSProperties> = {
  x10: {
    ...fontSize.x10,
    ...fontWeight.bold,
    margin: 0,
  },
  x20: {
    ...fontSize.x20,
    ...fontWeight.bold,
    margin: 0,
  },
  x30: {
    ...fontSize.x30,
    ...fontWeight.bold,
    margin: 0,
  },
  x40: {
    ...fontSize.x40,
    ...fontWeight.bold,
    margin: 0,
  },
  x50: {
    ...fontSize.x50,
    ...fontWeight.bold,
    margin: 0,
  },
  x60: {
    ...fontSize.x60,
    ...fontWeight.bold,
    margin: 0,
  },
  x70: {
    ...fontSize.x70,
    ...fontWeight.bold,
    margin: 0,
  },
}

type Body = 'x10' | 'x20' | 'x30' | 'x40' | 'x50'
export const body: Record<Body, CSSProperties> = {
  x10: {
    ...fontSize.x10,
    ...fontWeight.regular,
    margin: 0,
  },
  x20: {
    ...fontSize.x20,
    ...fontWeight.regular,
    margin: 0,
  },
  x30: {
    ...fontSize.x30,
    ...fontWeight.regular,
    margin: 0,
  },
  x40: {
    ...fontSize.x40,
    ...fontWeight.regular,
    margin: 0,
  },
  x50: {
    ...fontSize.x50,
    ...fontWeight.regular,
    margin: 0,
  },
}

type Text = 'grayText' | 'normalText' | 'blackText'
export const text: Record<Text, CSSProperties> = {
  grayText: {
    ...fontSize.x30,
    color: Color.neutral.gray,
    margin: 0,
  },
  normalText: {
    ...fontSize.x30,
    margin: 0,
  },
  blackText: {
    ...fontSize.x30,
    color: Color.neutral.black,
    margin: 0,
  },
}
