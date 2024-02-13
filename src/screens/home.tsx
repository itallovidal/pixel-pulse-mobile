import React from 'react'
import { Box, FlatList, HStack, TextArea, VStack } from 'native-base'

import Button from '../components/Button'
import Comment from '../components/home/comment'
import Header from '../components/home/header'
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOut,
} from 'react-native-reanimated'
import EmptyComment from '../components/home/emptyComment'
import {
  ReviewContext,
  ReviewContextProvider,
} from '../components/context/ReviewContext'
import CommentBox from '../components/home/commentBox'
import { AnimatedVstack } from '../components/AnimatedComponents'
import Review from '../components/home/review'


function Home() {


  return (
    <Box flex={1} bg={'gray.700'}>
      <ReviewContextProvider>
        <AnimatedVstack
          entering={FadeInUp.duration(1000).delay(300)}
          bg={'gray.700'}
          flex={1}
        >
          <Review />
        </AnimatedVstack>
      </ReviewContextProvider>
    </Box>
  )
}

export default Home
