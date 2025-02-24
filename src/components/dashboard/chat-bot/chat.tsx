"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send } from "lucide-react"
import { useChatbot } from "@/hooks/common/useChatbot"
import ReactMarkdown from "react-markdown"
import Flag from "@/components/common/Flag"
import Image from "next/image"

interface ChatMessage {
  role: string
  content: string
}

const FAQ_QUESTIONS = [
  "¿Qué puedo preguntarte?",
  "¿Cuál de mis proyectos está teniendo mejor rendimiento?",
  "¿De qué proyectos debería preocuparme ahora mismo?",
]


const linkStyle = (href?: string) => {
  let color = "blue"
  if (href?.startsWith("mailto:")) color = "green"
  else if (href?.startsWith("tel:")) color = "orange"
  else if (href?.startsWith("http")) color = "purple"
  return { color, textDecoration: "underline" }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { mutate: sendMessage, isPending, isError } = useChatbot()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    sendMessage(input, {
      onSuccess: (botMessage) => {
        setIsTyping(false)
        setMessages((prev) => [...prev, botMessage])
      },
      onError: (error) => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: "Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo." },
        ])
        console.error("Error del chat:", error)
      },
    })
  }

  const handleFAQClick = (question: string) => {
    setInput(question)
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 50, transition: { duration: 0.3, ease: "easeIn" } },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  }

  return (
    <>
      <div className="fixed bottom-4 right-4">
        <div className="relative">
          {/* Animated border: se muestra solo si el diálogo está cerrado */}
          {!isOpen && (
            <span
              className="absolute inset-0 rounded-full bg-primary opacity-30"
              style={{ animation: "ping 5s cubic-bezier(0, 0, 0.2, 1) infinite" }}
            ></span>
          )}

          {/* Main button */}
          <Button
            className="relative rounded-full w-12 h-12 shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] w-[90vw] shadow-none">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder.svg" alt="Bot" />
                <AvatarFallback>IA</AvatarFallback>
              </Avatar>
              Nanda IA
            </DialogTitle>
            <Flag />
          </DialogHeader>

          <Card className="h-[60vh] overflow-y-auto p-4 space-y-4 shadow-none border-0 hide-scrollbar">
            <AnimatePresence mode="wait">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={messageVariants}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${msg.role === "user" ? "bg-dodger-blue-500 text-white" : "bg-muted"}`}
                  >
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => <a {...props} style={linkStyle(props.href)} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={messageVariants}
              >
                <div className="bg-muted p-3 rounded-lg flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-[#0F172A] rounded-full"
                      animate={{ y: ["0%", "-50%", "0%"] }}
                      transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            {messages.length === 0 && !isTyping && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                    <Image src="/Spark.svg" alt="Bot" width={24} height={24} />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Pregúntale cualquier cosa a nuestra IA</h2>
                  <p className="text-muted-foreground mb-8">Estoy aquí para ayudarte con tus consultas</p>
                </div>
                <div className="space-y-4 w-full max-w-md">
                  <h3 className="text-sm font-medium text-muted-foreground">Sugerencias de preguntas</h3>
                  <div className="grid gap-3">
                    {FAQ_QUESTIONS.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start text-left h-auto p-4 whitespace-normal"
                        onClick={() => handleFAQClick(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </Card>

          <div className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSend()}
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

