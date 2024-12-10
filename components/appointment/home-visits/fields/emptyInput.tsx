import { Controller } from 'react-hook-form'
import { FC } from 'react'
import { Input } from '@/components/ui/input'
import { Rules } from '../helpers'

interface EmptyInputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger?: any
  title: string
  name: string
  placeholder: string
  onValueChange?: (value: string) => void
  rules?: Rules
  type?: string
}

export const EmptyInputField: FC<EmptyInputFieldProps> = ({
  control,
  trigger,
  name,
  placeholder,
  onValueChange,
  rules,
  type = 'text',
}) => {
  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={''}
        render={({ field, fieldState: { error, isTouched } }) => (
          <>
            <Input
              required={!!rules?.required}
              type={type}
              id={name}
              placeholder={placeholder}
              value={field.value}
              onChange={(value) => {
                field.onChange(value.target.value)
                if (onValueChange) onValueChange(value.target.value)
                if (trigger) trigger(name)
              }}
              onBlur={() => {
                field.onBlur()
                if (trigger) trigger(name)
              }}
              className="w-full border-t-0 border-x-0 border-b-2 rounded-none shadow-none text-base font-normal text-grey-default focus-visible:border-b-black"
            />
            {isTouched && error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  )
}
