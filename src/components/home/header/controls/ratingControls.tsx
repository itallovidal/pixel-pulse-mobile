import Button from '../../../Button'
import SelectFilter from '../../selectFilter'
import React from 'react'
import { HStack } from 'native-base'
import { ReviewContext } from '../../../context/ReviewContext'
import { GlobalContext } from '../../../context/globalContextProvider'

function RatingControls() {
  const {
    updateGame,
    isReviewLoading,
    handleSubmitRating,
    state: { filter, rating },
  } = React.useContext(ReviewContext)

  return (
    <HStack space={2}>
      <Button
        isDisabled={rating > 0}
        onPress={() => updateGame(filter)}
        buttonTheme={'unstyled'}
        bg={'gray.600'}
        flex={1}
        h={`100%`}
      >
        Próximo
      </Button>

      <Button
        isDisabled={rating === 0}
        isLoading={isReviewLoading}
        bg={'red.600'}
        flex={1}
        onPress={() => handleSubmitRating()}
        buttonTheme={'unstyled'}
      >
        Avaliar
      </Button>

      <SelectFilter />
    </HStack>
  )
}

export default RatingControls
