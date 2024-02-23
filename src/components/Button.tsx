import React, { ReactNode } from 'react'
import { IButtonProps, Text } from 'native-base'
import { AnimatedButton } from './AnimatedComponents'
import { LayoutAnimation } from 'react-native'
import { FadeIn, Layout } from 'react-native-reanimated'

interface IMyButton extends IButtonProps {
  children: string | ReactNode
  buttonTheme?: 'default' | 'unstyled' | 'whiteTheme' | 'redTheme'
}

const styles = {
  default: {
    bg: 'gray.500',
    pressed: 'red.500',
    textColor: 'white',
  },
  unstyled: {
    bg: 'transparent',
    pressed: 'gray.500',
    textColor: 'white',
  },
  whiteTheme: {
    bg: 'white',
    pressed: 'red.500',
    textColor: 'gray.500',
  },
  redTheme: {
    bg: 'red.500',
    pressed: 'white',
    textColor: 'gray.500',
  },
}

function Button({ children, buttonTheme = 'default', ...props }: IMyButton) {
  return (
    <AnimatedButton
      bg={styles[buttonTheme].bg}
      layout={FadeIn}
      _pressed={{
        bgColor: styles[buttonTheme].pressed,
      }}
      {...props}
    >
      <Text color={styles[buttonTheme].textColor}>{children}</Text>
    </AnimatedButton>
  )
}

export default Button
