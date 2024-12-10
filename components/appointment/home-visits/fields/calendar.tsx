import { cn, getCookie } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FC } from 'react'
import { format, isBefore, isAfter } from 'date-fns'
import { Controller } from 'react-hook-form'
import { Rules } from '../helpers'

interface CalendarFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger?: any
  title: string
  name: string
  placeholder: string
  maxDate: Date
  minDate: Date
  onValueChange?: (value: string) => void
  rules?: Rules
  dateOfBirth?: string
}

export const CalendarField: FC<CalendarFieldProps> = ({
  control,
  trigger,
  title,
  name,
  placeholder,
  maxDate,
  minDate,
  onValueChange,
  rules,
  dateOfBirth,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="pb-2 text-base font-bold"
        id={`${name}-label`}
      >
        {title}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full border-t-0 border-x-0 border-b-2 rounded-none shadow-none justify-start text-left text-muted-foreground text-base font-normal text-grey-default',
                      !field.value && 'text-muted-foreground'
                    )}
                    aria-labelledby={`${name}-label`}
                  >
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : dateOfBirth ? (
                      format(dateOfBirth, 'PPP')
                    ) : (
                      <span>{placeholder}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth || field.value}
                    onSelect={(value) => {
                      field.onChange(value)
                      if (onValueChange)
                        onValueChange(value?.toISOString() || '')
                      if (trigger) trigger(name)
                    }}
                    onDayBlur={() => {
                      field.onBlur()
                      if (trigger) trigger(name)
                    }}
                    initialFocus
                    weekStartsOn={1}
                    disabled={(date) =>
                      isBefore(date, minDate) || isAfter(date, maxDate)
                    }
                    aria-labelledby={`${name}-label`}
                    lang={getCookie('locale') || 'pl'}
                  />
                </PopoverContent>
              </Popover>
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </>
          )
        }}
      />
    </div>
  )
}
