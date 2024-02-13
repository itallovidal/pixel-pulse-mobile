import React, { ReactNode } from 'react'
import { IGame, IRate } from '../../@types/game'
import { Api } from '../../utilities/axios'
import { GlobalContext } from './globalContextProvider'

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
}

export const ReviewContext = React.createContext({} as IReviewContext)
export function ReviewContextProvider({ children }: { children: ReactNode }) {
  const [rating, setRating] = React.useState<number>(0)
  const [showCommentBox, setShowCommentBox] = React.useState<boolean>(false)
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
  function changeCommentBoxState(newState: boolean) {
    setShowCommentBox(newState)
  }

  function changeReviewLoading(loading: boolean) {
    setIsReviewLoading(loading)
  }

  async function updateGame(filter: `discover` | `forme`) {
    // console.log(filter)
    const game = await getGame(filter)
    updateRating(0)
    setGame(game)
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
  function updateRating(star: number) {
    console.log(star)

    if (star === 0) {
      setShowCommentBox(false)
    } else {
      setShowCommentBox(true)
    }
    setRating(star)
  }

  async function postRating() {
    try {
      changeReviewLoading(true)
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
    } finally {
      changeReviewLoading(false)
    }
  }

  return (
    <ReviewContext.Provider
      value={{
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
