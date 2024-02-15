import { z } from 'zod'
import { GENRES } from '../@types/game'

export const signupSchema = z
  .object({
    name: z
      .string({
        required_error: 'Informe o nick!',
      })
      .min(5, {
        message: `Seu nick deve conter pelo menos 5 caracteres.`,
      }),
    email: z
      .string({
        required_error: 'Prencha o email, por favor.',
      })
      .min(5, {
        message: 'Email deve conter mais de 5 caracteres.',
      })
      .email({
        message: 'Email inválido!',
      }),
    password: z
      .string({
        required_error: 'Por favor, digite a senha!',
      })
      .min(8, {
        message: 'Senha deve conter mais de 8 caracteres.',
      }),
    passwordConfirmation: z
      .string({
        required_error: 'Por favor, confirme a senha!',
      })
      .min(8, {
        message: 'Senha deve conter mais de 8 caracteres.',
      }),
    favGenre1: z
      .number({
        required_error: 'Por favor, escolha seu gênero favorito 1!',
      })
      .refine((arg) => {
        return GENRES.some((genre) => {
          return genre.id === arg
        })
      }),
    favGenre2: z
      .number({
        required_error: 'Por favor, escolha seu gênero favorito 2!',
      })
      .refine((arg) => {
        return GENRES.some((genre) => {
          return genre.id === arg
        })
      }),

    favoriteGame: z
      .string({
        required_error: 'Qual jogo mais te marcou?',
      })
      .min(4),
  })
  .refine(
    ({ password, passwordConfirmation }) => {
      return password === passwordConfirmation
    },
    {
      message: 'Senhas não coincidem',
      path: ['passwordConfirmation'],
    },
  )
  .refine(
    ({ favGenre1, favGenre2 }) => {
      console.log(favGenre1, favGenre2)
      return favGenre1 !== favGenre2
    },
    {
      message: 'Os gêneros não podem ser iguais!',
      path: ['favGenre2'],
    },
  )

export type ISignupSchema = z.infer<typeof signupSchema>
