"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PersonalInfoTab } from "./personal-info-tab"
import { JobInfoTab } from "./job-info-tab"
import { ContactInfoTab } from "./contact-info-tab"
import { EditEmployeeJobPositionDialog } from "./edit-employee-job-position-dialog"
import { useUpdateEmployee, useUpdateEmployeeJobPosition } from "@/hooks"

interface EmployeeDetailDialogProps {
  employee: any
  isOpen: boolean
  onCloseAction: () => void
  onUpdate?: () => void
}

export function EmployeeDetailDialog({ employee, isOpen, onCloseAction, onUpdate }: EmployeeDetailDialogProps) {
  const [isGeneralEditAlertOpen, setIsGeneralEditAlertOpen] = useState(false)
  const [isJobPositionEditOpen, setIsJobPositionEditOpen] = useState(false)
  const [isJobPositionEditAlertOpen, setIsJobPositionEditAlertOpen] = useState(false)
  const [editData, setEditData] = useState<any>(null)

  const { onSubmit: updateEmployee } = useUpdateEmployee({
    employeeId: parseInt(employee?.id),
    setIsOpen: setIsGeneralEditAlertOpen,
  })

  const handleGeneralEditConfirmationAction = (data: any) => {
    setEditData(data)
    setIsGeneralEditAlertOpen(true)
  }

  const handleJobPositionEditAction = () => {
    setIsJobPositionEditOpen(true)
  }

  const handleConfirmEditAction = async () => {
    if (editData) {
      await updateEmployee(editData)
      setEditData(null)
      setIsGeneralEditAlertOpen(false)
      onUpdate?.()
      onCloseAction()
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onCloseAction}>
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

              <TabsContent value="personal">
                <PersonalInfoTab employee={employee} onEditConfirmationAction={handleGeneralEditConfirmationAction} />
              </TabsContent>

              <TabsContent value="job">
                <JobInfoTab
                  employee={employee}
                  onEditConfirmationAction={handleGeneralEditConfirmationAction}
                  onJobPositionEditAction={handleJobPositionEditAction}
                />
              </TabsContent>

              <TabsContent value="contact">
                <ContactInfoTab employee={employee} onEditConfirmationAction={handleGeneralEditConfirmationAction} />
              </TabsContent>
            </Tabs>
          </div>

        </DialogContent>
      </Dialog>

      {/* General Edit Confirmation Alert */}
      <AlertDialog open={isGeneralEditAlertOpen} onOpenChange={setIsGeneralEditAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de editar esta información?</AlertDialogTitle>
            <AlertDialogDescription>
              Está a punto de editar la información de{" "}
              <span className="font-medium">
                {employee && `${employee.Name.trim()} ${employee.Surname1.trim()} ${employee.Surname2}`}
              </span>
              . Esta acción actualizará los datos del empleado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEditData(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmEditAction}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Job Position Edit Dialog */}
      <EditEmployeeJobPositionDialog
        isOpen={isJobPositionEditOpen}
        onCloseAction={() => setIsJobPositionEditOpen(false)}
        employee={employee}
        onConfirmAction={() => setIsJobPositionEditAlertOpen(true)}
      />

      {/* Job Position Edit Confirmation Alert */}
      <AlertDialog open={isJobPositionEditAlertOpen} onOpenChange={setIsJobPositionEditAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de cambiar el puesto?</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-2">
                <p>
                  Está a punto de cambiar el puesto de{" "}
                  <span className="font-medium">
                    {employee && `${employee.Name.trim()} ${employee.Surname1.trim()} ${employee.Surname2}`}
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
    </>
  )
}
