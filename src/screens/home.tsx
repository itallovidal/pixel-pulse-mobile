import React from 'react'
import { Box } from 'native-base'
import { ReviewContextProvider } from '../components/context/ReviewContext'
import FlatListContainer from '../components/home/flatListContainer'

import { SearchButton } from '../components/searchButton'

function Home() {
  return (
    <ReviewContextProvider>
      <Box flex={1} position={'relative'} bg={'gray.700'}>
        <SearchButton />
        <FlatListContainer />
      </Box>
    </ReviewContextProvider>
  )
}

export default Home
