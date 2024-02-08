import React from 'react'
import {
  Center,
  Divider,
  HStack,
  Icon,
  Text,
  useTheme,
  View,
  VStack,
} from 'native-base'
import { ImageBackground } from 'react-native'
import placeholder from '../assets/fotoplaceholder.png'
import { LinearGradient } from 'expo-linear-gradient'
import { CaretDown, Star } from 'phosphor-react-native'
import Button from './Button'
import { Api } from '../utilities/axios'
import { IGame } from '../@types/apiTypes'
import { GlobalContext } from './context/globalContextProvider'
import { AnimatedImageBackground, AnimatedText } from './AnimatedComponents'
import { FadeIn, Layout } from 'react-native-reanimated'
import { layout } from 'native-base/lib/typescript/theme/styled-system'

function HeaderHome() {
  const { getGame } = React.useContext(GlobalContext)
  const theme = useTheme()
  const [game, setGame] = React.useState<IGame>()
  const [loading, setLoading] = React.useState<boolean>()
  const [descriptionToggle, setDescriptionToggle] = React.useState(false)

  React.useEffect(() => {
    updateGame()
  }, [])

  async function updateGame() {
    setLoading(true)
    const game = await getGame()
    setGame(game)
    setLoading(false)
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
          pl={1}
          fontSize={32}
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
        <Text fontSize={16} color={'white'} marginLeft={-1}>
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

        <HStack justifyContent={'center'} my={4}>
          <Star size={48} color={theme.colors.yellow[600]} weight={'fill'} />
          <Star size={48} color={theme.colors.yellow[600]} weight={'fill'} />
          <Star size={48} color={theme.colors.yellow[600]} weight={'fill'} />
          <Star size={48} color={theme.colors.yellow[600]} weight={'light'} />
          <Star size={48} color={theme.colors.yellow[600]} weight={'light'} />
        </HStack>

        <Button
          isLoading={loading}
          onPress={() => updateGame()}
          buttonTheme={'unstyled'}
        >
          Não joguei..
        </Button>

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

export default HeaderHome
