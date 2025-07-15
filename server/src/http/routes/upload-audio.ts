import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { transcribeAudio } from '../../services/gemini.ts'

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/audio',
    {
      schema: {
        params: z.object({
          roomId: z.string()
        })
      }
    },
    async (request) => {
      const { roomId } = request.params

      const audio = await request.file()

      if (!audio) {
        throw new Error('Audio is required')
      }

      const audioBuffer = audio.toBuffer()
      const audioAsBase64 = (await audioBuffer).toString('base64')

      //Transcrition audio
      const transcriptionAudio = await transcribeAudio(
        audioAsBase64,
        audio.mimetype
      )

      return { transcriptionAudio }
    }
  )
}
