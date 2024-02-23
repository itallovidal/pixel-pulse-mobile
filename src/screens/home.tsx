import React from 'react'
import { Box } from 'native-base'
import { ReviewContextProvider } from '../components/context/ReviewContext'
import FlatListContainer from '../components/home/flatListContainer'

function Home() {
  return (
    <ReviewContextProvider>
      <Box flex={1} bg={'gray.700'}>
        <FlatListContainer />
      </Box>
    </ReviewContextProvider>
  )
}

export default Home
