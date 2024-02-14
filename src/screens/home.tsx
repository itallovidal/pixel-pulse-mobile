import React from 'react'
import { Box } from 'native-base'

import { FadeInUp } from 'react-native-reanimated'
import { ReviewContextProvider } from '../components/context/ReviewContext'
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
