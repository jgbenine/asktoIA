import { ArrowLeft } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

type RoomParams = {
  roomId: string
}

export function RecordRoomAudio() {
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current?.stop()
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  async function uploadAudio(audio: Blob) {
    //Send file recording back-end
    const formData = new FormData()

    formData.append('file', audio, 'audio.web')

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData
      }
    )

    const result = await response.json()

    console.log(result)
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('Gravação iniciada!')
    }

    recorder.current.onstop = () => {
      console.log('Gravação interrompida!')
    }
    recorder.current.start()
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('Seu navegador não suporta gravação')
      return
    }
    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100
      }
    })

    createRecorder(audio)

    intervalRef.current = setInterval(() => {
      recorder.current?.stop()
      createRecorder(audio)
    }, 5000)
  }

  const params = useParams<RoomParams>()

  if (!params.roomId) {
    return <Navigate replace to='/' />
  }

  return (
    <div className='container mx-auto max-w-4xl px-2 py-8 m-2 rounded-2xl'>
      <div className='flex flex-col'>
        <Link to={`/room/${params.roomId}`}>
          <Button variant='outline' className='cursor-pointer mb-8'>
            <ArrowLeft className='mr-2 size-4' />
            Voltar p/ Sala
          </Button>
        </Link>
        <h1 className='mb-2 font-bold text-3xl text-foreground'>
          Gravação de audio
        </h1>
        <p className='text-muted-foreground'>
          Grave seus audios para fornecer como resposta para I.A
        </p>
      </div>
      <div className='mt-12 flex flex-col gap-3 justify-center'>
        {!isRecording ? (
          <Button onClick={startRecording} className='cursor-pointer'>
            Gravar Áudio
          </Button>
        ) : (
          <Button onClick={stopRecording} className='cursor-pointer'>
            Para Gravação
          </Button>
        )}
        <span className='text-center'>
          {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
        </span>
      </div>
    </div>
  )
}
