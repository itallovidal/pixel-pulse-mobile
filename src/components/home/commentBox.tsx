import React from 'react'
import { FadeInDown, FadeOut } from 'react-native-reanimated'
import { HStack, TextArea } from 'native-base'
import Button from '../Button'
import { AnimatedVstack } from '../AnimatedComponents'
import { ReviewContext } from '../context/ReviewContext'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorText from '../ErrorText'
import {
  IPostCommentSchema,
  postCommentSchema,
} from '../../schemas/postCommentSchema'

function CommentBox() {
  const { isReviewLoading, handleSubmitComment } =
    React.useContext(ReviewContext)
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<IPostCommentSchema>({
    resolver: zodResolver(postCommentSchema),
  })

  React.useEffect(() => {
    setValue(`text`, ``)
  }, [isSubmitted])

  return (
    <AnimatedVstack
      entering={FadeInDown.duration(300).delay(300)}
      exiting={FadeOut}
      p={4}
      bg={'gray.700'}
      w={'full'}
      my={6}
    >
      {errors.text?.message && <ErrorText error={errors.text?.message} />}
      <Controller
        control={control}
        name={'text'}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextArea
            isDisabled={isReviewLoading}
            _disabled={{
              opacity: 0.4,
            }}
            _focus={{
              borderColor: errors.text ? `red.600` : `gray.700`,
            }}
            borderColor={errors.text ? `red.600` : `gray.700`}
            autoCompleteType
            variant={'unstyled'}
            placeholder={'Digite um breve comentário.'}
            borderWidth={2}
            bgColor={'gray.400'}
            mb={4}
            p={4}
            color={'white'}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />

      <Button
        onPress={handleSubmit(handleSubmitComment)}
        isDisabled={isReviewLoading}
        buttonTheme={'whiteTheme'}
        alignSelf={'flex-end'}
      >
        Postar
      </Button>
    </AnimatedVstack>
  )
}

export default CommentBox
