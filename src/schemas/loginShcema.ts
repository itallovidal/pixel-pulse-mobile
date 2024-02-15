import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Digite o email, por favor.',
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
})

export type ILoginSchema = z.infer<typeof loginSchema>
