import { Api } from './axios.config'

export async function removeFromWishPlay(accessToken: string, id: string) {
  console.log('->')
  console.log(id)
  const response = await Api.delete(`/games/wishPlay/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (response.status !== 200) {
    console.log(response.status)
    throw new Error('erro ao remover da wishlist.')
  }
}
