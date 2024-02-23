import React from 'react'
import { FlatList } from 'native-base'
import Header from './header/header'
import Comment from './comment'
import { ReviewContext } from '../context/ReviewContext'
import CommentBox from './commentBox'
import {
  AnimatedFlatlist,
  AnimatedView,
  AnimatedVstack,
} from '../AnimatedComponents'
import { EmptyComment } from './emptyComment'
import { IComment } from '../../@types/game'
import Loading from '../Loading'
import {FadeInDown, FadeInUp, FadeOut, Layout} from 'react-native-reanimated'

function FlatListContainer() {
  const {
    state: { game, commentaries },
    showCommentBox,
    isReviewLoading,
  } = React.useContext(ReviewContext)
  React.useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
    }
  }, [game.info])
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

  if (!game.info) return <Loading />

  return (
    <AnimatedVstack
      entering={FadeInUp.duration(1000).delay(300)}
      bg={'gray.700'}
      flex={1}
    >
      <AnimatedFlatlist
        // layout={FadeInDown}
        ref={flatListRef}
        ListHeaderComponent={<Header />}
        data={commentaries}
        onLayout={() => scrollToCommentSection()}
        renderItem={({ item }) => {
          if (commentaries[0] === null)
            return <EmptyComment opcty={!showCommentBox} />
          if (isReviewLoading) return <></>
          return <Comment data={item as IComment} opcty={showCommentBox} />
        }}
      />

      {showCommentBox && !isReviewLoading ? <CommentBox /> : null}
    </AnimatedVstack>
  )
}

export default FlatListContainer
