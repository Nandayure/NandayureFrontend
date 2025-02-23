import { format } from "date-fns"
import { es } from "date-fns/locale"

interface FormattedDateProps {
  date: Date
  className?: string
}

export function FormattedDate({ date, className }: FormattedDateProps) {
  const formattedDate = format(date, "'Actualizado el' d 'de' MMMM 'de' yyyy", {
    locale: es,
  })

  return (
    <time dateTime={date.toISOString()} className={className}>
      {formattedDate}
    </time>
  )
}

