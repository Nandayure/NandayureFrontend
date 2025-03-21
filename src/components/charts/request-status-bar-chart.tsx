"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface RequestStatus {
  status: string
  total: number
}

interface RequestStatusBarChartProps {
  totalApproved: RequestStatus
  totalRejected: RequestStatus
  totalPending: RequestStatus
}

export function RequestStatusBarChart({ totalApproved, totalRejected, totalPending }: RequestStatusBarChartProps) {
  // Preparamos los datos para el gráfico
  const data = [
    {
      name: "Aprobadas",
      value: totalApproved.total,
      color: "#10b981", // green-500
    },
    {
      name: "Rechazadas",
      value: totalRejected.total,
      color: "#ef4444", // red-500
    },
    {
      name: "Pendientes",
      value: totalPending.total,
      color: "#f59e0b", // amber-500
    },
  ]

  // Componente personalizado para el tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-xs">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">{payload[0].value} solicitudes</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={60}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
        <Bar
          dataKey="value"
          radius={[4, 4, 0, 0]}
          animationDuration={1000}
          animationBegin={0}
          animationEasing="ease-out"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

