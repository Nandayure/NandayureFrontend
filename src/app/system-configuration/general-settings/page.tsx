import AddGenderModal from '@/components/system-configuration/Gender/add-gender-modal';
import GendersTable from '@/components/system-configuration/Gender/gender-table';
import AddCivilStatusModal from '@/components/system-configuration/management-civil/add-civilStatus-modal';
import CivilStatusTable from '@/components/system-configuration/management-civil/civilStatus-table';
import { SectionHeader } from '@/components/ui/section-header';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GeneralSettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <SectionHeader
        title="Configuración de Estados Civiles y Géneros"
        description="Aquí puedes gestionar los estados civiles y géneros de tu aplicación. Puedes añadir, editar o eliminar según sea necesario."
      >
      </SectionHeader>

      <Separator className="my-6" />
      
      <Tabs defaultValue="civilStatus">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            data-cy="civil-status-tab"
            value="civilStatus"
          >
            Estado civil
          </TabsTrigger>
          <TabsTrigger value="gender"
            data-cy="gender-tab"
          >
            Genero</TabsTrigger>
        </TabsList>
        <TabsContent value="civilStatus">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Configuración de estado civil
            </h2>
            <CivilStatusTable />
          </div>
        </TabsContent>
        <TabsContent value="gender">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4"
            >
              Configuración del género
            </h2>
            <GendersTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
