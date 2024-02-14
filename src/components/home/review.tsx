import React from 'react'
import { FlatList } from 'native-base'
import Header from './header'
import Comment from './comment'
import { ReviewContext } from '../context/ReviewContext'
import CommentBox from './commentBox'
import { AnimatedView } from '../AnimatedComponents'
import { EmptyComment } from './emptyComment'
import { IComment } from '../../@types/game'

function Review() {
  const { game, showCommentBox, commentaries } = React.useContext(ReviewContext)

  React.useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
    }
  }, [game?.id])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const flatListRef = React.useRef<FlatList>(null)
  function scrollToCommentSection() {

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
        data={commentaries}
        onLayout={() => scrollToCommentSection()}
        renderItem={({ item }) => {
          return commentaries[0] === null ? (
            <EmptyComment opcty={!showCommentBox} />
          ) : (
            <Comment data={item as IComment} opcty={showCommentBox} />
          )
        }}
      />

      {showCommentBox ? <CommentBox /> : null}
    </AnimatedView>
  )
}

export default Review
