"use client"

import { useFormContext, useWatch } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetAllCivilStatus, useGetAllGender, useIdentification } from "@/hooks"
import { useCheckId } from "@/hooks/validations/useValidations"
import { useEffect, useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const BirthdateDropdowns = () => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
    trigger
  } = useFormContext()

  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedYear, setSelectedYear] = useState("")

  // Generar el rango de años (entre 18 y 120 años atrás)
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - 120
    const years = []
    for (let year = currentYear - 18; year >= startYear; year--) {
      years.push(year)
    }
    return years
  }

  // Generar lista de meses
  const months = [
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Mayo" },
    { value: "6", label: "Junio" },
    { value: "7", label: "Julio" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" }
  ]

  // Generar días basados en el mes y año seleccionados
  const generateDayOptions = () => {
    if (!selectedMonth || !selectedYear) return Array.from({ length: 31 }, (_, i) => i + 1)

    const month = parseInt(selectedMonth, 10)
    const year = parseInt(selectedYear, 10)

    // Determinar días en el mes
    let daysInMonth = 31
    if ([4, 6, 9, 11].includes(month)) {
      daysInMonth = 30
    } else if (month === 2) {
      // Comprobar si es año bisiesto
      daysInMonth = ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 29 : 28
    }

    return Array.from({ length: daysInMonth }, (_, i) => i + 1)
  }

  // Actualizar la fecha en el formulario cuando cambian los valores
  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const dateObj = new Date(
        parseInt(selectedYear, 10),
        parseInt(selectedMonth, 10) - 1, // Meses en JS son 0-indexados
        parseInt(selectedDay, 10)
      )

      if (!isNaN(dateObj.getTime())) {
        setValue("Birthdate", dateObj.toISOString(), { shouldValidate: true })
      }
    }
  }, [selectedYear, selectedMonth, selectedDay, setValue])

  // Extraer valores de la fecha si ya existe en el formulario
  useEffect(() => {
    const currentDate = getValues("Birthdate")
    if (currentDate) {
      try {
        const date = new Date(currentDate)
        if (!isNaN(date.getTime())) {
          setSelectedYear(date.getFullYear().toString())
          setSelectedMonth((date.getMonth() + 1).toString())
          setSelectedDay(date.getDate().toString())
        }
      } catch (e) {
        // Si hay error al parsear la fecha, no hacemos nada
      }
    }
  }, [getValues])

  return (
    <FormField
      control={control}
      name="Birthdate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Fecha de Nacimiento</FormLabel>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Select
                value={selectedMonth}
                onValueChange={(value) => {
                  setSelectedMonth(value)
                  // Ajustar el día si el nuevo mes tiene menos días
                  const daysInNewMonth = generateDayOptions().length
                  if (selectedDay && parseInt(selectedDay, 10) > daysInNewMonth) {
                    setSelectedDay(daysInNewMonth.toString())
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Mes" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {months.map(month => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select
                value={selectedDay}
                onValueChange={setSelectedDay}
                disabled={!selectedMonth}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Día" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {generateDayOptions().map(day => (
                    <SelectItem key={day} value={day.toString()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select
                value={selectedYear}
                onValueChange={(value) => {
                  setSelectedYear(value)
                  // Verificar días en febrero para años bisiestos
                  if (selectedMonth === "2" && selectedDay) {
                    const daysInFeb = generateDayOptions().length
                    if (parseInt(selectedDay, 10) > daysInFeb) {
                      setSelectedDay(daysInFeb.toString())
                    }
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Año" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  {generateYearOptions().map(year => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function PersonalInfoStep() {
  const { genders } = useGetAllGender()
  const { civilStatus } = useGetAllCivilStatus()
  const {
    control,
    setError,
    clearErrors,
    formState,
    setValue,
    getValues
  } = useFormContext()

  // Refs and states
  const processingValidationRef = useRef(false)
  const [fieldsDisabled, setFieldsDisabled] = useState(false)
  const [debouncedIdForIdentification, setDebouncedIdForIdentification] = useState("")

  // Watch for ID changes
  const idValue = useWatch({
    control,
    name: "id",
    defaultValue: ""
  })

  // ID validation hook with 500ms debounce
  const {
    data: idCheck,
    isLoading: isCheckingId,
    isFetched: idWasChecked
  } = useCheckId(idValue?.length >= 9 ? idValue : undefined, {
    enabled: idValue?.length >= 9,
    retry: 0,
    debounceMs: 500
  })

  // Identification service hook
  const { identificationData, isLoading: isLoadingId, fetchData } = useIdentification()

  // Debounce identification lookup separately
  useEffect(() => {
    if (idValue.length !== 9) return;

    const handler = setTimeout(() => {
      setDebouncedIdForIdentification(idValue);
    }, 800); // Slightly longer debounce for identification lookup

    return () => {
      clearTimeout(handler);
    };
  }, [idValue]);

  // Handle ID validation and fetching
  useEffect(() => {
    if (!idWasChecked || processingValidationRef.current || debouncedIdForIdentification.length !== 9) return;

    processingValidationRef.current = true;

    try {
      if (idCheck?.exists === true) {
        setError("id", {
          type: "manual",
          message: "Esta cédula ya está registrada"
        });
        setFieldsDisabled(false);
      } else if (idCheck?.exists === false) {
        if (formState.errors.id?.type === "manual") {
          clearErrors("id");
        }
        // Only fetch identification data if ID is not registered
        fetchData(debouncedIdForIdentification);
      }
    } finally {
      processingValidationRef.current = false;
    }
  }, [idCheck, idWasChecked, debouncedIdForIdentification, setError, clearErrors, formState.errors.id?.type, fetchData]);

  // Handle identification data response
  useEffect(() => {
    if (!identificationData) return;

    if (identificationData.results && identificationData.results.length > 0) {
      const person = identificationData.results[0];
      setValue("Name", person.firstname1);
      setValue("Surname1", person.lastname1);
      setValue("Surname2", person.lastname2);
      setFieldsDisabled(true);
    } else {
      setFieldsDisabled(false);
    }
  }, [identificationData, setValue]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Información Personal</h2>
        <p className="text-muted-foreground">Ingrese la información personal del empleado.</p>
      </div>

      <div className="grid gap-4">
        <FormField
          control={control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cédula</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="Ingrese la cédula (9 dígitos)"
                    {...field}
                    maxLength={9}
                  />
                </FormControl>
                {idValue?.length >= 9 && (isCheckingId || isLoadingId) && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese el nombre"
                  {...field}
                  disabled={fieldsDisabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="Surname1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primer Apellido</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el primer apellido"
                    {...field}
                    disabled={fieldsDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="Surname2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segundo Apellido</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el segundo apellido"
                    {...field}
                    disabled={fieldsDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <BirthdateDropdowns />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="GenderId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number.parseInt(value, 10))}
                  value={field.value?.toString() || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un género" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genders?.map((gender) => (
                      <SelectItem key={gender.id} value={gender.id.toString()}>
                        {gender.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="MaritalStatusId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado Civil</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number.parseInt(value, 10))}
                  value={field.value?.toString() || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un estado civil" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {civilStatus?.map((status) => (
                      <SelectItem key={status.id} value={status.id.toString()}>
                        {status.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}

