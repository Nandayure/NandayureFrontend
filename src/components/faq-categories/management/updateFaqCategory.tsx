'use client'

import { FaqCategory } from "@/types"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2Icon, TagIcon } from "lucide-react";
import { useUpdateFaqCategory } from "@/hooks/faq-categories/commands/useUpdateFaqCategory";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
  children: React.ReactNode
  FaqCategory: FaqCategory
}

export default function UpdateFaqCategory({ children, FaqCategory }: Props) {
  const {
    form,
    isOpen,
    setIsOpen,
    onSubmit,
    isPending,
    isError,
    error
  } = useUpdateFaqCategory({ faqCategory: FaqCategory });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Actualizar categoría de FAQ
          </DialogTitle>
          <DialogDescription>
            Actualiza la información de la categoría &quot;{FaqCategory.name}&quot;
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Nombre de la categoría</FormLabel>
                    <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          autoComplete="off"
                          placeholder="Ingresa el nombre de la categoría"
                          disabled={isPending}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {error instanceof Error
                      ? error.message
                      : 'Ha ocurrido un error al actualizar la categoría'}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  disabled={isPending}
                  className="mt-2 sm:mt-0"
                  type="button"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2Icon size={16} className="mr-2 animate-spin" />
                    <span>Actualizando...</span>
                  </>
                ) : (
                  <span>Actualizar categoría</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
