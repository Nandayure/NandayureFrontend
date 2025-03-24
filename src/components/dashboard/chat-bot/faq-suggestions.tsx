import { Button } from "@/components/ui/button";

interface FAQSuggestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}

export default function FAQSuggestions({ questions, onSelect }: FAQSuggestionsProps) {
  return (
    <section className="space-y-4 w-full max-w-md">
      <h3 className="text-sm font-medium text-muted-foreground">Sugerencias de preguntas</h3>
      <ul className="grid gap-3">
        {questions.map((question, index) => (
          <li key={index}>
            <Button
              variant="outline"
              type="button"
              className="w-full justify-start text-left h-auto p-4 whitespace-normal rounded-2xl cursor-pointer"
              onClick={() => onSelect(question)}
            >
              {question}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}