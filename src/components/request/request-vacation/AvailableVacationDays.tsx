import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

interface AvailableVacationDaysProps {
  days: number;
}

export function AvailableVacationDays({ days }: AvailableVacationDaysProps) {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Días de vacaciones disponibles
        </CardTitle>
        <CalendarDays className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{days} días</div>
        <p className="text-xs text-muted-foreground">
          Recuerda planificar tus vacaciones con anticipación
        </p>
      </CardContent>
    </Card>
  );
}
