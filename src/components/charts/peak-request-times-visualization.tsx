"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { PeakRequestTimes } from "@/types"

const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
const shortDayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

// Colores oficiales de la municipalidad
const MUNICIPAL_COLORS = {
  GREEN: "#4caf50", // Verde principal
  BLUE: "#34b1fd", // Azul secundario
  YELLOW: "#e0ac20", // Amarillo terciario
}

// Paleta de colores basada en los colores oficiales
const colorPalette = {
  primary: MUNICIPAL_COLORS.GREEN,
  secondary: MUNICIPAL_COLORS.BLUE,
  tertiary: MUNICIPAL_COLORS.YELLOW,

  // Versiones más oscuras para hover
  primaryHover: "#388e3c", // Verde más oscuro
  secondaryHover: "#1e88e5", // Azul más oscuro
  tertiaryHover: "#c49000", // Amarillo más oscuro

  background: "#ffffff",

  // Escala para el mapa de calor (basada en verdes)
  heatmap: [
    "#f1f8e9", // Verde muy claro
    "#c8e6c9",
    "#a5d6a7",
    "#81c784",
    "#4caf50", // Verde oficial
    "#388e3c", // Verde más oscuro
  ],

  // Escala alternativa para el mapa de calor (basada en amarillos-verdes)
  heatmapAlt: [
    "#fffde7", // Amarillo muy claro
    "#fff9c4",
    "#e0ac20", // Amarillo oficial
    "#8bc34a",
    "#4caf50", // Verde oficial
  ],
}

interface PeakRequestTimesVisualizationProps {
  peakRequestTimes: PeakRequestTimes
  isLoading: boolean
  isError: boolean
  error: Error | null
  visualizationType: string
}

