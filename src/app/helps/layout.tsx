import Chatbot from "@/components/dashboard/chat-bot/chat-bot"


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <main>
          {children}
          <Chatbot />
        </main>
      </body>
    </html>
  )
}