import z from 'zod'

export const searchSchema = z.object({
  text: z
    .string({
      required_error: `Para pesquisar, você deve fornecer um nome.`,
    })
    .min(3, {
      message: `Mínimo de 3 caracteres para pesquisar.`,
    }),
})

export type ISearchSchema = z.infer<typeof searchSchema>
