import { ISignupSchema } from '../../schemas/signupSchema'
import { Api } from './axios.config'

export async function signup(formData: ISignupSchema) {
  const response = await Api.post('users/signup', formData, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  if (response.status !== 201) {
    throw new Error('Não foi possível criar o usuário.')
  }
}
