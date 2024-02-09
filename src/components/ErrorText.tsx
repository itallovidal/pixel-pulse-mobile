import React from 'react'
import { AnimatedText } from './AnimatedComponents'
import { FadeIn, FadeOut, Layout } from 'react-native-reanimated'

export function ErrorText({ error }: { error: string }) {
  return (
    <AnimatedText
      entering={FadeIn}
      exiting={FadeOut}
      layout={Layout}
      fontWeight={'bold'}
      alignSelf={'flex-start'}
      mb={8}
      bg={'red.500'}
      p={2}
      rounded={2}
      color={'white'}
    >
      {error}
    </AnimatedText>
  )
}

export default ErrorText
