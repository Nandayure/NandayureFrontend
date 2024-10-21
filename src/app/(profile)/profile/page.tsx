'use client';

import { IoPersonOutline } from 'react-icons/io5';
import useGetByIdEmployee from '@/hooks/profile/useGetByIdEmployee';
import { format } from '@formkit/tempo';
import { DialogProfile } from '@/components/profile/dialog/dialog';
import useGetEmployeeId from '@/hooks/common/useGetEmployeeId';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProfilePage = () => {
  const { employeeId } = useGetEmployeeId();
  const { employeeById: employeeData, isError } = useGetByIdEmployee({
    employeeId,
  });

  if (!employeeData) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-3xl">
          <CardContent className="p-6">
            <p className="text-center text-red-500">
              Ocurrió un error al cargar la información del empleado.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const inputDate = employeeData.Birthdate;
  const formattedData = format({
    date: inputDate,
    format: 'D MMMM YYYY',
    locale: 'es',
  });

  const Date = format({ date: inputDate, format: 'YYYY-MM-DD', locale: 'en' });

  return (
    <div className="min-h-screen p-6 ">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="pb-0">
          <CardTitle className="text-3xl font-bold">Cuenta</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Perfil</h2>
            <p className="text-gray-600">
              Esta es tu información pública de perfil. Se utiliza para
              identificarte en los servicios de la empresa. Puedes actualizar tu
              información para mantenerla actualizada y precisa.
            </p>
          </div>
          <div className="space-y-6">
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
              label="Dias de Vacaciones"
              value={employeeData.AvailableVacationDays.toString()}
            />
          </div>
        </CardContent>
      </Card>
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
  <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
    <div className="space-y-1">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <p className="text-base font-semibold text-gray-900">{value}</p>
    </div>
    <div className="flex items-center space-x-4">
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

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="pb-0">
          <Skeleton className="h-9 w-40" />
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-8 space-y-2">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="space-y-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProfileFieldSkeleton key={index} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProfileFieldSkeleton = () => (
  <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-5 w-32" />
    </div>
    <Skeleton className="h-9 w-16" />
  </div>
);

export default ProfilePage;
