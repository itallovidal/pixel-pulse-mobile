import React from 'react'
import { Center, Icon, View, VStack } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { CaretDown } from 'phosphor-react-native'
import Button from '../Button'
import {
  AnimatedHStack,
  AnimatedImageBackground,
  AnimatedVstack,
} from '../AnimatedComponents'
import { FadeIn, FadeOut, Layout } from 'react-native-reanimated'
import { ReviewContext } from '../context/ReviewContext'
import StarReview from './starReview'
import SelectFilter from './selectFilter'
import { useRoute } from '@react-navigation/native'
import { GlobalContext } from '../context/globalContextProvider'

import Loading from '../Loading'
import GameDescription from './gameDescription'
import RatingControls from './ratingControls'
import GameBackground from './gameBackground'
import HomeSkeleton from './homeSkeleton'

function Header() {
  const { game, updateGame, isReviewLoading, filter } =
    React.useContext(ReviewContext)

  const { params } = useRoute()
  const { gameID } = params as { gameID: number }

  React.useEffect(() => {
    if (gameID) {
      updateGame(filter, gameID)
    }
  }, [gameID])

  if (!game) {
    return
  }

  return (
    <VStack bg={'gray.700'} flex={1}>
      <GameBackground />
      <AnimatedVstack
        layout={Layout}
        opacity={isReviewLoading ? 0.4 : 1}
        flex={1}
        px={8}
        pt={'56'}
      >
        <GameDescription />
        <RatingControls />
      </AnimatedVstack>
    </VStack>
  )
}

export default Header
