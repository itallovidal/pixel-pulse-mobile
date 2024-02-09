import React from 'react'
import { HStack, Image, Text, VStack } from 'native-base'
import placeholder from '../../assets/fotoplaceholder.png'
import { Star } from 'phosphor-react-native'
import { AnimatedHStack } from '../AnimatedComponents'
import { GlobalContext } from '../context/globalContextProvider'

function RatedCard() {
  const { theme } = React.useContext(GlobalContext)

  return (
    <AnimatedHStack bg={'black'} my={1}>
      <Image
        w={'1/4'}
        h={'full'}
        alt={'imagem de perfil'}
        source={placeholder}
      />

      <VStack ml={5} py={4} flex={1}>
        <Text
          fontSize={18}
          numberOfLines={1}
          fontWeight={'bold'}
          color={'white'}
        >
          Overwatch
        </Text>

        <HStack>
          <Star size={24} color={theme.colors.yellow[600]} weight={'light'} />
          <Star size={24} color={theme.colors.yellow[600]} weight={'light'} />
          <Star size={24} color={theme.colors.yellow[600]} weight={'light'} />
          <Star size={24} color={theme.colors.yellow[600]} weight={'light'} />
          <Star size={24} color={theme.colors.yellow[600]} weight={'light'} />
        </HStack>

        <HStack mt={2}>
          <Text flex={1} color={'white'} opacity={0.6}>
            FPS | Action Games
          </Text>
        </HStack>
      </VStack>
    </AnimatedHStack>
  )
}

export default RatedCard
