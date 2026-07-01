"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ConversationList from "@/components/messaging/ConversationList"
import ChatThread from "@/components/messaging/ChatThread"
import { MOCK_CONVERSATIONS } from "@/components/messaging/mockData"

export default function MessageriePage() {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<number>(MOCK_CONVERSATIONS[0].id)
  const [showThread, setShowThread] = useState(false)

  const selectedConv = MOCK_CONVERSATIONS.find((c) => c.id === selectedId) ?? null

  function handleSelect(id: number) {
    setSelectedId(id)
    setShowThread(true)
  }

  return (
    <main className="flex-1 flex flex-col md:flex-row overflow-hidden">

      {/* ── Panneau gauche — liste des conversations ── */}
      <aside
        aria-label="Liste des conversations"
        className={`${showThread ? "hidden" : "flex"} md:flex flex-col md:w-96 md:border-r border-grey-light overflow-hidden`}
      >
        {/* En-tête */}
        <div className="px-6 pt-6 pb-4 shrink-0">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-xl bg-grey-light px-4 py-2.5 text-sm text-grey-dark transition-colors hover:bg-grey-dark/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
          >
            <span aria-hidden="true">←</span>
            Retour
          </button>
          <h1 className="mt-6 text-3xl font-bold text-black">Messages</h1>
        </div>

        {/* Liste scrollable */}
        <div className="flex-1 overflow-y-auto">
          <ConversationList
            conversations={MOCK_CONVERSATIONS}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </div>
      </aside>

      {/* ── Panneau droit — thread actif ── */}
      <section
        aria-label="Conversation"
        className={`${showThread ? "flex" : "hidden"} md:flex flex-1 flex-col overflow-hidden`}
      >
        <ChatThread conversation={selectedConv} onBack={() => setShowThread(false)} />
      </section>

    </main>
  )
}
