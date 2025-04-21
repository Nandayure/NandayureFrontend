"use client"

import Flag from "@/components/common/Flag"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { titleFont } from "@/lib/fonts"
import { usePostPaySlip } from "@/hooks"
import { BiWeeklyDatePicker } from "../bi-weekly-date-picker"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

// Define the validation schema
const formSchema = z.object({
  reason: z.string().min(1, { message: "El motivo es obligatorio" }),
  date: z.string().min(1, { message: "Debe seleccionar una quincena" }),
})

type FormValues = z.infer<typeof formSchema>

const PaySlipForm = () => {
  const { mutation } = usePostPaySlip()
  const router = useRouter()

  // Setup form with zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      date: "",
    },
  })

  // Define submit handler that calls the hook's mutate function
  const onSubmit = async (values: FormValues) => {
    try {
      await toast.promise(
        mutation.mutateAsync(values),
        {
          loading: "Enviando solicitud...",
          success: "Solicitud enviada",
          error: "Error al enviar solicitud",
        },
        { duration: 4500 },
      )
      setTimeout(() => {
        router.push("/")
      }, 1000)
    } catch (error) {
      console.error("Error durante el envío del formulario", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h5 className={`${titleFont.className} mb-3 text-base font-semibold text-gray-900 md:text-xl`}>
          Solicitud de boletas de pago
        </h5>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Por favor, indique el motivo y la quincena de la solicitud.
        </p>
        <Flag />
        <div className="mt-4" />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo</FormLabel>
              <FormControl>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Escribe el motivo de la solicitud"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quincena</FormLabel>
              <FormControl>
                <BiWeeklyDatePicker value={field.value} onChange={field.onChange} maxDate={new Date()} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button type="submit" className="mt-4 w-full sm:w-auto" disabled={mutation.isPending}>
            {mutation.isPending ? <Spinner /> : "Enviar solicitud"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PaySlipForm
