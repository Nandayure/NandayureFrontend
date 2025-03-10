"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useState } from "react"

interface RequestType {
  name: string
  total: number
  percentage: number
}

interface RequestTypePieChartProps {
  vacationRequests: RequestType
  salaryCertificateRequests: RequestType
  paymentConfirmationRequests: RequestType
}

export function RequestTypePieChart({
  vacationRequests,
  salaryCertificateRequests,
  paymentConfirmationRequests,
}: RequestTypePieChartProps) {
  // Estado para manejar el sector activo en el hover
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Preparamos los datos para el gráfico
  const data = [
    {
      name: vacationRequests.name,
      value: vacationRequests.total,
      percentage: vacationRequests.percentage,
      color: "#3b82f6", // blue-500
    },
    {
      name: salaryCertificateRequests.name,
      value: salaryCertificateRequests.total,
      percentage: salaryCertificateRequests.percentage,
      color: "#10b981", // green-500
    },
    {
      name: paymentConfirmationRequests.name,
      value: paymentConfirmationRequests.total,
      percentage: paymentConfirmationRequests.percentage,
      color: "#8b5cf6", // purple-500
    },
  ]

  // Componente personalizado para el tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].value} solicitudes ({payload[0].payload.percentage.toFixed(1)}%)
          </p>
        </div>
      )
    }
    return null
  }

  // Manejadores de eventos para animación en hover
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
          animationDuration={500}
          animationBegin={0}
          animationEasing="ease-out"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              stroke={entry.color}
              strokeWidth={1}
              style={{
                opacity: index === activeIndex ? 1 : 0.9,
                cursor: "pointer",
                transition: "opacity 0.3s ease",
              }}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          formatter={(value, entry: any, index) => {
            return (
              <span className="text-sm">
                {value} ({data[index].percentage.toFixed(1)}%)
              </span>
            )
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

