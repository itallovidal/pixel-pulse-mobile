import { Api } from './axios.config'

export async function postRating(
  gameID: number,
  rating: number,
  accessToken: string,
) {
  const data = {
    gameID,
    stars: rating,
  }
  const response = await Api.post('/games/rate', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status !== 201) {
    throw new Error('Erro na criação da postagem das estrelas.')
  }
}
