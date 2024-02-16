import React from 'react'
import { AnimatedHStack } from '../AnimatedComponents'
import { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated'
import Button from '../Button'
import SelectFilter from './selectFilter'
import StarReview from './starReview'
import { ReviewContext } from '../context/ReviewContext'
import Loading from '../Loading'
import { GlobalContext } from '../context/globalContextProvider'
import { VStack } from 'native-base'

function RatingControls() {
  const {
    updateGame,
    isReviewLoading,
    handleUpdatedRating,
    handleSubmitRating,
    gameToEdit,
    state: { filter, rating },
  } = React.useContext(ReviewContext)
  const { navigation } = React.useContext(GlobalContext)

  async function functionHandleEditControls(exec: 'next' | 'update') {
    if (exec === 'next') {
      await updateGame(filter)
    } else {
      await handleUpdatedRating()
    }

    navigation.setParams({
      gameToEdit: {
        stars: 0,
        id: '',
        gameID: 0,
      },
    })
  }

  return isReviewLoading ? (
    <Loading />
  ) : (
    <VStack my={6} space={6}>
      <AnimatedHStack exiting={FadeOut} entering={FadeIn} space={2}>
        {gameToEdit.gameID > 0 ? (
          <>
            <Button
              onPress={() => functionHandleEditControls('update')}
              buttonTheme={'unstyled'}
              bg={'gray.600'}
              w={`1/2`}
              h={`100%`}
            >
              Atualizar Avaliação
            </Button>

            <Button
              onPress={() => functionHandleEditControls('next')}
              buttonTheme={'unstyled'}
              bg={'red.600'}
              w={`1/2`}
              h={`100%`}
            >
              Próximo Jogo
            </Button>
          </>
        ) : (
          <>
            <Button
              isDisabled={rating > 0}
              onPress={() => updateGame(filter)}
              buttonTheme={'unstyled'}
              bg={'gray.600'}
              flex={1}
              h={`100%`}
            >
              Não joguei..
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
          </>
        )}
      </AnimatedHStack>
      <StarReview />
    </VStack>
  )
}

export default RatingControls
