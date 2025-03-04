import FaqCategoriesList from "@/components/faq-categories/management/FaqCategoriesTable";
import { BackButton } from "@/components/faqs/back-button";
import FaqTable from "@/components/faqs/management/faqTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Page() {
  return (
    <div className="container mx-auto py-10">
      <BackButton path="/helps" buttonText="Volver a ayuda" />
      <h1 className="flex justify-center text-3xl font-bold font-roboto mb-6">Gestión de Preguntas Frecuentes</h1>
      <Tabs defaultValue="faqs">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="faqs">Preguntas Frecuentes</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
        </TabsList>
        <TabsContent value="faqs">
          <div className="mt-6">
            <h2 className="text-2xl font-bold font-roboto mb-4">Preguntas Frecuentes</h2>
            <FaqTable />
          </div>
        </TabsContent>
        <TabsContent value="categories">
          <div className="mt-6">
            <h2 className="text-2xl font-bold font-roboto mb-4">Categorías</h2>
            <FaqCategoriesList />
          </div>
        </TabsContent>
      </Tabs>
    </div >
  );
}