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
import { ReviewContextProvider } from '../components/context/ReviewContext'
import CommentBox from '../components/home/commentBox'

const data: any[] = []

const AnimatedVStack = Animated.createAnimatedComponent(VStack)

function Home() {
  const [show, setShow] = React.useState(false)

  return (
    <Box flex={1} bg={'gray.700'}>
      <ReviewContextProvider>
        <AnimatedVStack
          entering={FadeInUp.duration(1000).delay(300)}
          bg={'gray.700'}
          flex={1}
        >
          <FlatList
            onScroll={({ nativeEvent: { contentOffset } }) => {
              console.log(contentOffset)
              if (contentOffset.y > 10) {
                setShow(true)
              }

              if (contentOffset.y === 0) {
                setShow(false)
              }
            }}
            ListHeaderComponent={<Header />}
            data={data}
            ListEmptyComponent={<EmptyComment opcty={show} />}
            renderItem={() => {
              return <Comment opcty={show} />
            }}
          />

          {show ? <CommentBox /> : null}
        </AnimatedVStack>
      </ReviewContextProvider>
    </Box>
  )
}

export default Home
