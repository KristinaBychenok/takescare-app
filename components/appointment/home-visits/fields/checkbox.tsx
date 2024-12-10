import { Controller } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { FC } from 'react'
import { CheckedState } from '@radix-ui/react-checkbox'
import { Rules } from '../helpers'

interface CheckboxFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  title: string
  name: string
  onValueChange?: (value: CheckedState) => void
  rules?: Rules
}

export const CheckboxField: FC<CheckboxFieldProps> = ({
  control,
  title,
  name,
  onValueChange,
  rules,
}) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={false}
        render={({ field }) => (
          <div className="items-center flex space-x-2 text-sm font-normal">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={(value) => {
                field.onChange(value)
                if (!!onValueChange) onValueChange(value)
              }}
              aria-labelledby={`${name}-label`}
            />
            <label
              htmlFor={name}
              className="text-center text-sm font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              id={`${name}-label`}
            >
              {title}
            </label>
          </div>
        )}
      />
    </div>
  )
}
