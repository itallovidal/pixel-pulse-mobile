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

function Catalogue() {
  const { theme, userToken } = React.useContext(GlobalContext)
  const [games, setGames] = React.useState<IRatedGame[] | undefined>()

  async function getRatedGames() {
    try {
      const { data } = await Api.get('games/rated', {
        headers: {
          Authorization: `Bearer ${userToken?.accessToken}`,
        },
      })

      return data as IRatedGame[]
    } catch (e) {
      console.log(e)
    }
  }

  useFocusEffect(
    useCallback(() => {
      console.log('catalogo')
      getRatedGames().then((data) => setGames(data))
    }, []),
  )

  return (
    <VStack flex={1} bg={theme.colors.gray['700']}>
      <VStack
        flex={1}
        bg={theme.colors.gray['700']}
        p={8}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text color={'white'} fontWeight={'bold'} fontSize={32}>
          Catálogo!
        </Text>
        <Text color={'white'}> Veja a Lista de jogos avaliados abaixo.</Text>
        <Divider my={4} h={1} bg={'red.500'} w={'10%'} />
        <FlatList
          w={'full'}
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <RatedCard game={item} delay={index * 100} />
          )}
        />
      </VStack>
      {/* <Center> */}
      {/*  <Button w={'1/2'} mt={4}> */}
      {/*    Voltar{' '} */}
      {/*  </Button> */}
      {/* </Center> */}
    </VStack>
  )
}

export default Catalogue
