import React, { useCallback } from 'react'
import { FlatList, VStack } from 'native-base'

import { GlobalContext } from '../components/context/globalContextProvider'
import { Api } from '../utilities/api/axios.config'
import { IRatedData, IRatedGame } from '../@types/game'
import RatedCard from '../components/catalogue/ratedCard'
import { useFocusEffect } from '@react-navigation/native'
import Loading from '../components/Loading'
import TextHeader from '../components/textHeader'
import EmptyCatalogue from '../components/catalogue/emptyCatalogue'
import { AnimatedFlatlist } from '../components/AnimatedComponents'
import { FadeInDown } from 'react-native-reanimated'
import { getRatedGames } from '../utilities/api/getRatedGames'

function Catalogue() {
  const { theme, userToken, showToast } = React.useContext(GlobalContext)
  const [rated, setRated] = React.useState<IRatedData>({
    games: [],
    page: 0,
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  async function handleRatedGames(page: number) {
    try {
      const response = await getRatedGames(userToken!.accessToken, page)

      if (response.length === 0) {
        showToast({
          bg: 'red.600',
          placement: 'top',
          title: 'Sem mais jogos para carregar.',
        })

        return
      }

      if (page !== 0)
        showToast({
          bg: 'green.600',
          placement: 'top',
          title: 'Jogos carregados!',
        })

      const gamesObject = {
        page,
        games: [...rated.games, ...response],
      }

      setRated(gamesObject)
    } catch (e) {
      console.log(e)
    }
  }

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true)
      handleRatedGames(0).then(() => setIsLoading(false))

      return () => {
        setRated({
          games: [],
          page: 0,
        })
      }
    }, []),
  )

  return (
    <VStack flex={1} bg={theme.colors.gray['700']}>
      <VStack
        flex={1}
        bg={theme.colors.gray['700']}
        p={4}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <TextHeader
          h1={' Meu Catálogo'}
          h2={'Clique no jogo para mais informações.'}
        />

        {isLoading ? (
          <Loading />
        ) : (
          <AnimatedFlatlist
            onEndReached={() => handleRatedGames(rated?.page + 10)}
            entering={FadeInDown}
            w={'full'}
            ListEmptyComponent={<EmptyCatalogue />}
            data={rated?.games}
            keyExtractor={(item) => {
              // @ts-ignore
              return item.id.toString()
            }}
            renderItem={({ item, index }) => (
              <RatedCard game={item as IRatedGame} delay={index * 100} />
            )}
          />
        )}
      </VStack>
    </VStack>
  )
}

export default Catalogue

// setPage((prev) => {
//   if (prev === 0) {
//     return 10
//   }
//
//   return prev + 10
// })
