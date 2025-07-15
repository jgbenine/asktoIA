import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().startsWith('postgresql://'),
  API_KEY_GEMINI: z.string()
})

export const env = envSchema.parse(process.env)
