import React from 'react'
import { ReviewContext } from '../context/ReviewContext'
import { VStack } from 'native-base'
import EditingControls from './header/controls/editingControls'
import RatingControls from './header/controls/ratingControls'
import { AnimatedVstack } from '../AnimatedComponents'
import { FadeIn, SlideInUp } from 'react-native-reanimated'

function Controls() {
  const { homeRouteParams } = React.useContext(ReviewContext)

  return (
    <AnimatedVstack my={6} space={6} entering={FadeIn} exiting={SlideInUp}>
      {homeRouteParams?.isEditing ? <EditingControls /> : <RatingControls />}
    </AnimatedVstack>
  )
}

export default Controls
