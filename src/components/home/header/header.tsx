import React from 'react'
import { Divider, HStack, VStack } from 'native-base'
import { AnimatedHStack, AnimatedVstack } from '../../AnimatedComponents'
import {
  FadeInDown,
  Layout,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { ReviewContext } from '../../context/ReviewContext'

import GameDescription from '../gameDescription'
import Controls from '../controls'
import GameBackground from './gameBackground'

import WishListButton from './rating/wishListButton'
import { StarsRating } from './rating/starsRating'

function Header() {
  const opcty = useSharedValue(0)
  const {
    state: { filter, game },
    updateGame,
    isReviewLoading,
    homeRouteParams,
  } = React.useContext(ReviewContext)

  React.useEffect(() => {
    if (!homeRouteParams) return

    if (homeRouteParams.isEditing) {
      updateGame(filter, homeRouteParams.gameID, 'isEditing')
    }

    if (homeRouteParams.isWishListed) {
      updateGame(filter, homeRouteParams.gameID, 'isWished')
    }
  }, [homeRouteParams])

  opcty.value = isReviewLoading ? withSpring(0.4) : withSpring(1)

  return (
    <VStack bg={'gray.700'} flex={1}>
      <GameBackground />
      <AnimatedVstack
        style={{
          opacity: opcty,
        }}
        flex={1}
        px={8}
        pt={'56'}
      >
        <GameDescription />
        <Controls />
        <AnimatedHStack
          layout={FadeInDown}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <WishListButton />

          {!game.wishList.isListed ? (
            <>
              <Divider mx={5} bg={'white'} orientation={'vertical'} />
              <StarsRating />
            </>
          ) : null}
        </AnimatedHStack>
      </AnimatedVstack>
    </VStack>
  )
}

export default Header