export function PeakRequestTimesVisualization({
  peakRequestTimes,
  isLoading,
  isError,
  error,
  visualizationType,
}: PeakRequestTimesVisualizationProps) {
  // Manejar el estado de activeBar dentro del componente para evitar problemas de serialización
  const [activeBar, setActiveBar] = useState<number | null>(null)

  // Process data for visualization
  const processedData = peakRequestTimes.map((item) => ({
    ...item,
    totalRequests: Number.parseInt(item.totalRequests),
    dayName: dayNames[item.dayOfWeek - 1],
    shortDayName: shortDayNames[item.dayOfWeek - 1],
    timeLabel: `${item.hour}:00`,
  }))

  // Data for heatmap
  const prepareHeatmapData = () => {
    try {
      // Create data points for the heatmap
      const heatmapData = processedData.map((item) => ({
        x: item.hour, // Hour (x-axis)
        y: item.dayOfWeek, // Day (y-axis)
        z: Number.parseInt(item.totalRequests.toString()) || 0, // Value (color intensity)
        hour: item.hour,
        dayOfWeek: item.dayOfWeek,
        dayName: item.dayName,
        timeLabel: item.timeLabel,
        totalRequests: Number.parseInt(item.totalRequests.toString()) || 0,
      }))

      // Add missing hours with zero values to ensure complete visualization
      const completeData = [...heatmapData]

      // Check if we need to add zero-value points for completeness
      for (let day = 1; day <= 7; day++) {
        for (let hour = 0; hour < 24; hour++) {
          const exists = heatmapData.some((point) => point.dayOfWeek === day && point.hour === hour)

          if (!exists) {
            completeData.push({
              x: hour,
              y: day,
              z: 0,
              hour,
              dayOfWeek: day,
              dayName: dayNames[day - 1],
              timeLabel: `${hour}:00`,
              totalRequests: 0,
            })
          }
        }
      }

      return completeData
    } catch (error) {
      console.error("Error preparing heatmap data:", error)
      // Return a minimal valid dataset if there's an error
      return [{ x: 0, y: 0, z: 0, hour: 0, dayOfWeek: 1, dayName: "Error", timeLabel: "Error", totalRequests: 0 }]
    }
  }

  // Data for day of week bar chart
  const prepareDayOfWeekData = () => {
    const dayData = dayNames.map((day, index) => {
      const dayRequests = processedData
        .filter((item) => item.dayOfWeek === index + 1)
        .reduce((sum, item) => sum + item.totalRequests, 0)

      return {
        dayOfWeek: index + 1,
        dayName: day,
        shortDayName: shortDayNames[index],
        totalRequests: dayRequests,
      }
    })

    return dayData.filter((day) => day.totalRequests > 0)
  }

  // Data for hour of day bar chart
  const prepareHourOfDayData = () => {
    const hourData = Array.from({ length: 24 }, (_, hour) => {
      const hourRequests = processedData
        .filter((item) => item.hour === hour)
        .reduce((sum, item) => sum + item.totalRequests, 0)

      return {
        hour,
        timeLabel: `${hour}:00`,
        totalRequests: hourRequests,
      }
    })

    return hourData.filter((hour) => hour.totalRequests > 0)
  }

  // Get color for heatmap based on value
  const getHeatmapColor = (value: number) => {
    // Handle invalid values
    if (value === undefined || value === null) {
      return colorPalette.heatmap[0] // Return lightest color for undefined values
    }

    // Find the maximum value safely
    const maxValue = Math.max(
      1, // Prevent division by zero
      ...processedData.map((item) => (typeof item.totalRequests === "number" ? item.totalRequests : 0)),
    )

    if (value === 0) return "#f5f7fa" // Background color for zero values

    // Calculate which color to use based on the value's percentage of max
    const percentage = value / maxValue
    const colorIndex = Math.min(Math.floor(percentage * colorPalette.heatmap.length), colorPalette.heatmap.length - 1)

    return colorPalette.heatmap[colorIndex]
  }

  // Custom tooltip for bar charts
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="rounded-lg border bg-background p-2 shadow-xs"
          style={{ borderColor: "#e2e2e2", backgroundColor: "#ffffff" }}
        >
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">{payload[0].value} solicitudes</p>
        </div>
      )
    }
    return null
  }

  // Custom tooltip for heatmap
  const CustomHeatmapTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload

      return (
        <div
          className="rounded-lg border bg-background p-2 shadow-xs"
          style={{ borderColor: "#e2e2e2", backgroundColor: "#ffffff" }}
        >
          <p className="font-medium">
            {data.dayName}, {data.timeLabel}
          </p>
          <p className="text-sm text-muted-foreground">{data.totalRequests} solicitudes</p>
        </div>
      )
    }
    return null
  }

  // Custom shape for scatter points in heatmap
  const HeatmapCell = (props: any) => {
    // Add null checks to prevent the error
    if (!props || !props.payload) {
      return null
    }

    const { cx, cy, payload } = props

    // Make sure cx and cy are defined
    if (cx === undefined || cy === undefined) {
      return null
    }

    // Safely access the z value with a default of 0
    const value = payload.z !== undefined ? payload.z : 0

    // Size based on value (min 15, max 30)
    const size = value === 0 ? 15 : Math.max(15, Math.min(30, 15 + value * 3))

    return (
      <rect
        x={cx - size / 2}
        y={cy - size / 2}
        width={size}
        height={size}
        fill={getHeatmapColor(value)}
        style={{
          opacity: value === 0 ? 0.3 : 1,
        }}
      />
    )
  }

  // Obtener el color para una barra por índice, rotando entre los tres colores oficiales
  const getBarColor = (index: number, isActive: boolean) => {
    const baseColors = [MUNICIPAL_COLORS.GREEN, MUNICIPAL_COLORS.BLUE, MUNICIPAL_COLORS.YELLOW]

    const hoverColors = [colorPalette.primaryHover, colorPalette.secondaryHover, colorPalette.tertiaryHover]

    const colorIndex = index % baseColors.length
    return isActive ? hoverColors[colorIndex] : baseColors[colorIndex]
  }

  if (isError) {
    return (
      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-6">
            <p className="text-destructive font-medium">No se pudieron cargar los datos</p>
            {error instanceof Error && <p className="text-sm text-muted-foreground mt-2">{error.message}</p>}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="h-96">
          <div className="flex h-full flex-col justify-end">
            <div className="flex items-end justify-between gap-2 h-64 w-full">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Skeleton key={i} className="w-1/6" style={{ height: `${30 + Math.random() * 60}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-4">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Skeleton key={i} className="h-4 w-16" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Renderizar el contenido según el tipo de visualización seleccionado
  const renderContent = () => {
    switch (visualizationType) {
      case "heatmap":
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Hora"
                    domain={[0, 23]}
                    tickCount={12}
                    tickFormatter={(value) => `${value}:00`}
                    label={{
                      value: "Hora del día",
                      position: "insideBottom",
                      offset: -5, // Ajusta este valor si es necesario
                    }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Día"
                    domain={[1, 7]}
                    tickCount={7}
                    tickFormatter={(value) => shortDayNames[value - 1]}
                    label={{ value: "Día de la semana", angle: -90, position: "insideLeft" }}
                    padding={{ bottom: 20 }} // Añade este padding
                  />
                  <ZAxis type="number" dataKey="z" range={[0, 400]} />
                  <Tooltip content={<CustomHeatmapTooltip />} />
                  <Scatter data={prepareHeatmapData()} shape={<HeatmapCell />} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-xs">Menos solicitudes</div>
              <div className="flex h-2 w-1/2">
                {colorPalette.heatmap.map((color, i) => (
                  <div key={i} className="flex-1 h-full" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="text-xs">Más solicitudes</div>
            </div>
          </div>
        )

      case "dayOfWeek":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={prepareDayOfWeekData().sort((a, b) => a.dayOfWeek - b.dayOfWeek)}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="dayName" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                label={{
                  value: "Solicitudes",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fontSize: 12 },
                }}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar
                dataKey="totalRequests"
                radius={[4, 4, 0, 0]}
                onMouseEnter={(_, index) => setActiveBar(index)}
                onMouseLeave={() => setActiveBar(null)}
              >
                {prepareDayOfWeekData().map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(index, index === activeBar)}
                    style={{
                      cursor: "pointer",
                      transition: "fill 0.3s ease",
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )

      case "hourOfDay":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={prepareHourOfDayData().sort((a, b) => a.hour - b.hour)}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="timeLabel"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                interval={1} // Show every other hour to avoid crowding
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                label={{
                  value: "Solicitudes",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fontSize: 12 },
                }}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar
                dataKey="totalRequests"
                radius={[4, 4, 0, 0]}
                onMouseEnter={(_, index) => setActiveBar(index)}
                onMouseLeave={() => setActiveBar(null)}
              >
                {prepareHourOfDayData().map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(index, index === activeBar)}
                    style={{
                      cursor: "pointer",
                      transition: "fill 0.3s ease",
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  return (
    <Card className="bg-white">
      <CardContent className="h-96 pt-6">{renderContent()}</CardContent>
    </Card>
  )
}

