import React from 'react'
import { Center, Icon } from 'native-base'
import { CaretDown } from 'phosphor-react-native'
import {
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { AnimatedBox } from './AnimatedComponents'

function Arrows() {
  const pulse1 = useSharedValue(0)
  const pulse2 = useSharedValue(0)
  const pulse3 = useSharedValue(0)

  pulse1.value = withRepeat(
    withSequence(
      withDelay(100, withTiming(1, { duration: 1000 })),
      withDelay(100, withTiming(0, { duration: 1000 })),
    ),
    -1,
  )

  pulse2.value = withRepeat(
    withSequence(
      withDelay(200, withTiming(1, { duration: 1000 })),
      withDelay(200, withTiming(0, { duration: 1000 })),
    ),
    -1,
  )

  pulse3.value = withRepeat(
    withSequence(
      withDelay(300, withTiming(1, { duration: 1000 })),
      withDelay(300, withTiming(0, { duration: 1000 })),
    ),
    -1,
  )

  return (
    <Center my={4}>
      <AnimatedBox opacity={pulse1}>
        <Icon mt={-3} as={CaretDown} name="CaretDown" color="white" />
      </AnimatedBox>
      <AnimatedBox opacity={pulse2}>
        <Icon mt={-3} as={CaretDown} name="CaretDown" color="white" />
      </AnimatedBox>
      <AnimatedBox opacity={pulse3}>
        <Icon mt={-3} as={CaretDown} name="CaretDown" color="white" />
      </AnimatedBox>
    </Center>
  )
}

export default Arrows
