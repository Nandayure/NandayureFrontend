'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Flag from '@/components/common/Flag';
import Spinner from '@/components/ui/spinner';
import { titleFont } from '@/lib/fonts';
import { usePostVacation } from '@/hooks';
export default function RequestVacationForm() {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  
  const { onSubmit: submitVacationRequest, setValue, mutation, errors } = usePostVacation();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (date?.from && date?.to) {
      const daysRequested = Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 3600 * 24)) + 1;
      setValue('daysRequested', daysRequested);
      setValue('departureDate', date.from);
      setValue('entryDate', date.to);
      
      submitVacationRequest();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} data-cy="vacation-request-form">
      <h5
        className={`${titleFont.className} mb-3 text-base font-semibold text-gray-900 md:text-xl`}
        data-cy="vacation-request-title"
      >
        Solicitud de vacaciones
      </h5>
      <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400" data-cy="vacation-request-description">
        Por favor, selecciona el rango de fechas para tu solicitud de vacaciones.
      </p>
      <Flag />
      
      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              data-cy="btn-date-request-vacation"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y", { locale: es })} -{" "}
                    {format(date.to, "LLL dd, y", { locale: es })}
                  </>
                ) : (
                  format(date.from, "LLL dd, y", { locale: es })
                )
              ) : (
                <span>Selecciona un rango de fechas</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start" data-cy="calendar-popover">
            <Calendar
              initialFocus
              mode="range"
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={es}
              disabled={{ before: new Date() }}
              data-cy="vacation-calendar"
              
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {errors.root && (
        <div className="mt-2 text-sm text-red-500" data-cy="error-message">{errors.root.message}</div>
      )}
      
      <div className='mt-4 flex w-full justify-end'>
        <Button
          type="submit"
          className='w-full sm:w-auto'
          data-cy='btn-submit-request-vacation'
          disabled={mutation.isPending || !date?.from || !date?.to}
        >
          {mutation.isPending ? <Spinner data-cy="loading-spinner" /> : 'Enviar solicitud'}
        </Button>
      </div>
    </form>
  );
}
 