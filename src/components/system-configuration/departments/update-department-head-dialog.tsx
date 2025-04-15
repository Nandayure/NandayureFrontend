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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllEmployees } from "@/hooks";
import { useUpdateDepartmentHead } from "@/hooks/system-configuration/departments/commands/use-update-department-head";
import { useState } from "react";

interface UpdateDepartmentHeadDialogProps {
  departmentId: string;
  trigger?: React.ReactNode;
}

export function UpdateDepartmentHeadDialog({
  departmentId,
  trigger
}: UpdateDepartmentHeadDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedHeadId, setSelectedHeadId] = useState<string>("");
  const { mutate: updateHead, isPending } = useUpdateDepartmentHead();
  const { employees = [] } = useGetAllEmployees();

  const handleConfirm = () => {
    if (!selectedHeadId) return;

    updateHead({
      id: departmentId,
      data: { departmentHeadId: selectedHeadId }
    });
    setOpen(false);
  };

  return (
    <>
      {trigger ? (
        <span onClick={() => setOpen(true)}>{trigger}</span>
      ) : (
        <Button onClick={() => setOpen(true)}>
          Actualizar Jefe
        </Button>
      )}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Actualizar Jefe de Departamento</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p>
                Al actualizar el jefe de departamento, todas las solicitudes del departamento
                serán asignadas al nuevo jefe. Esta acción no se puede deshacer.
              </p>
              <div className="pt-4">
                <Select onValueChange={setSelectedHeadId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar nuevo jefe" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.Name} {employee.Surname1} {employee.Surname2}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={isPending || !selectedHeadId}
            >
              {isPending ? "Actualizando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}