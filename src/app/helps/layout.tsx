import Chatbot from "@/components/dashboard/chat-bot/chat-bot"


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main suppressHydrationWarning>
      {children}
      <Chatbot />
    </main>

  )
}