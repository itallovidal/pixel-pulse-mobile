import { Api } from './axios.config'

export async function addToWishPlay(accessToken: string, gameID: number) {
  console.log(gameID)

  const response = await Api.post(
    `/games/wishPlay/${gameID}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  if (response.status !== 201) {
    throw new Error('erro ao adicionar na wishlist.')
  }

  const { data } = response

  return {
    id: data.registry.id,
    isListed: true,
  }
}
