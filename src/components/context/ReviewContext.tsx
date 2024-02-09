import React, { ReactNode } from 'react'
import { IGame, IRate } from '../../@types/game'
import { Api } from '../../utilities/axios'
import { GlobalContext } from './globalContextProvider'

interface IReviewContext {
  updateRating: (star: number) => void
  rating: number
  getGame: () => Promise<IGame>
  updateGame: () => Promise<void>
  game: IGame | undefined
  postRating: () => void
}

export const ReviewContext = React.createContext({} as IReviewContext)
export function ReviewContextProvider({ children }: { children: ReactNode }) {
  const [rating, setRating] = React.useState<number>(1)
  const { showToast, userToken } = React.useContext(GlobalContext)
  const [game, setGame] = React.useState<IGame>()

  async function updateGame() {
    const game = await getGame()
    setGame(game)
  }
  async function getGame() {
    try {
      const { data } = await Api.get('/games/random')
      return data
    } catch (e) {
      console.log(e)
    }
  }
  function updateRating(star: number) {
    setRating(star)
  }

  async function postRating() {
    console.log(userToken?.accessToken)
    console.log('------------')
    console.log(rating)
    console.log('------------')

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
      await updateGame()
      showToast({
        bg: 'green.500',
        placement: 'top',
        title: 'Jogo avaliado com sucesso!',
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ReviewContext.Provider
      value={{ updateGame, updateRating, rating, getGame, game, postRating }}
    >
      {children}
    </ReviewContext.Provider>
  )
}
