import z from 'zod'

export const postCommentSchema = z.object({
  text: z
    .string({
      required_error: `Para postar um comentário, você deve escreve-lo.`,
    })
    .min(10, {
      message: `Mínimo de 10 caracteres para fazer um comentário.`,
    }),
})

export type IPostCommentSchema = z.infer<typeof postCommentSchema>
