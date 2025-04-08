import { restoreEmployee } from "@/services/system-configuration/employees/commands/actions";
import { Employee } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

interface UseRestoreEmployeeProps {
  employee: Employee
}

export const useRestoreEmployee = ({ employee }: UseRestoreEmployeeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => restoreEmployee(parseInt(employee.id)),
    onSuccess: () => {
      toast.success("Empleado restaurado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Ha ocurrido un error al restaurar el empleado");
    },
  });

  const onConfirmRestore = () => {
    mutate();
  };

  return {
    isOpen,
    setIsOpen,
    onConfirmRestore,
    isPending,
    isError,
    error,
  };
}

