'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2Icon, HelpCircle } from "lucide-react";
import { useCreateFaq } from "@/hooks/faq/commands/useCreateFaq";
import useGetFaqCategories from "@/hooks/faq-categories/queries/useGetFaqCategories";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
  children: React.ReactNode
}

export function CreateFaq({ children }: Props) {
  const {
    form,
    isOpen,
    setIsOpen,
    onSubmit,
    isPending,
    isError,
    error
  } = useCreateFaq();

  const { faqCategories = [], isLoading: isCategoriesLoading } = useGetFaqCategories();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            Crear nueva pregunta frecuente
          </DialogTitle>
          <DialogDescription>
            Llena el formulario para crear una nueva pregunta frecuente
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Campo de pregunta */}
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Pregunta</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <HelpCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          {...field}
                          value={field.value || ""}
                          autoComplete="off"
                          placeholder="¿Cómo puedo...?"
                          disabled={isPending}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo de respuesta */}
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Respuesta</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value || ""}
                        autoComplete="off"
                        placeholder="Para resolver esto, debes..."
                        disabled={isPending}
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dropdown de categorías */}
              <FormField
                control={form.control}
                name="faqCategoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Categoría</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? field.value.toString() : undefined}
                      disabled={isPending || isCategoriesLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={faqCategories.length > 0 ? 'Selecciona una categoría' : 'No existen categorías'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {faqCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {error instanceof Error
                      ? error.message
                      : 'Ha ocurrido un error al crear la FAQ'}
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
                disabled={isPending || isCategoriesLoading}
              >
                {isPending ? (
                  <>
                    <Loader2Icon size={16} className="mr-2 animate-spin" />
                    <span>Creando...</span>
                  </>
                ) : (
                  <span>Crear FAQ</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}