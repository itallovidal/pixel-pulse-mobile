import React from 'react'
import { Center, Spinner } from 'native-base'

function Loading() {
  return (
    <Center flex={1} p={4}>
      <Spinner flex={1} color={'red.600'} size={'lg'}></Spinner>
    </Center>
  )
}

export default Loading
