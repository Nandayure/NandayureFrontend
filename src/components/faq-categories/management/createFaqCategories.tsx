'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2Icon, TagIcon } from "lucide-react";
import { useCreateFaqCategory } from "@/hooks/faq-categories/commands/useCreateFaqCategory";

interface Props {
  children: React.ReactNode
}

export function CreateFaqCategories({ children }: Props) {
  const {
    form,
    isOpen,
    setIsOpen,
    onSubmit,
    isPending
  } = useCreateFaqCategory();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Crear categoría de FAQ
          </DialogTitle>
          <DialogDescription>
            Llena el formulario para crear una nueva categoría de FAQ
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
                      <div className="relative">
                        <TagIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          {...field}
                          value={field.value || ""}
                          autoComplete="off"
                          placeholder="Ingresa el nombre de la categoría"
                          disabled={isPending}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <span>Creando...</span>
                  </>
                ) : (
                  <span>Crear categoría</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}