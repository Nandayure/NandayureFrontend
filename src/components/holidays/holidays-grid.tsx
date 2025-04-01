"use client"

import { useState } from "react"
import { Loader2, Calendar, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion" // Add this import
import useGetHolidays from "@/hooks/holiday/queries/useGetHolidays"
import HolidayCard from "./holiday-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardFooter } from "@/components/ui/card"

function HolidayCardSkeleton() {
  return (
    <Card className="border hover:shadow-sm transition-shadow duration-200">
      <CardHeader className="pb-2 relative">
        <div className="absolute right-4 top-4 z-10">
          <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
            <div className="h-5 w-24 rounded-full bg-muted animate-pulse" />
          </div>
          <div className="h-6 w-3/4 rounded-md bg-muted animate-pulse" />
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <div className="h-4 w-1/2 rounded-md bg-muted animate-pulse" />
          </div>
        </div>
      </CardHeader>
      <CardFooter className="pt-4">
        <div className="h-9 w-full rounded-md bg-muted animate-pulse" />
      </CardFooter>
    </Card>
  )
}

function TabsSkeletonLoader() {
  return (
    <div className="flex justify-center mb-8">
      <div className="grid w-full max-w-md grid-cols-3 rounded-lg bg-muted p-1">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-center p-3 gap-2">
            <div className="h-4 w-16 bg-muted-foreground/15 rounded-full animate-pulse" />
            <div className="h-5 w-6 bg-muted-foreground/15 rounded-full animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HolidaysGrid() {
  const { holidays, isError, isLoading, error } = useGetHolidays()
  const [activeTab, setActiveTab] = useState("all")

  // Filter holidays based on tab selection
  const filteredHolidays = !holidays ? [] :
    activeTab === "all" ? holidays :
      activeTab === "recurring" ? holidays.filter(holiday => holiday.isRecurringYearly) :
        holidays.filter(holiday => !holiday.isRecurringYearly)

  // Count holidays for each category
  const recurringCount = holidays?.filter(h => h.isRecurringYearly)?.length || 0
  const regularCount = holidays?.filter(h => !h.isRecurringYearly)?.length || 0
  const totalCount = holidays?.length || 0

  if (isLoading) {
    return (
      <div className="space-y-8">
        <TabsSkeletonLoader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HolidayCardSkeleton />
          <HolidayCardSkeleton />
          <HolidayCardSkeleton />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="mt-6">
        <AlertTitle>Error al cargar los días feriados</AlertTitle>
        <AlertDescription>
          {error?.message || "No se pudieron cargar los días feriados. Por favor, inténtelo de nuevo más tarde."}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      <Tabs
        defaultValue="all"
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3 hover:cursor-pointer">
            <TabsTrigger value="all">
              <span className="mr-2">Todos</span>
              <Badge variant="secondary">
                {totalCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="recurring">
              <span className="mr-2">Recurrentes</span>
              <Badge variant="secondary">
                {recurringCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="regular">
              <span className="mr-2">Específicos</span>
              <Badge variant="secondary">
                {regularCount}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          {filteredHolidays.length === 0 ? (
            <Alert>
              <AlertTitle>No hay días feriados</AlertTitle>
              <AlertDescription>No se encontraron días feriados.</AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {filteredHolidays.map((holiday, index) => (
                  <motion.div
                    key={holiday.id}
                    layout
                    initial={{ opacity: 0, x: 40, y: 40, scale: 1.1 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -40, y: -40, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.2, 0, 0.3, 1],
                      delay: index * 0.05
                    }}
                    className="col-span-1"
                  >
                    <HolidayCard holiday={holiday} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recurring">
          {recurringCount === 0 ? (
            <Alert>
              <AlertTitle>No hay días feriados recurrentes</AlertTitle>
              <AlertDescription>No se encontraron días feriados recurrentes anuales.</AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {filteredHolidays.map((holiday, index) => (
                  <motion.div
                    key={holiday.id}
                    layout
                    initial={{ opacity: 0, x: 40, y: 40, scale: 1.1 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -40, y: -40, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.2, 0, 0.3, 1],
                      delay: index * 0.05
                    }}
                    className="col-span-1"
                  >
                    <HolidayCard holiday={holiday} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>

        <TabsContent value="regular">
          {regularCount === 0 ? (
            <Alert>
              <AlertTitle>No hay días feriados específicos</AlertTitle>
              <AlertDescription>No se encontraron días feriados de fecha específica.</AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {filteredHolidays.map((holiday, index) => (
                  <motion.div
                    key={holiday.id}
                    layout
                    initial={{ opacity: 0, x: 40, y: 40, scale: 1.1 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -40, y: -40, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.2, 0, 0.3, 1],
                      delay: index * 0.05
                    }}
                    className="col-span-1"
                  >
                    <HolidayCard holiday={holiday} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}