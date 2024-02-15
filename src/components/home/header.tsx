import React from 'react'
import {
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Spinner,
  Text,
  useTheme,
  View,
  VStack,
} from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { CaretDown } from 'phosphor-react-native'
import Button from '../Button'
import {
  AnimatedHStack,
  AnimatedImageBackground,
  AnimatedText,
} from '../AnimatedComponents'
import { FadeIn, FadeOut, Layout } from 'react-native-reanimated'
import { ReviewContext } from '../context/ReviewContext'
import StarReview from './starReview'
import SelectFilter from './selectFilter'
import { formatListOfContents } from '../../utilities/methods'
import { useRoute } from '@react-navigation/native'

function Header() {
  const { game, updateGame, isReviewLoading, filter, rating } =
    React.useContext(ReviewContext)
  const theme = useTheme()
  const [descriptionToggle, setDescriptionToggle] = React.useState(false)
  const { params } = useRoute()
  const { gameID } = params as { gameID: number }

  React.useEffect(() => {
    updateGame(filter, gameID)
  }, [gameID])

  console.log(game?.cover)

  return game ? (
    <VStack bg={'gray.700'} flex={1}>
      <View position={'absolute'} w={'full'} h={'60%'}>
        <AnimatedImageBackground
          layout={Layout}
          style={{ width: '100%', height: '100%' }}
          source={{ uri: `https:${game.cover.url}` }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0)', theme.colors.gray['700']]}
            style={{ height: '100%', width: '100%' }}
          />
        </AnimatedImageBackground>
      </View>

      <VStack px={8} pt={'56'}>
        <Text
          pl={2}
          numberOfLines={2}
          fontSize={24}
          color={'white'}
          fontWeight={'bold'}
          marginLeft={-3}
        >
          {game.name}
        </Text>

        <Text fontSize={16} color={'white'} marginLeft={-1}>
          <Text>{formatListOfContents(game.platforms)}</Text>
        </Text>
        <Text
          fontSize={16}
          mt={4}
          opacity={0.7}
          color={'white'}
          marginLeft={-1}
        >
          {game.releaseDate}
        </Text>

        <Text
          fontSize={16}
          mt={2}
          opacity={0.7}
          color={'white'}
          marginLeft={-1}
        >
          <Text>{formatListOfContents(game.genres)}</Text>
        </Text>

        <Divider my={4} h={1} bg={'red.500'} w={'10%'} />

        <AnimatedText
          layout={FadeIn.duration(800)}
          fontSize={16}
          color={'white'}
          marginLeft={-1}
          numberOfLines={descriptionToggle ? 99 : 3}
          onPress={() => {
            setDescriptionToggle(!descriptionToggle)
          }}
        >
          {game.summary}
        </AnimatedText>

        {isReviewLoading ? (
          <Spinner color={'red.500'} my={6} />
        ) : (
          <AnimatedHStack exiting={FadeOut} entering={FadeIn} space={2} my={6}>
            <Button
              isDisabled={rating > 0}
              isLoading={isReviewLoading}
              onPress={() => updateGame(filter)}
              buttonTheme={'unstyled'}
              bg={'gray.600'}
              w={`1/2`}
              h={`100%`}
            >
              Não joguei..
            </Button>

            <SelectFilter />
          </AnimatedHStack>
        )}

        <StarReview />

        <Center my={4}>
          <Icon as={CaretDown} name="CaretDown" color="white" />

          <Icon
            opacity={0.6}
            mt={-3}
            as={CaretDown}
            name="CaretDown"
            color="white"
          />
          <Icon
            opacity={0.3}
            mt={-3}
            as={CaretDown}
            name="CaretDown"
            color="white"
          />
        </Center>
      </VStack>
    </VStack>
  ) : (
    <Text>Carregando</Text>
  )
}

export default Header
