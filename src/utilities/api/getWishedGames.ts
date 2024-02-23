import { Api } from './axios.config'

export async function getWishedGames(accessToken: string, page: number) {
  const response = await Api.get(`games/wishPlay/${page}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status !== 200) {
    throw new Error('Não foi possível pegar os títulos.')
  }

  return response.data
}
