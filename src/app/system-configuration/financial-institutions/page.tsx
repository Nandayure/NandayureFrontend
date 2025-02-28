'use client';

import AddFinancialInstitutionsModal from '@/components/system-configuration/financial-institutions/add-financial-institutions-modal';
import FinancialInstitutionsTable from '@/components/system-configuration/financial-institutions/financial-institutions-table';
import AddTypeFinancialInstitutionsModal from '@/components/system-configuration/type-financial-institutions/add-type-financial-institutions-modal';
import TypeFinancialInstitutionsTable from '@/components/system-configuration/type-financial-institutions/type-financial-institutions-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export default function FinancialInstitutionsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>
      <Tabs defaultValue="financial-institutions">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="financial-institutions">
            Instituciones financieras
          </TabsTrigger>
          <TabsTrigger value="type-financial-institutions">
            Tipos de instituciones financieras
          </TabsTrigger>
        </TabsList>
        <TabsContent value="financial-institutions">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Configuración de instituciones financieras
            </h2>
            <FinancialInstitutionsTable />
          </div>
        </TabsContent>
        <TabsContent value="type-financial-institutions">
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">
              Configuración de tipos de instituciones financieras
            </h2>
            <TypeFinancialInstitutionsTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
