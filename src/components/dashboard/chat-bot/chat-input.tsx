import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  onChange: (val: string) => void;
  onSend: () => void;
  disabled: boolean;
}

export default function ChatInput({ input, onChange, onSend, disabled }: ChatInputProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-2 rounded-full bg-gray-100 dark:bg-gray-800">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="relative flex items-center"
      >
        <Input
          value={input}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escribe tu mensaje..."
          disabled={disabled}
          aria-label="Escribe tu mensaje"
          className="pr-12 py-6 bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          type="submit"
          disabled={disabled || !input.trim()}
          className="absolute right-2 rounded-full w-10 h-10 p-0 bg-blue-500 hover:bg-blue-600"
          aria-label="Enviar mensaje"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </Button>
      </form>
    </div>
  );
}