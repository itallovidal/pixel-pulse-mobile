import React from 'react'
import { Divider, Text } from 'native-base'

function TextHeader({ h1, h2 }: { h1: string; h2: string }) {
  return (
    <>
      <Text mt={6} color={'white'} fontWeight={'bold'} fontSize={32}>
        {h1}
      </Text>
      <Text color={'white'}> {h2}</Text>
      <Divider my={4} h={1} bg={'red.500'} w={'10%'} />
    </>
  )
}

export default TextHeader
