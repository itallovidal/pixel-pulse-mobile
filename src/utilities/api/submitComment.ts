import { Api } from './axios.config'
import { getComments } from './getComments'

export async function submitComment(
  text: string,
  accessToken: string,
  gameID: number,
) {
  const data = {
    comment: text,
    gameID,
  }
  const response = await Api.post('/games/comment', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status !== 201) {
    throw new Error('Erro no registro de criação do comentário.')
  }

  return await getComments(gameID, accessToken)
}
