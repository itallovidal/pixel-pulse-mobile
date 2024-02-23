import React from 'react'
import { GameController } from 'phosphor-react-native'
import { Center, Text } from 'native-base'
import Button from '../Button'
import { GlobalContext } from '../context/globalContextProvider'

export function EmptyWishList() {
  const { navigation } = React.useContext(GlobalContext)
  return (
    <Center px={4} my={6}>
      <GameController size={64} color={'white'} />
      <Text my={4} color={'white'}>
        Nenhum jogo de interesse!
      </Text>

      <Button onPress={() => navigation.navigate('home')}>
        Descobrir jogos!
      </Button>
    </Center>
  )
}
