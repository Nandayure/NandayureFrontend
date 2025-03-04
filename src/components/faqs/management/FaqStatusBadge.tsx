'use client'

import { Faq } from "@/types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useUpdateFaqStatus } from "@/hooks/faq/commands/useUpdateStateFaq";

interface Props {
  faq: Faq;
}

export default function FaqStatusBadge({ faq }: Props) {
  const { toggleStatus, isPending } = useUpdateFaqStatus({ faq });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isActive = faq.status === 'active';
  
  const handleConfirm = () => {
    toggleStatus();
    setIsDialogOpen(false);
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <button className="focus:outline-none">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 ${
            isActive
              ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400'
          }`}>
            {isPending ? (
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            ) : null}
            {isActive ? 'Activo' : 'Inactivo'}
          </span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isActive ? 'Desactivar' : 'Activar'} FAQ
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isActive 
              ? '¿Estás seguro de que quieres desactivar esta FAQ? Los usuarios no podrán verla en el sitio.'
              : '¿Estás seguro de que quieres activar esta FAQ? Será visible para todos los usuarios.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isPending}
            className={isActive ? 'bg-gray-600 hover:bg-gray-700' : 'bg-green-600 hover:bg-green-700'}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {isActive ? 'Desactivando...' : 'Activando...'}
              </>
            ) : (
              <>{isActive ? 'Desactivar' : 'Activar'}</>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}