import React, { useCallback } from 'react'
import {
  Center,
  Divider,
  FlatList,
  ScrollView,
  Text,
  VStack,
} from 'native-base'

import Button from '../components/Button'
import { GlobalContext } from '../components/context/globalContextProvider'
import { Api } from '../utilities/api/axios.config'
import { IRatedGame } from '../@types/game'
import RatedCard from '../components/catalogue/ratedCard'
import { useFocusEffect } from '@react-navigation/native'
import Loading from '../components/Loading'
import { WishCard } from '../components/wishList/wishCard'
import TextHeader from '../components/textHeader'
import { getWishedGames } from '../utilities/api/getWishedGames'
import { EmptyWishList } from '../components/wishList/emptyWishList'
import { AnimatedFlatlist } from '../components/AnimatedComponents'

export function WishList() {
  const { userToken } = React.useContext(GlobalContext)
  const [games, setGames] = React.useState<IRatedGame[] | undefined>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function handleGetWishedGames() {
    try {
      setIsLoading(true)
      const data = await getWishedGames(userToken!.accessToken)
      return data as IRatedGame[]
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      console.log('wish')
      handleGetWishedGames().then((data) => setGames(data))
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
          ListEmptyComponent={<EmptyWishList />}
          w={'full'}
          data={games}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item) => {
            // @ts-ignore
            return item.id.toString()
          }}
          renderItem={({ item, index }) => (
            <WishCard game={item as IRatedGame} delay={index * 100} />
          )}
        />
      )}
    </VStack>
  )
}
