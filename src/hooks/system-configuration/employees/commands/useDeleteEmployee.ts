import { deleteEmployee } from "@/services/system-configuration/employees/commands/actions";
import { Employee } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

interface UseDeleteEmployeeProps {
  employee: Employee;
}
export const useDeleteEmployee = ({ employee }: UseDeleteEmployeeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => deleteEmployee(parseInt(employee.id)),
    onSuccess: () => {
      toast.success("Empleado eliminado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["getAllEmployees"] });
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Ha ocurrido un error al eliminar el empleado");
    },
  });

  const onConfirmDelete = () => {
    mutate();
  };

  return {
    isOpen,
    setIsOpen,
    onConfirmDelete,
    isPending,
    isError,
    error,
  };
}