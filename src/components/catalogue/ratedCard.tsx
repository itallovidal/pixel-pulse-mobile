import React from 'react'
import { HStack, Image, Pressable, Text, VStack } from 'native-base'
import { Star } from 'phosphor-react-native'
import { AnimatedHStack } from '../AnimatedComponents'
import { GlobalContext } from '../context/globalContextProvider'
import { GENRES, IRatedGame } from '../../@types/game'
import { FadeIn } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { TAPPNavigatorProps } from '../../routes/routes'

function RatedCard({ game, delay }: { game: IRatedGame; delay: number }) {
  const { theme } = React.useContext(GlobalContext)
  const { navigate } = useNavigation<TAPPNavigatorProps>()

  const stars = []

  const filtered = game.genres.map((gen) => {
    return GENRES.find((genre) => genre.id === gen.id)
  })

  for (let i = 1; i < 6; i++) {
    if (i <= game.stars) {
      stars.push(
        <Star
          key={i}
          size={24}
          color={theme.colors.yellow[600]}
          weight={'fill'}
        />,
      )
    } else {
      stars.push(
        <Star
          key={i}
          size={24}
          color={theme.colors.yellow[600]}
          weight={'light'}
        />,
      )
    }
  }

  return (
    <Pressable
      onPress={() =>
        navigate(`home`, {
          gameToEdit: {
            gameID: game.gameID,
            stars: game.stars,
            id: game.id,
          },
        })
      }
      _pressed={{
        opacity: 0.45,
      }}
    >
      <AnimatedHStack
        entering={FadeIn.delay(delay)}
        bg={'black'}
        minH={160}
        p={3}
        my={2}
        rounded={'md'}
      >
        <Image
          w={100}
          rounded={'md'}
          h={'full'}
          alt={'imagem de perfil'}
          source={{ uri: `https:${game.cover.url}` }}
        />

        <VStack justifyContent={'center'} ml={5} flex={1}>
          <Text
            fontSize={18}
            numberOfLines={2}
            fontWeight={'bold'}
            color={'white'}
            mb={2}
            w={'2/3'}
          >
            {game.name}
          </Text>

          <HStack>{stars}</HStack>

          <VStack mt={2}>
            {filtered.map((genre) => {
              return (
                <Text key={genre?.id} flex={1} color={'white'} opacity={0.6}>
                  {genre?.brName}
                </Text>
              )
            })}
          </VStack>
        </VStack>
      </AnimatedHStack>
    </Pressable>
  )
}

export default RatedCard
