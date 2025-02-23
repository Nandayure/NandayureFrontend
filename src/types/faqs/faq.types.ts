export type FAQCategory =
  | 'tramites'
  | 'soporte'
  | 'contactos'
  | 'historia'
  | 'gobierno';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  updated_at: Date;
}
