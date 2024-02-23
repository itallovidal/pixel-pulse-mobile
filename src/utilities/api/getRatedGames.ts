import { Api } from './axios.config'
import { IRatedData, IRatedGame } from '../../@types/game'

export async function getRatedGames(accessToken: string, page: number) {
  const response = await Api.get(`games/rated/${page}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status !== 200) {
    throw new Error('Erro no fetch dos jogos avaliados.')
  }

  return response.data as IRatedGame[]
}
