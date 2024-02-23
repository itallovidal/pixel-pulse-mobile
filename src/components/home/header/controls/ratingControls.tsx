import Button from '../../../Button'
import SelectFilter from '../../selectFilter'
import React from 'react'
import { Box, HStack } from 'native-base'
import { ReviewContext } from '../../../context/ReviewContext'

function RatingControls() {
  const {
    updateGame,
    handleSubmitRating,
    showCommentBox,
    state: { filter, rating, game },
  } = React.useContext(ReviewContext)

  return (
    <HStack opacity={showCommentBox ? 0.3 : 1} space={2}>
      <Button
        display={showCommentBox ? 'none' : 'initial'}
        isDisabled={showCommentBox || rating > 0}
        onPress={() => updateGame(filter)}
        buttonTheme={'unstyled'}
        bg={'gray.600'}
        flex={1}
        h={`100%`}
      >
        Próximo
      </Button>

      <Box
        flex={1}
        opacity={
          showCommentBox || rating === 0 || game.wishList.isListed ? 0.4 : 1
        }
      >
        <Button
          isDisabled={showCommentBox || rating === 0 || game.wishList.isListed}
          bg={'red.600'}
          flex={1}
          onPress={() => handleSubmitRating()}
          buttonTheme={'unstyled'}
        >
          {game.wishList.isListed && 'Retire da Lista'}
          {!game.wishList.isListed && showCommentBox && 'Avaliado com Sucesso!'}
          {!game.wishList.isListed && !showCommentBox && 'Avaliar'}
        </Button>
      </Box>

      <SelectFilter />
    </HStack>
  )
}

export default RatingControls
