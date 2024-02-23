import React from 'react'
import { ReviewContext } from '../context/ReviewContext'
import { VStack } from 'native-base'
import EditingControls from './header/controls/editingControls'
import RatingControls from './header/controls/ratingControls'

function Controls() {
  const { homeRouteParams } = React.useContext(ReviewContext)

  return (
    <VStack my={6} space={6}>
      {homeRouteParams?.isEditing ? <EditingControls /> : <RatingControls />}
    </VStack>
  )
}

export default Controls
