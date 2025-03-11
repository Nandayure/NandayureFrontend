"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { EmployeesWithMostRequestsQuery, YearWithMonths } from "@/types"
import { useDatesWithRequests, useEmployeesWithMostRequests } from "@/hooks"

export function EmployeeRequestsHistory() {
  const { datesWithRequests: datesData, isLoading: datesLoading } = useDatesWithRequests()
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [query, setQuery] = useState<EmployeesWithMostRequestsQuery>({ limit: 5, month: 1, year: 2024 })

  const { employeesWithMostRequests: employeesData, isLoading: employeesLoading } = useEmployeesWithMostRequests(query)

  useEffect(() => {
    if (datesData && datesData.length > 0) {
      setSelectedYear(datesData[0].year)
      setSelectedMonth(datesData[0].months[0])
    }
  }, [datesData])

  useEffect(() => {
    if (selectedYear && selectedMonth) {
      setQuery((prev) => ({ ...prev, year: selectedYear, month: selectedMonth }))
    }
  }, [selectedYear, selectedMonth])

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const chartData = employeesData ? employeesData.map((employee) => ({
    name: `${employee.name} ${employee.surname1}`,
    requests: Number.parseInt(employee.totalRequests),
    employeeId: employee.employeeId,
  })) : []

  if (datesLoading || employeesLoading) {
    return (
      <Card className="w-full h-96 flex items-center justify-center">
        <CardContent>Cargando...</CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Empleados con más solicitudes</CardTitle>
        <CardDescription>Historial de solicitudes por empleado</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-6">
          <Select value={selectedYear?.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona un año" />
            </SelectTrigger>
            <SelectContent>
              {datesData && datesData.map((yearData: YearWithMonths) => (
                <SelectItem key={yearData.year} value={yearData.year.toString()}>
                  {yearData.year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMonth?.toString()} onValueChange={(value) => setSelectedMonth(Number(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona un mes" />
            </SelectTrigger>
            <SelectContent>
              {selectedYear && datesData &&
                datesData
                  .find((yearData: YearWithMonths) => yearData.year === selectedYear)
                  ?.months.map((month: number) => (
                    <SelectItem key={month} value={month.toString()}>
                      {monthNames[month - 1]}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value, name, props) => [value, "Solicitudes"]}
                labelFormatter={(label) => `Empleado: ${label}`}
              />
              <Bar dataKey="requests" fill="#34b1fd" barSize={20} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}