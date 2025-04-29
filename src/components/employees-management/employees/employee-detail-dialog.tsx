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

interface EmployeeDetailDialogProps {
  employee: any
  isOpen: boolean
  onClose: () => void
}

export function EmployeeDetailDialog({ employee, isOpen, onClose }: EmployeeDetailDialogProps) {
  const [isGeneralEditAlertOpen, setIsGeneralEditAlertOpen] = useState(false)
  const [isJobPositionEditOpen, setIsJobPositionEditOpen] = useState(false)
  const [isJobPositionEditAlertOpen, setIsJobPositionEditAlertOpen] = useState(false)

  const handleGeneralEditConfirmation = (employee: any) => {
    setIsGeneralEditAlertOpen(true)
  }

  const handleJobPositionEdit = (employee: any) => {
    onClose()
    setTimeout(() => setIsJobPositionEditOpen(true), 100)
  }

  const handleJobPositionConfirm = (employee: any) => {
    setIsJobPositionEditOpen(false)
    setIsJobPositionEditAlertOpen(true)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
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
                <PersonalInfoTab employee={employee} onEditConfirmation={handleGeneralEditConfirmation} />
              </TabsContent>

              <TabsContent value="job">
                <JobInfoTab
                  employee={employee}
                  onEditConfirmation={handleGeneralEditConfirmation}
                  onJobPositionEdit={handleJobPositionEdit}
                />
              </TabsContent>

              <TabsContent value="contact">
                <ContactInfoTab employee={employee} onEditConfirmation={handleGeneralEditConfirmation} />
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* General Edit Confirmation Alert */}
      <AlertDialog open={isGeneralEditAlertOpen} onOpenChange={setIsGeneralEditAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de editar esta información?</AlertDialogTitle>
            <AlertDialogDescription>
              Está a punto de editar la información general de{" "}
              <span className="font-medium">
                {employee && `${employee.Name.trim()} ${employee.Surname1.trim()} ${employee.Surname2}`}
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
