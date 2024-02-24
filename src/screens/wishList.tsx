import React, { useCallback } from 'react'
import { VStack } from 'native-base'

import { GlobalContext } from '../components/context/globalContextProvider'
import { IRatedData, IRatedGame } from '../@types/game'
import { useFocusEffect } from '@react-navigation/native'
import Loading from '../components/Loading'
import { Card } from '../components/card'
import TextHeader from '../components/textHeader'
import { getWishedGames } from '../utilities/api/getWishedGames'
import { EmptyWishList } from '../components/wishList/emptyWishList'
import { AnimatedFlatlist } from '../components/AnimatedComponents'

export function WishList() {
  const { userToken, showToast } = React.useContext(GlobalContext)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [wished, setWished] = React.useState<IRatedData>({
    games: [],
    page: 0,
  })

  async function handleGetWishedGames(page: number) {
    try {
      const response = await getWishedGames(userToken!.accessToken, page)

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
        games: [...wished.games, ...response],
      }

      setWished(gamesObject)
    } catch (e) {
      console.log(e)
    }
  }

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true)
      handleGetWishedGames(0).then(() => setIsLoading(false))
    }, []),
  )

  return (
    <VStack
      flex={1}
      bg={'gray.700'}
      p={4}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <TextHeader h1={'Lista de Desejos'} h2={'Avalie clicando no jogo.'} />

      {isLoading ? (
        <Loading />
      ) : (
        <AnimatedFlatlist
          onEndReached={() => handleGetWishedGames(wished?.page + 10)}
          ListEmptyComponent={<EmptyWishList />}
          w={'full'}
          data={wished.games}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item) => {
            // @ts-ignore
            return item.id.toString()
          }}
          renderItem={({ item, index }) => (
            <Card game={item as IRatedGame} delay={index * 100} />
          )}
        />
      )}
    </VStack>
  )
}
