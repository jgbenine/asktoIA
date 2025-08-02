export type GetRoomsResponse = Array<{
  id: string
  name: string
  questionsCount: number
  createdAt: string
}>

export type CreateRoomRequest = {
  name: string
  description: string
}

export type CreateRoomResponse = {
  roomId: string
}

export type GetRoomQuestionsResponse = Array<{
  id: string
  question: string
  answer: string | null
  createdAt: string
  isGeneratingAnswer?: boolean
}>

export type CreateQuestionRequest = {
  question: string
}

export type CreateQuestionResponse = {
  questionId: string
  answer: string | null
}
