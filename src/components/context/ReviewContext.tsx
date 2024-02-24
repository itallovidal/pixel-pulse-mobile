import React, { ReactNode } from 'react'
import { IGame } from '../../@types/game'
import { GlobalContext } from './globalContextProvider'
import { IPostCommentSchema } from '../../schemas/postCommentSchema'
import {
  IReviewReducerState,
  reviewContextReducer,
} from '../../utilities/reducers/reviewContextReducer'
import { getGame } from '../../utilities/api/getGame'
import { getComments } from '../../utilities/api/getComments'
import { submitComment } from '../../utilities/api/submitComment'
import { postRating } from '../../utilities/api/submitRating'
import { useRoute } from '@react-navigation/native'
import { submitUpdatedRating } from '../../utilities/api/submitUpdatedRating'
import { addToWishPlay } from '../../utilities/api/addToWishPlay'
import { removeFromWishPlay } from '../../utilities/api/removeFromWishPlay'

interface IReviewContext {
  state: IReviewReducerState
  showCommentBox: boolean
  isReviewLoading: boolean
  updateRating: (star: number) => void
  changeFilterState: (state: `discover` | `forme`) => void
  updateGame: (
    filter: `discover` | `forme`,
    gameID?: number,
    state?: 'isEditing' | 'isWished' | 'isSearched',
  ) => Promise<void>
  handleSubmitComment: ({ text }: IPostCommentSchema) => Promise<void>
  handleSubmitRating: () => Promise<void>
  homeRouteParams:
    | undefined
    | {
        id: string
        isEditing: boolean
        isWishListed: boolean
        gameID: number
        isSearched: boolean
      }
  handleUpdatedRating: () => Promise<void>
  handleUpdateWishList: (
    action: 'add' | 'remove',
    id: number | string,
  ) => Promise<void>
}
//
export const ReviewContext = React.createContext({} as IReviewContext)
export function ReviewContextProvider({ children }: { children: ReactNode }) {
  const { showToast, userToken } = React.useContext(GlobalContext)
  const [showCommentBox, setShowCommentBox] = React.useState<boolean>(false)
  const [isReviewLoading, setIsReviewLoading] = React.useState(false)
  const homeRouteParams = useRoute().params as {
    id: string
    isEditing: boolean
    isWishListed: boolean
    gameID: number
    isSearched: boolean
  }

  const [state, dispatch] = React.useReducer(reviewContextReducer, {
    game: {} as IGame,
    rating: 0,
    filter: `discover`,
    commentaries: [null],
  })

  React.useEffect(() => {
    updateGame(state.filter)
  }, [state.filter])

  async function handleUpdatedRating() {
    try {
      setIsReviewLoading(true)
      const data = {
        id: homeRouteParams.id,
        stars: state.rating,
      }

      await submitUpdatedRating(data)
      await updateGame(state.filter)

      showToast({
        bg: 'green.700',
        title: 'Jogo Atualizado com sucesso!',
        placement: 'top',
      })
    } catch (e) {
      console.log(e)
    }
  }

  async function handleUpdateWishList(
    action: 'add' | 'remove',
    id: number | string,
  ) {
    try {
      setIsReviewLoading(true)

      if (action === 'add' && typeof id === 'number') {
        const payload = await addToWishPlay(userToken!.accessToken, id)
        dispatch({ type: 'SET_WISHLIST_INFO', payload })
        return
      }

      if (action === 'remove' && typeof id === 'string') {
        await removeFromWishPlay(userToken!.accessToken, id)
        dispatch({
          type: 'SET_WISHLIST_INFO',
          payload: {
            isListed: false,
            id: '',
          },
        })
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsReviewLoading(false)
    }
  }

  async function updateGame(
    filter: `discover` | `forme`,
    gameID?: number,
    state?: 'isEditing' | 'isWished' | 'isSearched',
  ) {
    try {
      setIsReviewLoading(true)
      const game = await getGame(filter, userToken!.accessToken, gameID)
      dispatch({ type: 'SET_GAME', payload: game })

      const comments = await getComments(game.info.id, userToken!.accessToken)
      dispatch({ type: 'SET_COMMENTARIES', payload: comments })

      updateRating(game.rating.stars ? game.rating.stars : 0)
      if (gameID && state === 'isEditing') {
        setShowCommentBox(true)
        return
      }
      setShowCommentBox(false)
    } catch (e) {
    } finally {
      setIsReviewLoading(false)
    }
  }

  function changeFilterState(state: `discover` | `forme`) {
    dispatch({ type: 'SET_FILTER', payload: state })
  }

  function updateRating(star: number) {
    dispatch({ type: 'SET_RATING', payload: star })
  }

  async function handleSubmitComment({ text }: IPostCommentSchema) {
    try {
      setIsReviewLoading(true)
      const comments = await submitComment(
        text,
        userToken!.accessToken,
        state.game.info.id,
      )

      dispatch({ type: 'SET_COMMENTARIES', payload: comments })

      showToast({
        bg: 'green.700',
        placement: 'top',
        title: 'Comentário postado com sucesso!',
      })
    } catch (e) {
      console.log(e)
    } finally {
      setIsReviewLoading(false)
    }
  }

  async function handleSubmitRating() {
    try {
      setIsReviewLoading(true)
      await postRating(state.game.info.id, state.rating, userToken!.accessToken)
      if (state.game.rating.stars === 0) {
        setShowCommentBox(false)
      } else {
        setShowCommentBox(true)
      }

      showToast({
        bg: 'green.700',
        placement: 'top',
        title: 'Jogo avaliado com sucesso!',
      })
    } catch (e) {
      console.log(e)
    } finally {
      setIsReviewLoading(false)
    }
  }

  return (
    <ReviewContext.Provider
      value={{
        handleUpdateWishList,
        handleSubmitComment,
        state,
        isReviewLoading,
        showCommentBox,
        updateRating,
        changeFilterState,
        updateGame,
        handleSubmitRating,
        handleUpdatedRating,
        homeRouteParams,
      }}
    >
      {children}
    </ReviewContext.Provider>
  )
}
