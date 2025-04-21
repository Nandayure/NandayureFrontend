"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  AlertCircle,
  RefreshCw,
  Search,
  Edit,
  UserCog,
  Eye,
  Calendar,
  Mail,
  Phone,
  Briefcase,
  Building,
  Users,
  Heart,
  CalendarDays,
} from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PaginationController } from "@/components/ui/pagination-controller"
import SkeletonLoader from "@/components/ui/skeleton-loader"
import { formatDate } from "@/lib/utils"
import { useGetAllEmployees } from "@/hooks"
import { useDebounce } from "@/hooks/use-debounce"

export default function EmployeesDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const itemsPerPage = 5

  // State for pagination and search
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1)
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "")
  const debouncedSearch = useDebounce(searchValue, 500)

  // Use the actual hook instead of mock data
  const { employees, pagination, isError, isLoading, error, refetch } = useGetAllEmployees({
    page: String(currentPage),
    limit: String(itemsPerPage),
    name: debouncedSearch || undefined,
  })

  // State for modals and dialogs
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isGeneralEditAlertOpen, setIsGeneralEditAlertOpen] = useState(false)
  const [isJobPositionEditAlertOpen, setIsJobPositionEditAlertOpen] = useState(false)
  const [isLoadingLocal, setIsLoadingLocal] = useState(false)

  // Update URL when search or page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedSearch) {
      params.set("search", debouncedSearch)
    } else {
      params.delete("search")
    }
    params.set("page", currentPage.toString())
    router.push("?" + params.toString())
  }, [debouncedSearch, currentPage, router, searchParams])

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch])

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  // Open employee detail modal
  const openEmployeeDetail = (employee: any) => {
    setSelectedEmployee(employee)
    setIsDetailModalOpen(true)
  }

  // Open general edit confirmation
  const openGeneralEditConfirmation = (employee: any) => {
    setSelectedEmployee(employee)
    setIsGeneralEditAlertOpen(true)
  }

  // Open job position edit confirmation
  const openJobPositionEditConfirmation = (employee: any) => {
    setSelectedEmployee(employee)
    setIsJobPositionEditAlertOpen(true)
  }

  // Mock refetch function
  const refetchLocal = () => {
    setIsLoadingLocal(true)
    setTimeout(() => {
      setIsLoadingLocal(false)
    }, 1000)
  }

  // Get initials for avatar
  const getInitials = (name: string, surname1: string) => {
    return `${name.charAt(0)}${surname1.charAt(0)}`
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error al cargar empleados</AlertTitle>
        <AlertDescription>
          <div className="flex flex-col space-y-2">
            <p>{error instanceof Error ? error.message : "Ha ocurrido un error al cargar los empleados"}</p>
            <div>
              <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-2">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reintentar
              </Button>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar empleados..."
            className="pl-8"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre completo</TableHead>
              <TableHead>Puesto</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Fecha contratación</TableHead>
              <TableHead>Días vacaciones</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 9 }).map((_, idx) => (
                    <TableCell key={idx}>
                      <SkeletonLoader className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : employees?.length > 0 ? (
              employees?.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>{`${employee.Name?.trim()} ${employee.Surname1?.trim()} ${employee.Surname2}`}</TableCell>
                  <TableCell>{employee.JobPosition?.Name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-100">
                      {employee.JobPosition?.Department?.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate" title={employee.Email}>
                    {employee.Email}
                  </TableCell>
                  <TableCell>{employee.CellPhone}</TableCell>
                  <TableCell>{formatDate(employee.HiringDate?.toString())}</TableCell>
                  <TableCell>{employee.AvailableVacationDays}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEmployeeDetail(employee)}
                        title="Ver detalles"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && pagination?.totalPages > 1 && (
        <PaginationController
          totalItems={pagination.totalItems}
          itemsPerPage={Number(pagination.limit)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          siblingCount={1}
          className="mt-4"
        />
      )}

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">Información del Empleado</DialogTitle>
              <DialogDescription>Detalles completos del empleado seleccionado</DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <Tabs defaultValue="personal">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Información Personal</TabsTrigger>
                  <TabsTrigger value="job">Información Laboral</TabsTrigger>
                  <TabsTrigger value="contact">Contacto</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="text-xl">
                          {getInitials(selectedEmployee.Name, selectedEmployee.Surname1)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-2xl font-bold">
                          {`${selectedEmployee.Name.trim()} ${selectedEmployee.Surname1.trim()} ${selectedEmployee.Surname2}`}
                        </h3>
                        <p className="text-muted-foreground">ID: {selectedEmployee.id}</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => openGeneralEditConfirmation(selectedEmployee)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar Información Personal
                    </Button>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Información Personal</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fecha de Nacimiento:</span>
                          <span className="font-medium">{formatDate(selectedEmployee.Birthdate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Género:</span>
                          <span className="font-medium">{selectedEmployee.Gender.Name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Estado Civil:</span>
                          <span className="font-medium">{selectedEmployee.MaritalStatus.Name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Número de Hijos:</span>
                          <span className="font-medium">{selectedEmployee.NumberChlidren}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-base">Información de Contacto</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => openGeneralEditConfirmation(selectedEmployee)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm break-all">{selectedEmployee.Email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{selectedEmployee.CellPhone}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="job" className="mt-4 space-y-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Información Laboral</CardTitle>
                        <CardDescription>Detalles sobre el puesto y departamento</CardDescription>
                      </div>
                      <Button variant="outline" onClick={() => openGeneralEditConfirmation(selectedEmployee)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Información Laboral
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">Puesto</p>
                                <p className="font-medium">{selectedEmployee.JobPosition.Name}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setIsDetailModalOpen(false)
                                setTimeout(() => openJobPositionEditConfirmation(selectedEmployee), 100)
                              }}
                            >
                              <UserCog className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center">
                            <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Departamento</p>
                              <p className="font-medium">{selectedEmployee.JobPosition.Department.name}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center">
                            <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Fecha de Contratación</p>
                              <p className="font-medium">{formatDate(selectedEmployee.HiringDate)}</p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Días de Vacaciones Disponibles</p>
                              <p className="font-medium">{selectedEmployee.AvailableVacationDays} días</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Editar Puesto</h4>
                          <p className="text-sm text-muted-foreground">
                            Cambiar el puesto del empleado puede afectar a quién se envían las solicitudes de trámites
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsDetailModalOpen(false)
                            setTimeout(() => openJobPositionEditConfirmation(selectedEmployee), 100)
                          }}
                        >
                          <UserCog className="mr-2 h-4 w-4" />
                          Editar Puesto
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contact" className="mt-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Información de Contacto</CardTitle>
                        <CardDescription>Detalles de contacto del empleado</CardDescription>
                      </div>
                      <Button variant="outline" onClick={() => openGeneralEditConfirmation(selectedEmployee)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Contacto
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2" />
                              <p>{selectedEmployee.Email}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Teléfono</h4>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2" />
                              <p>{selectedEmployee.CellPhone}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Estado Civil</h4>
                            <div className="flex items-center">
                              <Heart className="h-4 w-4 mr-2" />
                              <p>{selectedEmployee.MaritalStatus.Name}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Hijos</h4>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              <p>{selectedEmployee.NumberChlidren}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* General Edit Confirmation Alert */}
      {selectedEmployee && (
        <AlertDialog open={isGeneralEditAlertOpen} onOpenChange={setIsGeneralEditAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Está seguro de editar esta información?</AlertDialogTitle>
              <AlertDialogDescription>
                Está a punto de editar la información general de{" "}
                <span className="font-medium">
                  {`${selectedEmployee.Name.trim()} ${selectedEmployee.Surname1.trim()} ${selectedEmployee.Surname2}`}
                </span>
                . Esta acción actualizará los datos personales del empleado.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Continuar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Job Position Edit Confirmation Alert */}
      {selectedEmployee && (
        <AlertDialog open={isJobPositionEditAlertOpen} onOpenChange={setIsJobPositionEditAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Está seguro de cambiar el puesto?</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-2">
                  <p>
                    Está a punto de cambiar el puesto de{" "}
                    <span className="font-medium">
                      {`${selectedEmployee.Name.trim()} ${selectedEmployee.Surname1.trim()} ${selectedEmployee.Surname2}`}
                    </span>
                    .
                  </p>
                  <Alert className="bg-amber-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Advertencia</AlertTitle>
                    <AlertDescription>
                      Cambiar el puesto de trabajo puede afectar a quién se envían las solicitudes de trámites en el
                      sistema.
                    </AlertDescription>
                  </Alert>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Continuar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
