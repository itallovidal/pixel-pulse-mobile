import React from 'react'
import {
  Image,
  VStack,
  Text,
  HStack,
  Icon,
  Button,
  useTheme,
} from 'native-base'
import { ThumbsDown, ThumbsUp } from 'phosphor-react-native'
import placeholder from '../../../assets/fotoplaceholder.png'
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { AnimatedHStack } from '../../AnimatedComponents'
import { ReviewContext } from '../../context/ReviewContext'
import { GlobalContext } from '../../context/globalContextProvider'
import { IComment } from '../../../@types/game'
import { getGenreName } from '../../../utilities/methods'

function Comment({ opcty, data }: { opcty: boolean; data: IComment }) {
  const opacityValue = useSharedValue(0.2)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(
        opcty ? (opacityValue.value = 1) : (opacityValue.value = 0.2),
      ),
    }
  })

  const comments = getGenreName([data.user.favGenre1, data.user.favGenre2])

  return (
    <AnimatedHStack entering={FadeIn} style={[animatedStyle]} px={4} my={4}>
      <Image
        mr={2}
        w={60}
        mt={3}
        h={60}
        rounded={'full'}
        alt={'imagem de perfil'}
        source={placeholder}
      />

      <VStack flex={1}>
        <Text fontSize={18} fontWeight={'bold'} color={'white'}>
          {data.user.name}
        </Text>
        <Text color={'white'} numberOfLines={5} textBreakStrategy={'balanced'}>
          {data.comment}
        </Text>

        <HStack mt={4}>
          <Text flex={1} color={'white'} opacity={0.6}>
            {getGenreName([data.user.favGenre1, data.user.favGenre2])}
          </Text>

          {/* <Button p={0} variant={'unstyled'}> */}
          {/*  <ThumbsDown */}
          {/*    mirrored={true} */}
          {/*    // color={menageLike.disliked ? theme.colors.red['500'] : 'white'} */}
          {/*    color={`white`} */}
          {/*    size={32} */}
          {/*    weight={data.likes ? 'fill' : 'thin'} */}
          {/*  /> */}
          {/* </Button> */}

          {/* <Button p={0} variant={'unstyled'}> */}
          {/*  <ThumbsUp */}
          {/*    // color={menageLike.disliked ? theme.colors.red['500'] : 'white'} */}
          {/*    color={`white`} */}
          {/*    size={32} */}
          {/*    weight={data.likes ? 'fill' : 'thin'} */}
          {/*  /> */}
          {/* </Button> */}
        </HStack>
      </VStack>
    </AnimatedHStack>
  )
}

export default Comment
