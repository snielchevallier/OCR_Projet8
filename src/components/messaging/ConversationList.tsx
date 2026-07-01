import ConversationItem from "./ConversationItem"
import type { MockConversation } from "./mockData"

type Props = {
  conversations: MockConversation[]
  selectedId: number | null
  onSelect: (id: number) => void
}

export default function ConversationList({ conversations, selectedId, onSelect }: Props) {
  return (
    <ul className="divide-y divide-grey-light" role="list">
      {conversations.map((conv) => (
        <li key={conv.id}>
          <ConversationItem
            name={conv.participantName}
            preview={conv.lastMessage}
            time={conv.time}
            unread={conv.unread}
            isSelected={selectedId === conv.id}
            onClick={() => onSelect(conv.id)}
          />
        </li>
      ))}
    </ul>
  )
}