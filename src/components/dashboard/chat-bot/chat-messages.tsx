import { motion, AnimatePresence, Variants } from "framer-motion";
import ReactMarkdown from "react-markdown";

export interface ChatMessage {
  role: string;
  content: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  messageVariants: Variants;
}

const linkStyle = (href?: string) => {
  let color = "blue";
  if (href?.startsWith("mailto:")) color = "green";
  else if (href?.startsWith("tel:")) color = "orange";
  else if (href?.startsWith("http")) color = "purple";
  return { color, textDecoration: "underline" };
};

export default function ChatMessages({ messages, messageVariants }: ChatMessagesProps) {
  return (
    <AnimatePresence mode="wait">
      <ul className="space-y-4">
        {messages.map((msg, index) => (
          <motion.li
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={messageVariants}
          >
            <div
              role={msg.role === "user" ? "status" : "article"}
              className={`max-w-[80%] p-3 rounded-lg ${msg.role === "user" ? "bg-dodger-blue-500 text-white" : "bg-muted"}`}
            >
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      style={linkStyle(props.href)}
                      aria-label={`Enlace a ${props.href}`}
                    />
                  ),
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  );
}