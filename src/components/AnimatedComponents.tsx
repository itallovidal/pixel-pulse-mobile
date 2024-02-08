import Animated from 'react-native-reanimated'
import { VStack, Text, ScrollView, Input } from 'native-base'
import { ImageBackground } from 'react-native'
export const AnimatedVstack = Animated.createAnimatedComponent(VStack)
export const AnimatedText = Animated.createAnimatedComponent(Text)
export const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground)
export const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
export const AnimatedInput = Animated.createAnimatedComponent(Input)
