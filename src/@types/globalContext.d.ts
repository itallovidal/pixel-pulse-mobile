import { ILinearGradientProps } from 'native-base/lib/typescript/components/primitives/Box/types'
import {
  ColorType,
  ResponsiveValue,
} from 'native-base/lib/typescript/components/types'

export interface IToken {
  accessToken: string
}

export interface IShowToast {
  placement:
    | 'top'
    | 'bottom'
    | 'top-right'
    | 'top-left'
    | 'bottom-left'
    | 'bottom-right'
    | undefined
  bg: ResponsiveValue<ColorType | ILinearGradientProps>
  title: React.ReactNode
}
