export type MockMessage = {
  id: number
  from: 'me' | 'other'
  content: string
  time: string
  dateKey: string
  dateLabel: string
}

export type MockConversation = {
  id: number
  participantName: string
  lastMessage: string
  time: string
  unread: boolean
  messages: MockMessage[]
}

const MSG =
  "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?"

const MESSAGES: MockMessage[] = [
  { id: 1, from: 'other', content: MSG, time: "11:04pm", dateKey: "2025-09-01", dateLabel: "01 Septembre 2025" },
  { id: 2, from: 'other', content: MSG, time: "11:04pm", dateKey: "2025-09-01", dateLabel: "01 Septembre 2025" },
  { id: 3, from: 'me',    content: MSG, time: "11:04pm", dateKey: "2025-09-01", dateLabel: "01 Septembre 2025" },
  { id: 4, from: 'other', content: MSG, time: "11:04pm", dateKey: "2025-09-03", dateLabel: "03 Septembre 2025" },
  { id: 5, from: 'me',    content: MSG, time: "11:04pm", dateKey: "2025-09-03", dateLabel: "03 Septembre 2025" },
  { id: 6, from: 'other', content: MSG, time: "11:04pm", dateKey: "2025-09-03", dateLabel: "03 Septembre 2025" },
]

export const MOCK_CONVERSATIONS: MockConversation[] = [
  { id: 1, participantName: "Utilisateur", lastMessage: MSG, time: "11:04 am", unread: true,  messages: MESSAGES },
  { id: 2, participantName: "Utilisateur", lastMessage: MSG, time: "11:04 am", unread: true,  messages: MESSAGES },
  { id: 3, participantName: "Utilisateur", lastMessage: MSG, time: "11:04 am", unread: true,  messages: [] },
  { id: 4, participantName: "Utilisateur", lastMessage: MSG, time: "11:04 am", unread: false, messages: [] },
  { id: 5, participantName: "Utilisateur", lastMessage: MSG, time: "11:04 am", unread: false, messages: [] },
  { id: 6, participantName: "Utilisateur", lastMessage: MSG, time: "11:04 am", unread: false, messages: [] },
  { id: 7, participantName: "Utilisateur", lastMessage: MSG, time: "11:04 am", unread: false, messages: [] },
  { id: 8, participantName: "Utilisateur", lastMessage: MSG, time: "11:04 am", unread: false, messages: [] },
]
