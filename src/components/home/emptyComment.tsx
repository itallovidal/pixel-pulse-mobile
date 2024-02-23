import React from 'react'
import { Center, Text } from 'native-base'
import { ChatCircleDots } from 'phosphor-react-native'
import { AnimatedCenter } from '../AnimatedComponents'
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export function EmptyComment({ opcty }: { opcty: boolean }) {
  const opacityValue = useSharedValue(0.2)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(
        opcty ? (opacityValue.value = 1) : (opacityValue.value = 0.2),
      ),
    }
  })

  return (
    <AnimatedCenter style={[animatedStyle]} px={4} my={6}>
      <ChatCircleDots size={64} color={'white'} />
      <Text mt={4} color={'white'}>
        Nenhum comentário por enquanto.
      </Text>
      <Text color={'white'}> Seja o primeiro! </Text>
    </AnimatedCenter>
  )
}
