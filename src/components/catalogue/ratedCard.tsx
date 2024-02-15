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

  console.log(game.genres)

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
          gameID: game.gameID,
        })
      }
      _pressed={{
        opacity: 0.45,
      }}
    >
      <AnimatedHStack entering={FadeIn.delay(delay)} bg={'black'} my={1}>
        <Image
          w={'1/4'}
          h={'full'}
          alt={'imagem de perfil'}
          source={{ uri: `https:${game.cover.url}` }}
        />

        <VStack ml={5} py={4} flex={1}>
          <Text
            fontSize={18}
            numberOfLines={2}
            fontWeight={'bold'}
            color={'white'}
            mb={2}
          >
            {game.name}
          </Text>

          <HStack>{stars}</HStack>

          <HStack mt={2}>
            {
              <Text flex={1} color={'white'} opacity={0.6}>
                {filtered.map((genre, index) => {
                  return (
                    genre?.brName +
                    (index === game.genres.length - 1 ? '' : ' | ')
                  )
                })}
              </Text>
            }
          </HStack>
        </VStack>
      </AnimatedHStack>
    </Pressable>
  )
}

export default RatedCard
