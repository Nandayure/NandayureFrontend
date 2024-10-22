import AddCivilStatusModal from "@/components/system-configuration/management-civil/add-civilStatus-modal";
import CivilStatusTable from "@/components/system-configuration/management-civil/civilStatus-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GeneralSettingsPage() {
  return (
    <div className="container mx-auto py-10">
    <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>
    <Tabs defaultValue="civilStatus">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="civilStatus">Estado civil</TabsTrigger>
        <TabsTrigger value="gender">Genero</TabsTrigger>
        
      </TabsList>
      <TabsContent value="civilStatus">
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Configuración de Departamentos</h2>
          <AddCivilStatusModal />
          <CivilStatusTable />
        </div>
      </TabsContent>
      <TabsContent value="gender">
        Genero
      </TabsContent>
    </Tabs>
  </div>
  );
}
