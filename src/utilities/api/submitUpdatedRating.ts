import { Api } from './axios.config'
import { IGameToEdit } from '../../routes/routes'

export async function submitUpdatedRating({
  id,
  stars,
}: Omit<IGameToEdit, 'gameID'>) {
  const response = await Api.patch(`games/rate/${id}`, {
    stars,
  })

  if (response.status !== 200) {
    throw new Error('Erro na atualização do jogo.')
  }
}
