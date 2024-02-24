import { Api } from './axios.config'
import { IGameCard } from '../../@types/game'

export async function searchGame(q: string): Promise<IGameCard[]> {
  const response = await Api.get(`games/search?q=${q}`)

  if (response.status !== 200) {
    throw new Error('Não foi possível fazer a pesquisa.')
  }

  return response.data
}
