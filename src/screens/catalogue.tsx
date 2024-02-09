import React from 'react'
import { Center, Divider, Image, ScrollView, Text, VStack } from 'native-base'
import { ImageBackground } from 'react-native'
import placeholder from '../assets/fotoplaceholder.png'
import { LinearGradient } from 'expo-linear-gradient'
import placeholderprofile from '../assets/placeholderprofile.jpg'
import SelectDropdown from 'react-native-select-dropdown'
import ChangePassword from '../components/profile/changePassword'
import ChangeProfileInfo from '../components/profile/changeProfileInfo'
import Button from '../components/Button'
import { GlobalContext } from '../components/context/globalContextProvider'
import RatedCard from '../components/catalogue/ratedCard'

function Catalogue() {
  const { theme } = React.useContext(GlobalContext)

  return (
    <ScrollView flex={1}>
      <VStack
        flex={1}
        bg={theme.colors.gray['700']}
        p={8}
        justifyContent={'center'}
      >
        <Text color={'white'} fontWeight={'bold'} fontSize={32}>
          Catálogo!
        </Text>
        <Text color={'white'}> Veja a Lista de jogos avaliados abaixo.</Text>
        <Divider my={4} h={1} bg={'red.500'} w={'10%'} />

        <RatedCard />
        <RatedCard />
        <RatedCard />
        <RatedCard />
        <RatedCard />

        <Button mt={4}> Voltar </Button>
      </VStack>
    </ScrollView>
  )
}

export default Catalogue
