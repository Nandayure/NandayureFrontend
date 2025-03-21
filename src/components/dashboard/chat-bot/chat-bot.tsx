"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { useChatbot } from "@/hooks/common/useChatbot";
import ChatMessages, { ChatMessage } from "./chat-messages";
import ChatHeader from "./chat-header";
import FAQSuggestions from "./faq-suggestions";
import ChatInput from "./chat-input";

const FAQ_QUESTIONS = [
  "¿Qué puedo preguntarte?",
  "¿Como puedo solicitar vacaciones?",
  "¿Como puedo cambiar mi contraseña?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { mutate: sendMessage, isPending, isError } = useChatbot();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    sendMessage(input, {
      onSuccess: (botMessage) => {
        setIsTyping(false);
        setMessages((prev) => [...prev, botMessage]);
      },
      onError: (error) => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo.",
          },
        ]);
        console.error("Error del chat:", error);
      },
    });
  };

  const handleDownloadChat = () => {
    const chatContent = messages
      .map((msg) => `${msg.role === "user" ? "Usuario" : "Bot"}: ${msg.content}`)
      .join("\n\n");

    const blob = new Blob([chatContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat-conversation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 50, transition: { duration: 0.3, ease: "easeIn" } },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <>
      <section aria-label="Chatbot" className="fixed bottom-4 right-4">
        <Button
          aria-label="Abrir chat"
          className="relative rounded-full w-12 h-12 shadow-xs"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={`${isExpanded
            ? "sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px] w-[90vw] shadow-none"
            : "w-full mr-0 mb-0 sm:w-[72vw] sm:mr-4 sm:mb-4 sm:max-w-[480px] md:max-w-[560px] lg:max-w-[640px] shadow-none"
            } !right-4 !left-auto !translate-x-0 transition-all duration-300 origin-right`}
          hideCloseButton
          rounded='2xl'
        >
          <ChatHeader
            isExpanded={isExpanded}
            onDownload={handleDownloadChat}
            onClose={() => setIsOpen(false)}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
          />

          <Card className="h-[60vh] overflow-y-auto p-4 space-y-4 shadow-none border-0 hide-scrollbar">
            {messages.length > 0 || isTyping ? (
              <>
                <ChatMessages messages={messages} messageVariants={messageVariants} />
                {isTyping && (
                  <motion.div
                    aria-live="polite"
                    aria-label="Bot está escribiendo"
                    className="flex justify-start"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={messageVariants}
                  >
                    <div className="bg-muted p-3 rounded-2xl flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-[#4caf50] rounded-full"
                          animate={{ y: ["0%", "-50%", "0%"] }}
                          transition={{
                            duration: 0.6,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <article className="flex flex-col items-center justify-center h-full text-center">
                <div className="mb-8">
                  <figure className="inline-flex items-center justify-center w-12 h-12 mb-4">
                    <Image src="/Spark.svg" alt="" width={24} height={24} aria-hidden="true" />
                  </figure>
                  <h2 className="text-xl font-semibold mb-2">
                    Pregúntale cualquier cosa a nuestra IA
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Estoy aquí para ayudarte con tus consultas
                  </p>
                </div>
                <FAQSuggestions questions={FAQ_QUESTIONS} onSelect={setInput} />
              </article>
            )}
            <div ref={messagesEndRef} />
          </Card>

          <ChatInput input={input} onChange={setInput} onSend={handleSend} disabled={isPending} />

          {isError && (
            <p role="alert" className="text-destructive text-sm">
              Ocurrió un error al enviar tu mensaje. Por favor, inténtalo de nuevo.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}