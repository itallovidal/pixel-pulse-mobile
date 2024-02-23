import React from 'react'
import { AnimatedCenter } from '../AnimatedComponents'
import { ShootingStar } from 'phosphor-react-native'
import {Center, Text} from 'native-base'
import { FadeInDown } from 'react-native-reanimated'
import Button from '../Button'
import { GlobalContext } from '../context/globalContextProvider'

function EmptyCatalogue() {
  const { navigation } = React.useContext(GlobalContext)
  return (
    <Center px={4} my={6}>
      <ShootingStar size={64} color={'white'} />
      <Text  my={4} color={'white'}>
        Ops, nada por aqui!
      </Text>

      <Button onPress={() => navigation.navigate('home')}>
        Descobrir jogos!
      </Button>
    </Center>
  )
}

export default EmptyCatalogue
