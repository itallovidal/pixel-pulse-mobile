import React, { ReactNode } from 'react'
import { IComment, IGame, IRate } from '../../@types/game'
import { Api } from '../../utilities/axios'
import { GlobalContext } from './globalContextProvider'
import { IPostCommentSchema } from '../../schemas/postCommentSchema'

interface IReviewContext {
  updateRating: (star: number) => void
  rating: number
  getGame: (filter: `discover` | `forme`) => Promise<IGame>
  updateGame: (filter: `discover` | `forme`) => Promise<void>
  game: IGame | undefined
  postRating: () => void
  isReviewLoading: boolean
  changeReviewLoading: (loading: boolean) => void
  showCommentBox: boolean
  changeCommentBoxState: (state: boolean) => void
  changeFilterState: (state: `discover` | `forme`) => void
  filter: `discover` | `forme`
  submitComment: ({ text }: IPostCommentSchema) => void
  commentaries: IComment[] | null[]
  changeCommentsState: (state: IComment[]) => void
}

export const ReviewContext = React.createContext({} as IReviewContext)
export function ReviewContextProvider({ children }: { children: ReactNode }) {
  const [rating, setRating] = React.useState<number>(0)
  const [showCommentBox, setShowCommentBox] = React.useState<boolean>(false)
  const [commentaries, setCommentaries] = React.useState<IComment[] | null[]>([
    null,
  ])
  const { showToast, userToken } = React.useContext(GlobalContext)
  const [game, setGame] = React.useState<IGame>()
  const [isReviewLoading, setIsReviewLoading] = React.useState(false)
  const [filter, setFilter] = React.useState<`discover` | `forme`>(`discover`)

  React.useEffect(() => {
    updateGame(filter)
  }, [filter])

  function changeFilterState(state: `discover` | `forme`) {
    setFilter(state)
  }

  function changeCommentsState(state: any[]) {
    setCommentaries(state)
  }

  function changeCommentBoxState(newState: boolean) {
    setShowCommentBox(newState)
  }

  function changeReviewLoading(loading: boolean) {
    setIsReviewLoading(loading)
  }

  function updateRating(star: number) {
    if (star === 0) {
      setShowCommentBox(false)
    } else {
      setShowCommentBox(true)
    }
    setRating(star)
  }

  async function getComments(id: number) {
    try {
      changeReviewLoading(true)

      const response = await Api.get(`/games/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken?.accessToken}`,
        },
      })

      if (response.status !== 200) {
        throw new Error('Erro na req')
      }

      return response.data.length === 0 ? [null] : (response.data as IComment[])
    } catch (e) {
      console.log(e)
      return [null]
    } finally {
      changeReviewLoading(false)
    }
  }

  async function submitComment({ text }: IPostCommentSchema) {
    try {
      changeReviewLoading(true)
      const data = {
        comment: text,
        gameID: game?.id,
      }
      const response = await Api.post('/games/comment', data, {
        headers: {
          Authorization: `Bearer ${userToken?.accessToken}`,
        },
      })

      if (response.status !== 201) {
        throw new Error('Erro na req')
      }

      showToast({
        bg: 'green.700',
        placement: 'top',
        title: 'Comentário postado com sucesso!',
      })
      const comments = await getComments(game!.id)
      if (comments) setCommentaries(comments)
    } catch (e) {
      console.log(e)
    } finally {
      changeReviewLoading(false)
    }
  }

  async function updateGame(filter: `discover` | `forme`) {
    // console.log(filter)
    const game = await getGame(filter)
    updateRating(0)
    setGame(game)
    const comments = await getComments(game.id)
    console.log(comments)
    setCommentaries(comments)
  }
  async function getGame(filter: `discover` | `forme`) {
    try {
      setIsReviewLoading(true)
      const { data } = await Api.get(`/games/random/${filter}`, {
        headers: {
          Authorization: `Bearer ${userToken?.accessToken}`,
        },
      })
      return data
    } catch (e) {
      console.log(e)
    } finally {
      setIsReviewLoading(false)
    }
  }

  async function postRating() {
    try {
      const data = {
        gameID: game?.id,
        stars: rating,
      }
      const response = await Api.post('/games/rate', data, {
        headers: {
          Authorization: `Bearer ${userToken?.accessToken}`,
        },
      })

      if (response.status !== 201) {
        console.log(response.data.error[0].path)
        throw new Error('Erro na req')
      }
      await updateGame(filter)
      showToast({
        bg: 'green.700',
        placement: 'top',
        title: 'Jogo avaliado com sucesso!',
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ReviewContext.Provider
      value={{
        changeCommentsState,
        commentaries,
        submitComment,
        updateGame,
        filter,
        updateRating,
        rating,
        getGame,
        changeFilterState,
        game,
        postRating,
        changeReviewLoading,
        isReviewLoading,
        showCommentBox,
        changeCommentBoxState,
      }}
    >
      {children}
    </ReviewContext.Provider>
  )
}
