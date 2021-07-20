type Screen = 'width' | 'height'
export const screen: Record<Screen, any> = {
  width: '100%',
  height: '100%',
}

type Layout =
  | 'x2'
  | 'x4'
  | 'x10'
  | 'x15'
  | 'x20'
  | 'x24'
  | 'x30'
  | 'x40'
  | 'x50'
  | 'x60'
  | 'x70'
  | 'x80'
  | 'x90'
  | 'x100'
  | 'x120'
  | 'x140'
  | 'x160'
  | 'x200'
  | 'x240'
  | 'x255'
  | 'x340'
export const layout: Record<Layout, number> = {
  x2: 2,
  x4: 5,
  x10: 10,
  x15: 14,
  x20: 20,
  x24: 24,
  x30: 28,
  x40: 36,
  x50: 48,
  x60: 60,
  x70: 68,
  x80: 80,
  x90: 90,
  x100: 100,
  x120: 120,
  x140: 140,
  x160: 160,
  x200: 200,
  x240: 240,
  x255: 255,
  x340: 340,
}

export const x2 = layout.x2
export const x4 = layout.x4
export const x10 = layout.x10
export const x15 = layout.x15
export const x20 = layout.x20
export const x24 = layout.x24
export const x30 = layout.x30
export const x40 = layout.x40
export const x50 = layout.x50
export const x60 = layout.x60
export const x70 = layout.x70
export const x80 = layout.x80
export const x90 = layout.x90
export const x100 = layout.x100
export const x120 = layout.x120
export const x140 = layout.x140
export const x160 = layout.x160
export const x200 = layout.x200
export const x240 = layout.x240
export const x255 = layout.x255
export const x340 = layout.x340

type Icons = 'x10' | 'x15' | 'x20' | 'x25' | 'x30' | 'x40'
export const icons: Record<Icons, number> = {
  x10: 14,
  x15: 17,
  x20: 20,
  x25: 25,
  x30: 30,
  x40: 40,
}

type IconStroke = 'x1' | 'x2'
export const iconStroke: Record<IconStroke, number> = {
  x1: 1,
  x2: 2,
}
