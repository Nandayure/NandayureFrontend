'use client';

import { IoPersonOutline } from 'react-icons/io5';
import useGetByIdEmployee from '@/hooks/profile/useGetByIdEmployee';
import { format } from '@formkit/tempo';
import { DialogProfile } from '@/components/profile/dialog/dialog';
import useGetEmployeeId from '@/hooks/common/useGetEmployeeId';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  const { employeeId } = useGetEmployeeId();
  const { employeeById: employeeData, isError } = useGetByIdEmployee({
    employeeId,
  });

  if (!employeeData) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return <div> Ocurrió un error al cargar la información del empleado.</div>;
  }

  const inputDate = employeeData.Birthdate;
  const formattedData = format({
    date: inputDate,
    format: 'D MMMM YYYY',
    locale: 'es',
  });

  const Date = format({ date: inputDate, format: 'YYYY-MM-DD', locale: 'en' });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white border shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Cuenta</h1>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Perfil</h2>
            <p className="text-gray-600 mb-4">
              Esta es tu información pública de perfil. Se utiliza para
              identificarte en los servicios de la empresa. Puedes actualizar tu
              información para mantenerla actualizada y precisa.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                  <IoPersonOutline size={48} className="text-black" />
                </div>
                <span className="text-gray-700">Imagen de perfil</span>
              </div>
              <Button variant="outline">Editar</Button>
            </div>
            <ProfileField
              label="Nombre"
              value={employeeData.Name}
              field={{
                id: 'Name',
                label: 'Nombre',
                defaultValue: employeeData.Name,
              }}
            />
            <ProfileField
              label="Primer apellido"
              value={employeeData.Surname1}
              field={{
                id: 'Surname1',
                label: 'Primer apellido',
                defaultValue: employeeData.Surname1,
              }}
            />
            <ProfileField
              label="Segundo apellido"
              value={employeeData.Surname2}
              field={{
                id: 'Surname2',
                label: 'Segundo apellido',
                defaultValue: employeeData.Surname2,
              }}
            />
            <ProfileField
              label="Teléfono"
              value={employeeData.CellPhone}
              field={{
                id: 'CellPhone',
                label: 'Teléfono',
                defaultValue: employeeData.CellPhone,
              }}
            />
            <ProfileField
              label="Correo electrónico"
              value={employeeData.Email}
              field={{
                id: 'Email',
                label: 'Correo electrónico',
                defaultValue: employeeData.Email,
              }}
            />
            <ProfileField
              label="Fecha nacimiento"
              value={formattedData}
              field={{
                id: 'Birthdate',
                label: 'Fecha nacimiento',
                defaultValue: Date,
                type: 'date',
              }}
            />
            <ProfileField
              label="Dias de vacaciones"
              value={employeeData.AvailableVacationDays.toString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({
  label,
  value,
  field,
}: {
  label: string;
  value: string;
  field?: { id: string; label: string; defaultValue: string; type?: string };
}) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-gray-700">{label}</span>
    <div className="flex items-center space-x-4">
      <span className="text-gray-500">{value}</span>
      {field && (
        <DialogProfile
          title={`Editar ${field.label}`}
          description={`Actualiza tu ${field.label} aquí. Haz clic en guardar cuando hayas terminado.`}
          fields={[field]}
        />
      )}
    </div>
  </div>
);

export default ProfilePage;

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white border shadow-md rounded-lg overflow-hidden">
        <div className="p-6 animate-pulse">
          <h1 className="text-3xl font-bold mb-6 bg-gray-300 rounded w-32 h-8"></h1>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 bg-gray-300 rounded w-24 h-6"></h2>
            <p className="text-gray-600 mb-4 bg-gray-200 rounded w-full h-4"></p>
            <p className="text-gray-600 mb-4 bg-gray-200 rounded w-3/4 h-4"></p>
            <p className="text-gray-600 mb-4 bg-gray-200 rounded w-1/2 h-4"></p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <IoPersonOutline size={48} className="text-gray-400" />
                </div>
                <span className="text-gray-700 bg-gray-300 rounded w-24 h-4"></span>
              </div>
              <div className="bg-gray-300 rounded w-16 h-8"></div>
            </div>
            {/* Skeleton Fields */}
            {Array.from({ length: 5 }).map((_, index) => (
              <ProfileFieldSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileFieldSkeleton = () => (
  <div className="flex items-center justify-between py-2">
    <span className="text-gray-700 bg-gray-300 rounded w-24 h-4"></span>
    <div className="flex items-center space-x-4">
      <span className="text-gray-500 bg-gray-200 rounded w-32 h-4"></span>
      <div className="bg-gray-300 rounded w-16 h-8"></div>
    </div>
  </div>
);
