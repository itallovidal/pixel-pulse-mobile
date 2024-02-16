import { Api } from './axios.config'
import { IComment } from '../../@types/game'

export async function getComments(id: number, accessToken: string) {
  const response = await Api.get(`/games/comment/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status !== 200) {
    throw new Error('Erro na busca pelos comentários.')
  }

  return response.data.length === 0 ? [null] : (response.data as IComment[])
}
