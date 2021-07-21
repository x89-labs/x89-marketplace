type Neutral = 'white' | 'purple' | 'black' | 'green' | 'yellow' | 'gray' | 'gray2'
export const neutral: Record<Neutral, string> = {
  white: '#ffffff',
  black: '#000000',
  purple: '#6324ED',
  green: '#35dfb1',
  yellow: '#eeff4a',
  gray: '#777e90',
  gray2: '#353945',
}

type Primary = 'brand' | 's200' | 's600'
export const primary: Record<Primary, string> = {
  s200: '#459de6',
  brand: '#0d548f',
  s600: '#0c3659',
}

type LinearGradient = 'brand' | 'layer' | 'button' | 'black'
export const linearGradient: Record<LinearGradient, string> = {
  layer: `linear-gradient(
    91.26deg,
    rgba(29, 37, 112, 0.8) 12.36%,
    rgba(132, 65, 144, 0.8) 36.84%,
    rgba(136, 23, 82, 0.8) 69.13%,
    rgba(226, 116, 45, 0.8) 94.13%
  )`,
  black: `linear-gradient(
    133.84deg,
    #4e4e4e -16.04%,
    #333333 9.33%,
    #1a1a1a 32.02%,
    #1a1a1a 62.06%,
    #262626 87.42%,
    #4e4e4e 112.12%
  )`,
  brand: '#0d548f',
  button: 'linear-gradient(226.07deg, #02e879 8.39%, #279ea5 28.31%, #475ccc 47.69%, #5b34e4 61.69%, #6324ed 68.92%)',
}
type Secondary = 'brand' | 's200' | 's600'
export const secondary: Record<Secondary, string> = {
  s200: '#b968e8',
  brand: '#591282',
  s600: '#3f0d5c',
}

type Danger = 's400'
export const danger: Record<Danger, string> = {
  s400: '#cf1717',
}

type Success = 's400'
export const success: Record<Success, string> = {
  s400: '#008a09',
}

type Warning = 's400'
export const warning: Record<Warning, string> = {
  s400: '#cf9700',
}
