import React from 'react'
import { View } from 'native-base'
import { AnimatedImageBackground } from '../../AnimatedComponents'
import { Layout } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { ReviewContext } from '../../context/ReviewContext'
import { GlobalContext } from '../../context/globalContextProvider'

function GameBackground() {
  const {
    state: { game },
  } = React.useContext(ReviewContext)
  const { theme } = React.useContext(GlobalContext)

  return (
    <View position={'absolute'} w={'full'} h={'60%'}>
      <AnimatedImageBackground
        // resizeMode={'contain'}
        layout={Layout}
        style={{ marginTop: 20, width: '100%', height: '100%' }}
        source={{ uri: `https:${game.info.cover.url}` }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0)', theme.colors.gray['700']]}
          style={{ height: '100%', width: '100%' }}
        />
      </AnimatedImageBackground>
    </View>
  )
}

export default GameBackground
