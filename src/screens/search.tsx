import React, { useCallback } from 'react'
import { Divider, Text, VStack } from 'native-base'

import { useFocusEffect, useRoute } from '@react-navigation/native'
import Loading from '../components/Loading'
import { Card } from '../components/card'
import TextHeader from '../components/textHeader'
import { EmptyWishList } from '../components/wishList/emptyWishList'
import {
  AnimatedFlatlist,
  AnimatedVstack,
} from '../components/AnimatedComponents'
import { SearchButton } from '../components/searchButton'
import { searchGame } from '../utilities/api/searchGame'
import { IGameCard } from '../@types/game'
import { SlideInDown } from 'react-native-reanimated'

export function Search() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [results, setResults] = React.useState<IGameCard[]>([])
  const { q } = useRoute().params as { q: string }

  async function handleSearch() {
    try {
      setIsLoading(true)
      const r = await searchGame(q)
      setResults(r)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleSearch()

      return () => setResults([])
    }, [q]),
  )

  return (
    <VStack flex={1} bg={'gray.700'} p={4} justifyContent={'center'}>
      <SearchButton />

      <AnimatedVstack entering={SlideInDown.duration(300)} mt={24}>
        <Text fontSize={18} color={'white'}>
          Pesquisando por: <Text color={'red.600'}>{q}</Text>
        </Text>
        <Divider my={4} h={1} bg={'red.500'} w={'10%'} />
      </AnimatedVstack>

      {isLoading ? (
        <Loading />
      ) : (
        <AnimatedFlatlist
          // onEndReached={() => handleGetWishedGames(wished?.page + 10)}
          ListEmptyComponent={<EmptyWishList />}
          w={'full'}
          data={results}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item) => {
            // @ts-ignore
            return item.id.toString()
          }}
          renderItem={({ item, index }) => (
            <Card game={item as IGameCard} delay={index * 100} />
          )}
        />
      )}
    </VStack>
  )
}
