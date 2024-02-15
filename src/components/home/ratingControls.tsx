import React from 'react'
import { AnimatedHStack } from '../AnimatedComponents'
import {FadeIn, FadeOut, SlideInDown} from 'react-native-reanimated'
import Button from '../Button'
import SelectFilter from './selectFilter'
import StarReview from './starReview'
import { ReviewContext } from '../context/ReviewContext'
import Loading from '../Loading'

function RatingControls() {
  const { updateGame, isReviewLoading, filter, rating } =
    React.useContext(ReviewContext)

  return isReviewLoading ? (
    <Loading />
  ) : (
    <>
      <AnimatedHStack exiting={FadeOut} entering={FadeIn} space={2} my={6}>
        <Button
          isDisabled={rating > 0}
          onPress={() => updateGame(filter)}
          buttonTheme={'unstyled'}
          bg={'gray.600'}
          w={`1/2`}
          h={`100%`}
        >
          Não joguei..
        </Button>

        <SelectFilter />
      </AnimatedHStack>
      <StarReview />
    </>
  )
}

export default RatingControls
