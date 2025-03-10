"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoStep } from "./steps/personal-info-step"
import { ContactInfoStep } from "./steps/contact-info-step"
import { JobInfoStep } from "./steps/job-info-step"
import { Check, Loader2 } from "lucide-react"
import { usePostEmployee } from "@/hooks"
import { PersonalInfoSchema } from "@/schemas/auth/register/personal-info.schema"
import { ContactInfoSchema } from "@/schemas/auth/register/contact-info.schema"
import { JobInfoSchema } from "@/schemas/auth/register/job-info.schema"

// Combine all schemas into one
const EmployeeFormSchema = z.object({
  ...PersonalInfoSchema.shape,
  ...ContactInfoSchema.shape,
  ...JobInfoSchema.shape,
})

type EmployeeFormValues = z.infer<typeof EmployeeFormSchema>

const steps = ["personal", "contact", "job"]

export default function EmployeeRegistrationForm() {
  const [activeStep, setActiveStep] = useState(0)
  const [activeTab, setActiveTab] = useState("personal")
  const [stepCompleted, setStepCompleted] = useState<Record<string, boolean>>({
    personal: false,
    contact: false,
    job: false,
  })

  const methods = useForm<EmployeeFormValues>({
    resolver: zodResolver(EmployeeFormSchema),
    mode: "onChange",
    defaultValues: {
      id: "",
      Name: "",
      Surname1: "",
      Surname2: "",
      Birthdate: "",
      GenderId: undefined,
      MaritalStatusId: undefined,
      Email: "",
      CellPhone: "",
      HiringDate: "",
      NumberChlidren: 0,
      JobPositionId: undefined,
      AvailableVacationDays: 0,
    },
  })

  const { handleSubmit, trigger, formState, watch } = methods
  const { onSubmit, mutation } = usePostEmployee()
  console.log("Valor actual de Birthdate:", watch("Birthdate"));
  const validateStep = async (step: string) => {
    let isValid = false

    switch (step) {
      case "personal":
        isValid = await trigger(["id", "Name", "Surname1", "Surname2", "Birthdate", "GenderId", "MaritalStatusId"])
        break
      case "contact":
        isValid = await trigger(["Email", "CellPhone"])
        break
      case "job":
        isValid = await trigger(["HiringDate", "NumberChlidren", "JobPositionId", "AvailableVacationDays"])
        break
    }

    if (isValid) {
      setStepCompleted((prev) => ({ ...prev, [step]: true }))
    }

    return isValid
  }

  const handleNext = async () => {
    const currentStep = steps[activeStep]
    const isValid = await validateStep(currentStep)

    if (isValid && activeStep < steps.length - 1) {
      const nextStep = activeStep + 1
      setActiveStep(nextStep)
      setActiveTab(steps[nextStep])
    }
  }

  const handleBack = () => {
    if (activeStep > 0) {
      const prevStep = activeStep - 1
      setActiveStep(prevStep)
      setActiveTab(steps[prevStep])
    }
  }

  const handleTabChange = async (value: string) => {
    const currentStepIndex = steps.indexOf(activeTab)
    const targetStepIndex = steps.indexOf(value)

    // If trying to go forward, validate current step first
    if (targetStepIndex > currentStepIndex) {
      const isValid = await validateStep(steps[currentStepIndex])
      if (!isValid) return
    }

    setActiveTab(value)
    setActiveStep(targetStepIndex)
  }

  return (
    <FormProvider {...methods}>
      <Card className="w-full">
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="personal" disabled={activeStep > 0 && !stepCompleted.personal} className="relative">
                <span className="mr-2">1</span> Información Personal
                {stepCompleted.personal && <Check className="w-4 h-4 text-green-500 absolute -top-1 -right-1" />}
              </TabsTrigger>
              <TabsTrigger value="contact" disabled={!stepCompleted.personal} className="relative">
                <span className="mr-2">2</span> Contacto
                {stepCompleted.contact && <Check className="w-4 h-4 text-green-500 absolute -top-1 -right-1" />}
              </TabsTrigger>
              <TabsTrigger value="job" disabled={!stepCompleted.contact} className="relative">
                <span className="mr-2">3</span> Información Laboral
                {stepCompleted.job && <Check className="w-4 h-4 text-green-500 absolute -top-1 -right-1" />}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <PersonalInfoStep />
            </TabsContent>

            <TabsContent value="contact">
              <ContactInfoStep />
            </TabsContent>

            <TabsContent value="job">
              <JobInfoStep />
            </TabsContent>

            <div className="flex justify-between mt-8">
              <Button type="button" variant="outline" onClick={handleBack} disabled={activeStep === 0}>
                Anterior
              </Button>

              {activeStep < steps.length - 1 ? (
                <Button type="button" onClick={handleNext}>
                  Siguiente
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={mutation.isPending }
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    "Guardar Empleado"
                  )}
                </Button>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </FormProvider>
  )
}

