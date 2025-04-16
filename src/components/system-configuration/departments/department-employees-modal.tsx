import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useGetDepartmentEmployees from "@/hooks/system-configuration/departments/queries/useGetDepartmentEmployees";
import useUpdateDepartmentHead from "@/hooks/system-configuration/departments/commands/useUpdateDepartmentHead";
import { useState } from "react";
import { Users } from "lucide-react";
import SkeletonLoader from "@/components/ui/skeleton-loader";
import { toast } from "react-hot-toast";
import { DepartmentEmployees } from "@/types";

interface DepartmentEmployeesModalProps {
  departmentId: number;
  currentHeadId: string;
}

export function DepartmentEmployeesModal({
  departmentId,
  currentHeadId,
}: DepartmentEmployeesModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<DepartmentEmployees | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { departmentEmployees, isLoading } = useGetDepartmentEmployees(departmentId);
  const { updateHead, isLoading: isUpdating } = useUpdateDepartmentHead({ departmentId });

  const handleUpdateHeadClick = (employee: DepartmentEmployees) => {
    setSelectedEmployee(employee);
    setShowConfirmDialog(true);
  };

  const handleConfirmUpdate = async () => {
    if (!selectedEmployee) return;

    try {
      await updateHead(selectedEmployee.id);
      setShowConfirmDialog(false);
      setIsOpen(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error("Error updating department head:", error);
    }
  };

  const handleCancelUpdate = () => {
    setShowConfirmDialog(false);
    setSelectedEmployee(null);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Users className="h-4 w-4" />
        <span>Ver Empleados</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Empleados del Departamento</DialogTitle>
            <DialogDescription>
              Seleccione un empleado para asignarlo como jefe del departamento
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Apellidos</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <div className="space-y-2">
                        <SkeletonLoader className="h-4 w-full" />
                        <SkeletonLoader className="h-4 w-full" />
                        <SkeletonLoader className="h-4 w-full" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : departmentEmployees?.length ? (
                  departmentEmployees.map((employee: DepartmentEmployees) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.Name}</TableCell>
                      <TableCell>
                        {employee.Surname1} {employee.Surname2}
                      </TableCell>
                      <TableCell>{employee.Email}</TableCell>
                      <TableCell>
                        {employee.id === currentHeadId ? (
                          <span className="text-sm text-muted-foreground">
                            Jefe Actual
                          </span>
                        ) : (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleUpdateHeadClick(employee)}
                            disabled={isUpdating}
                          >
                            {isUpdating ? "Actualizando..." : "Asignar como Jefe"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      No hay empleados en este departamento
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Cambio de Jefe</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas asignar a{" "}
              <span className="font-medium">
                {selectedEmployee?.Name} {selectedEmployee?.Surname1} {selectedEmployee?.Surname2}
              </span>{" "}
              como nuevo jefe de departamento?
              <br /><br />
              <span className="text-yellow-600 dark:text-yellow-500">
                ⚠️ Todas las solicitudes del departamento serán asignadas al nuevo jefe.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelUpdate}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmUpdate}
              disabled={isUpdating}
              className="bg-primary"
            >
              {isUpdating ? "Actualizando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}