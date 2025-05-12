"use client"
import useGetByIdEmployee from "@/hooks/profile/useGetByIdEmployee"
import { format } from "@formkit/tempo"
import { DialogProfile } from "@/components/profile/dialog/dialog"
import useGetEmployeeId from "@/hooks/common/useGetEmployeeId"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

const ProfilePage = () => {
  const { employeeId } = useGetEmployeeId()
  const { employeeById: employeeData, isError } = useGetByIdEmployee({
    employeeId,
  })

  if (!employeeData) {
    return <ProfileSkeleton />
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl shadow-lg">
          <CardContent className="p-6">
            <p className="text-left text-red-500 font-medium">
              Ocurrió un error al cargar la información del empleado.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const inputDate = employeeData.Birthdate
  const [dateOnly] = (inputDate instanceof Date ? inputDate.toISOString() : inputDate).split("T")
  const [year, month, day] = dateOnly.split("-").map((num) => Number.parseInt(num))
  const formattedData = format({
    date: new Date(year, month - 1, day),
    format: "D MMMM YYYY",
    locale: "es",
  })
  const formattedDateForInput = dateOnly

  return (
    <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 sm:p-8 border-b">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                <AvatarFallback className=" text-xl">
                  {`${employeeData.Name?.[0] ?? ""}${employeeData.Surname1?.[0] ?? ""}`.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-left">Mi Perfil</h1>
                <p className="text-gray-600 text-left max-w-2xl">
                  Información personal utilizada para identificarte en los servicios de la empresa. Mantén tus datos
                  actualizados.
                </p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 sm:p-8">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0 space-y-0">
                <ProfileField
                  label="Nombre"
                  value={employeeData.Name}
                  field={{
                    id: "Name",
                    label: "Nombre",
                    defaultValue: employeeData.Name,
                  }}
                  data-cy="profile-name"
                />
                <Separator />
                <ProfileField
                  label="Primer apellido"
                  value={employeeData.Surname1}
                  field={{
                    id: "Surname1",
                    label: "Primer apellido",
                    defaultValue: employeeData.Surname1,
                  }}
                  data-cy="profile-surname1"
                />
                <Separator />
                <ProfileField
                  label="Segundo apellido"
                  value={employeeData.Surname2}
                  field={{
                    id: "Surname2",
                    label: "Segundo apellido",
                    defaultValue: employeeData.Surname2,
                  }}
                  data-cy="profile-surname2"
                />
                <Separator />
                <ProfileField
                  label="Teléfono"
                  value={
                    <span className="flex items-center gap-2">
                      <img
                        src="/CR-flag.svg"
                        alt="Costa Rica"
                        className="w-6 h-4 rounded-sm border"
                        style={{ display: "inline-block" }}
                      />
                      <span className="font-medium text-gray-700">+506</span>
                      <span className="ml-1">{employeeData.CellPhone}</span>
                    </span>
                  }
                  field={{
                    id: "CellPhone",
                    label: "Teléfono",
                    defaultValue: employeeData.CellPhone,
                  }}
                  data-cy="profile-CellPhone"
                />
                <Separator />
                <ProfileField
                  label="Correo electrónico"
                  value={employeeData.Email}
                  field={{
                    id: "Email",
                    label: "Correo electrónico",
                    defaultValue: employeeData.Email,
                  }}
                  data-cy="profile-email"
                />
                <Separator />
                <ProfileField
                  label="Fecha nacimiento"
                  value={formattedData}
                  field={{
                    id: "Birthdate",
                    label: "Fecha nacimiento",
                    defaultValue: formattedDateForInput,
                    type: "date",
                  }}
                  data-cy="profile-Birthdate"
                />
                <Separator />
                <ProfileField
                  label="Días de Vacaciones"
                  value={employeeData.AvailableVacationDays.toString()}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfileField = ({
  label,
  value,
  field,
  highlight = false,
}: {
  label: string
  value: string | React.ReactElement
  field?: { id: string; label: string; defaultValue: string; type?: string }
  highlight?: boolean
}) => (
  <div
    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-5 px-4 ${highlight ? "bg-gray-50 rounded-lg" : ""}`}
  >
    <div className="flex-1">
      <span className="text-sm font-medium text-gray-500 block mb-1">{label}</span>
      <p className="text-base font-semibold text-gray-900">{value}</p>
    </div>
    <div className="flex items-center space-x-2 mt-2 sm:mt-0 w-full sm:w-auto">
      {field && (
        <div className="w-full sm:w-auto">
          <DialogProfile
            title={`Editar ${field.label}`}
            description={`Actualiza tu ${field.label} aquí. Haz clic en guardar cuando hayas terminado.`}
            fields={[field]}
            data-cy="edit-profile"
          />
        </div>
      )}
    </div>
  </div>
)

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header Section Skeleton */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 sm:p-8 border-b">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-3 flex-1">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-4 w-full max-w-md" />
                <Skeleton className="h-4 w-full max-w-sm" />
              </div>
            </div>
          </div>

          {/* Profile Content Skeleton */}
          <div className="p-6 sm:p-8">
            <Card className="border-0 shadow-none">
              <CardContent className="p-0 space-y-0">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div key={index}>
                    <ProfileFieldSkeleton />
                    {index < 6 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfileFieldSkeleton = () => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-5 px-4">
    <div className="flex-1">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-5 w-48" />
    </div>
    <Skeleton className="h-9 w-16 mt-2 sm:mt-0" />
  </div>
)

export default ProfilePage
