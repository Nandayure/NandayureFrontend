'use client'

import { Faq } from "@/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  faq: Faq;
  categoryName: string;
  children?: React.ReactNode;
}

function FormattedAnswer({ answer }: { answer: string }) {
  const lines = answer.split("\n");
  return (
    <>
      {lines.map((line, index) => {
        const words = line.split(" ");
        return (
          <p key={index} className="py-1">
            {words.map((word, i) => {
              if (/^https?:\/\/[^\s]+$/.test(word)) {
                return (
                  <a
                    key={i}
                    href={word}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {word}{" "}
                  </a>
                );
              } else if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(word)) {
                return (
                  <a 
                    key={i} 
                    href={`mailto:${word}`} 
                    className="text-blue-500 underline"
                  >
                    {word}{" "}
                  </a>
                );
              }
              return word + " ";
            })}
          </p>
        );
      })}
    </>
  );
}

export default function FaqPreview({ faq, categoryName, children }: Props) {
  const formattedDate = format(new Date(), 'd MMMM yyyy', { locale: es });
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button size="icon" variant="ghost" className="h-8 w-8 text-primary">
            <Eye className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Vista previa de FAQ</DialogTitle>
          <DialogDescription>
            Así se verá esta pregunta para los usuarios {faq.status === 'active' ? '(Publicada)' : '(No publicada)'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="border rounded-lg p-4 bg-card">
          <div className="text-sm text-muted-foreground mb-2">
            Categoría: {categoryName}
          </div>
          
          <div className="preview-container">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="preview" className="border-none">
                <AccordionTrigger className="text-left py-2">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <FormattedAnswer answer={faq.answer} />
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
                      <span>Última actualización: {formattedDate}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <DialogClose asChild>
            <Button>Cerrar vista previa</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}