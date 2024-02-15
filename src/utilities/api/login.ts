import { Api } from './axios.config'
import { LoginDataException } from '../../exceptions/LoginDataException'
import { ILoginSchema } from '../../schemas/loginSchema'

export async function login(data: ILoginSchema) {
  const response = await Api.post('/users/login', data)

  if (response.status === 404 || response.status === 403) {
    throw new LoginDataException(response.data)
  }

  if (response.status !== 200) {
    throw new Error('ops')
  }

  return response.data
}
