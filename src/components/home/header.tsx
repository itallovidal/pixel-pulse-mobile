import React from 'react'
import {
  Center,
  Divider,
  Icon,
  Text,
  useTheme,
  View,
  VStack,
} from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { CaretDown } from 'phosphor-react-native'
import Button from '../Button'
import { AnimatedImageBackground, AnimatedText } from '../AnimatedComponents'
import { FadeIn, Layout } from 'react-native-reanimated'
import { ReviewContext } from '../context/ReviewContext'
import StarReview from './starReview'

function Header() {
  const { game, updateGame } = React.useContext(ReviewContext)
  const theme = useTheme()
  const [loading, setLoading] = React.useState<boolean>()
  const [descriptionToggle, setDescriptionToggle] = React.useState(false)

  React.useEffect(() => {
    getGame()
  }, [])

  async function getGame() {
    try {
      setLoading(true)
      await updateGame()
    } finally {
      setLoading(false)
    }
  }

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
          fontSize={24}
          color={'white'}
          fontWeight={'bold'}
          marginLeft={-3}
        >
          {game.name}
        </Text>

        <Text fontSize={16} color={'white'} marginLeft={-1}>
          {game.platforms.map((plat, index) => {
            return (
              <Text>
                {plat.name} {index === game.platforms.length - 1 ? '' : '|'}{' '}
              </Text>
            )
          })}
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

        <Button
          isLoading={loading}
          onPress={() => getGame()}
          buttonTheme={'unstyled'}
          mt={2}
          bg={'gray.600'}
        >
          Não joguei..
        </Button>

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
