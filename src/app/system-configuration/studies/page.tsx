import AddStudiesCategoryModal from '@/components/system-configuration/studies-category/add-studies-category-modal';
import StudiesCategoryTable from '@/components/system-configuration/studies-category/studies-category-table';

export default function StudiesPage() {
  return (
    <div>
      <div className="container mx-auto py-10">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold mb-4">
            Configuración de categorías de estudios
          </h1>
        </div>
        <AddStudiesCategoryModal />
        <StudiesCategoryTable />
      </div>
    </div>
  );
}
