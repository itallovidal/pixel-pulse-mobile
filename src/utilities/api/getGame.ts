import { Api } from './axios.config'
import { IGame } from '../../@types/game'

export async function getGame(
  filter: `discover` | `forme`,
  accessToken: string,
  gameID?: number,
): Promise<IGame> {
  const route = gameID ? `/games/get/${gameID}` : `/games/random/${filter}`

  const { data } = await Api.get(route, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data as IGame
}
