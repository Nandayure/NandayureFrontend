import AddStudiesCategoryModal from '@/components/system-configuration/studies-category/add-studies-category-modal';
import StudiesCategoryTable from '@/components/system-configuration/studies-category/studies-category-table';
import AddStudyModal from '@/components/system-configuration/studies/add-study-modal';
import StudiesTable from '@/components/system-configuration/studies/studies-table';
import { SectionHeader } from '@/components/ui/section-header';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function StudiesPage() {
  return (
    <div className="container mx-auto py-10">
      <SectionHeader
        title="Administración de Estudios"
        description="Aquí puedes gestionar los estudios de tu aplicación. Puedes deshabilitar o habilitar según sea necesario."
      >
      </SectionHeader>

      <Separator className="my-6" />

      <Tabs defaultValue="studies">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="studies">Estudios</TabsTrigger>
          <TabsTrigger value="studies-category">
            Categorías de Estudios
          </TabsTrigger>
        </TabsList>
        <TabsContent value="studies">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Configuración de estudios
            </h2>
            <StudiesTable />
          </div>
        </TabsContent>

        <TabsContent value="studies-category">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Configuración de categorías de estudios
            </h2>
            <StudiesCategoryTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
