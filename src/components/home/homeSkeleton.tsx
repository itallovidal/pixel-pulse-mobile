import React from 'react'
import { Center, HStack, Skeleton, VStack } from 'native-base'

function HomeSkeleton() {
  return (
    <Center w="100%">
      <VStack
        w="full"
        space={4}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
      >
        <Skeleton speed={0.8} h="40" />
        <Skeleton.Text speed={0.5} px="4" />

        <HStack justifyContent={'center'} p={3} space={4}>
          <Skeleton
            rounded={'lg'}
            speed={0.8}
            w={`45%`}
            startColor="gray.100"
          />
          <Skeleton
            rounded={'lg'}
            speed={0.8}
            w={`45%`}
            startColor="gray.100"
          />
        </HStack>
      </VStack>
    </Center>
  )
}

export default HomeSkeleton
