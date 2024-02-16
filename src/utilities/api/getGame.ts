import { Api } from './axios.config'

export async function getGame(
  filter: `discover` | `forme`,
  accessToken: string,
  gameID?: number,
) {
  const route = gameID ? `/games/${gameID}` : `/games/random/${filter}`

  const { data } = await Api.get(route, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data
}
