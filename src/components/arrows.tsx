import React from 'react'
import { Center, Icon } from 'native-base'
import { CaretDown } from 'phosphor-react-native'

function Arrows() {
  return (
    <Center my={4}>
      <Icon as={CaretDown} name="CaretDown" color="white" />

      <Icon
        opacity={0.6}
        mt={-3}
        as={CaretDown}
        name="CaretDown"
        color="white"
      />
      <Icon
        opacity={0.3}
        mt={-3}
        as={CaretDown}
        name="CaretDown"
        color="white"
      />
    </Center>
  )
}

export default Arrows
