"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send } from "lucide-react"
import { useChatbot } from "@/hooks/common/useChatbot"

interface ChatMessage {
  role: string
  content: string
}

// Function to parse and convert URLs and emails to clickable links
const parseLinks = (text: string) => {
  // Regular expressions for URLs and email addresses
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g

  // Replace URLs with anchor tags
  let parsedText = text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700 underline">${url}</a>`)

  // Replace email addresses with mailto links
  parsedText = parsedText.replace(emailRegex, (email) => `<a href="mailto:${email}" class="text-blue-500 hover:text-blue-700 underline">${email}</a>`)

  return parsedText
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const { mutate: sendMessage, isPending, isError } = useChatbot()

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])

    sendMessage(input, {
      onSuccess: (botMessage) => {
        setMessages((prev) => [...prev, botMessage])
        setInput("")
      },
      onError: (error) => {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: "Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo." },
        ])
        console.error("Error del chat:", error)
      },
    })
  }

  return (
    <>
      <Button className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg" onClick={() => setIsOpen(true)}>
        <MessageCircle className="w-6 h-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] shadow-none">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="Bot" />
                <AvatarFallback>IA</AvatarFallback>
              </Avatar>
              Chatear con IA
            </DialogTitle>
          </DialogHeader>

          <Card className="h-[50vh] overflow-y-auto p-4 space-y-4 shadow-none border-0">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${msg.role === "user" ? "bg-dodger-blue-500 text-white" : "bg-muted"}`}
                  dangerouslySetInnerHTML={{
                    __html: msg.role === "bot" ? parseLinks(msg.content) : msg.content
                  }}
                />
              </div>
            ))}
            {isPending && (
              <div className="flex justify-start">
                <motion.div
                  className="bg-muted p-3 rounded-lg flex space-x-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-[#0F172A] rounded-full"
                      animate={{ y: ["0%", "-50%", "0%"] }}
                      transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              </div>
            )}
          </Card>

          <div className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe tu mensaje..."
              disabled={isPending}
              className={`shadow-none ${!input.trim() ? "opacity-50" : ""}`}
            />
            <Button
              onClick={handleSend}
              disabled={isPending || !input.trim()}
              className={!input.trim() ? "opacity-50" : ""}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {isError && (
            <p className="text-destructive text-sm">
              Ocurrió un error al enviar tu mensaje. Por favor, inténtalo de nuevo.
            </p>
          )}

          <DialogFooter>
            <p className="text-xs text-muted-foreground w-full text-center">Respuestas generadas por IA</p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}