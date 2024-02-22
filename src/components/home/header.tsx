import React from 'react'
import { VStack } from 'native-base'
import { AnimatedVstack } from '../AnimatedComponents'
import { Layout } from 'react-native-reanimated'
import { ReviewContext } from '../context/ReviewContext'

import GameDescription from './gameDescription'
import RatingControls from './ratingControls'
import GameBackground from './gameBackground'

function Header() {
  const {
    state: { filter },
    updateGame,
    isReviewLoading,
    homeRouteParams,
  } = React.useContext(ReviewContext)

  React.useEffect(() => {
    if (
      homeRouteParams &&
      (homeRouteParams.isEditing || homeRouteParams.isWishListed)
    ) {
      updateGame(filter, homeRouteParams.gameID)
    }
  }, [homeRouteParams])

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
