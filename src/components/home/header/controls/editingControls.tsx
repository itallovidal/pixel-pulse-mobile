import React from 'react'
import Button from '../../../Button'
import { HStack } from 'native-base'
import { ReviewContext } from '../../../context/ReviewContext'
import { GlobalContext } from '../../../context/globalContextProvider'

function EditingControls() {
  const {
    updateGame,
    handleUpdatedRating,
    isReviewLoading,
    showCommentBox,
    homeRouteParams,
    state: { filter },
  } = React.useContext(ReviewContext)
  const { navigation } = React.useContext(GlobalContext)

  async function functionHandleEditControls(exec: 'next' | 'update') {
    if (exec === 'next') {
      await updateGame(filter)
    } else {
      await handleUpdatedRating()
    }

    navigation.setParams({
      id: '',
      isEditing: false,
      gameID: 0,
      isWishListed: false,
    })
  }

  return (
    <HStack
      opacity={
        homeRouteParams && !homeRouteParams.isEditing && showCommentBox
          ? 0.3
          : 1
      }
      space={2}
    >
      <Button
        isDisabled={isReviewLoading}
        onPress={() => functionHandleEditControls('update')}
        buttonTheme={'unstyled'}
        bg={'gray.600'}
        w={`1/2`}
        h={`100%`}
      >
        Atualizar Avaliação
      </Button>

      <Button
        isDisabled={isReviewLoading}
        onPress={() => functionHandleEditControls('next')}
        buttonTheme={'unstyled'}
        bg={'red.600'}
        w={`1/2`}
        h={`100%`}
      >
        Próximo Jogo
      </Button>
    </HStack>
  )
}

export default EditingControls
