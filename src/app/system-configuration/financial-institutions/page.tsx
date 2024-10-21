'use client';

import AddTypeFinancialInstitutionsModal from '@/components/system-configuration/type-financial-institutions/add-type-financial-institutions-modal';
import TypeFinancialInstitutionsTable from '@/components/system-configuration/type-financial-institutions/type-financial-institutions-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export default function FinancialInstitutionsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>
      <Tabs defaultValue="type-financial-institutions">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="type-financial-institutions">
            Tipos de instituciones financieras
          </TabsTrigger>
          <TabsTrigger value="financial-institutions">
            Instituciones financieras
          </TabsTrigger>
        </TabsList>
        <TabsContent value="type-financial-institutions">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Configuración de tipos de instituciones financieras
            </h2>
            <AddTypeFinancialInstitutionsModal />
            <TypeFinancialInstitutionsTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
