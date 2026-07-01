import MessageBubble from "./MessageBubble"
import DateSeparator from "./DateSeparator"
import MessageInput from "./MessageInput"
import type { MockConversation, MockMessage } from "./mockData"

type SeparatorItem = { type: 'separator'; label: string; key: string }
type ThreadItem = MockMessage | SeparatorItem

function buildThreadItems(messages: MockMessage[]): ThreadItem[] {
  return messages.reduce<ThreadItem[]>((acc, msg, i) => {
    const prev = messages[i - 1]
    if (!prev || prev.dateKey !== msg.dateKey) {
      acc.push({ type: 'separator', label: msg.dateLabel, key: `sep-${msg.dateKey}` })
    }
    acc.push(msg)
    return acc
  }, [])
}

type Props = {
  conversation: MockConversation | null
  onBack: () => void
}

export default function ChatThread({ conversation, onBack }: Props) {
  const items = conversation ? buildThreadItems(conversation.messages) : []

  return (
    <div className="flex flex-col h-full">
      {/* Back button — mobile only */}
      <div className="md:hidden px-4 pt-4 pb-2 shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl bg-grey-light px-4 py-2.5 text-sm text-grey-dark transition-colors hover:bg-grey-dark/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
        >
          <span aria-hidden="true">←</span>
          Retour
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {items.map((item) => {
          if ('type' in item && item.type === 'separator') {
            return <DateSeparator key={item.key} label={item.label} />
          }
          const msg = item as MockMessage
          return (
            <MessageBubble
              key={msg.id}
              content={msg.content}
              time={msg.time}
              senderName={conversation?.participantName ?? "Utilisateur"}
              isOwn={msg.from === 'me'}
            />
          )
        })}
      </div>

      <MessageInput />
    </div>
  )
}