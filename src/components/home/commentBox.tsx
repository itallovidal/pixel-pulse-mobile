import React from 'react'
import { FadeInDown, FadeOut } from 'react-native-reanimated'
import { HStack, TextArea } from 'native-base'
import Button from '../Button'
import { AnimatedVstack } from '../AnimatedComponents'
import { GlobalContext } from '../context/globalContextProvider'
import { ReviewContext } from '../context/ReviewContext'

function CommentBox() {
  const { postRating, isReviewLoading } = React.useContext(ReviewContext)

  return (
    <AnimatedVstack
      entering={FadeInDown.duration(300).delay(300)}
      exiting={FadeOut}
      p={4}
      bg={'gray.700'}
      w={'full'}
      my={6}
    >
      <TextArea
        isDisabled={isReviewLoading}
        _disabled={{
          opacity: 0.4,
        }}
        autoCompleteType
        variant={'unstyled'}
        placeholder={'Digite um breve comentário.'}
        borderWidth={0}
        bgColor={'gray.400'}
        mb={4}
        p={4}
        color={'white'}
      />
      <HStack justifyContent={'flex-end'}>
        <Button
          isLoading={isReviewLoading}
          onPress={() => postRating()}
          buttonTheme={'unstyled'}
        >
          Avaliar sem comentárioa
        </Button>
        <Button isDisabled={isReviewLoading} buttonTheme={'whiteTheme'}>
          Postar
        </Button>
      </HStack>
    </AnimatedVstack>
  )
}

export default CommentBox
