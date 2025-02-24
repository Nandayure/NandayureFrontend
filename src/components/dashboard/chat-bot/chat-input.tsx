import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  onChange: (val: string) => void;
  onSend: () => void;
  disabled: boolean;
}

export default function ChatInput({ input, onChange, onSend, disabled }: ChatInputProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
      className="flex items-center gap-2"
    >
      <Input
        value={input}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escribe tu mensaje..."
        disabled={disabled}
        aria-label="Escribe tu mensaje"
        className={`shadow-none ${!input.trim() ? "opacity-50" : ""}`}
      />
      <Button
        type="submit"
        disabled={disabled || !input.trim()}
        className={!input.trim() ? "opacity-50" : ""}
        aria-label="Enviar mensaje"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}