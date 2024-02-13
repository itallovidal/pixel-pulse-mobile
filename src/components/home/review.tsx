import React from 'react'
import { FlatList } from 'native-base'
import Header from './header'
import EmptyComment from './emptyComment'
import Comment from './comment'
import { ReviewContext } from '../context/ReviewContext'
import CommentBox from './commentBox'
import { AnimatedView } from '../AnimatedComponents'
const data: any[] = [{}]

function Review() {
  const { game, showCommentBox } = React.useContext(ReviewContext)

  React.useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
    }
  }, [game?.id])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const flatListRef = React.useRef<FlatList>(null)
  function scrollToCommentSection() {
    console.log('jogo novo')

    if (!showCommentBox) {
      return
    }

    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true })
    }
  }

  return (
    <AnimatedView flex={1}>
      <FlatList
        ref={flatListRef}
        ListHeaderComponent={<Header />}
        data={data}
        onLayout={() => scrollToCommentSection()}
        renderItem={() => {
          return !data[0].id ? (
            <EmptyComment opcty={showCommentBox} />
          ) : (
            <Comment opcty={showCommentBox} />
          )
        }}
      />

      {showCommentBox ? <CommentBox /> : null}
    </AnimatedView>
  )
}

export default Review
