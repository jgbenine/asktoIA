import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
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

  const params = useParams<RoomParams>()

  if (!params.roomId) {
    return <Navigate replace to='/' />
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

  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current?.stop()
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

  return (
    <div className='flex flex-col gap-3 h-screen items-center justify-center'>
      {!isRecording ? (
        <Button onClick={startRecording}>Gravar audio</Button>
      ) : (
        <Button onClick={stopRecording}>Para gravação</Button>
      )}
      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </div>
  )
}
