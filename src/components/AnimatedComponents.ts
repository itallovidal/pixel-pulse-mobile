import Animated from 'react-native-reanimated'
import {
  VStack,
  Icon,
  Text,
  ScrollView,
  Input,
  Center,
  HStack,
  FlatList,
  View,
  Button,
  Pressable, Box,
} from 'native-base'
import { ImageBackground } from 'react-native'

export const AnimatedVstack = Animated.createAnimatedComponent(VStack)
// export const AnimatedIcon = Animated.createAnimatedComponent(
//   ,
// )

export const AnimatedText = Animated.createAnimatedComponent(Text)
export const AnimatedCenter = Animated.createAnimatedComponent(Center)
export const AnimatedBox = Animated.createAnimatedComponent(Box)
export const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground)
export const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
export const AnimatedInput = Animated.createAnimatedComponent(Input)
export const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const AnimatedHStack = Animated.createAnimatedComponent(HStack)

export const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList)
export const AnimatedView = Animated.createAnimatedComponent(View)
export const AnimatedButton = Animated.createAnimatedComponent(Button)
