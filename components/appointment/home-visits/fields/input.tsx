import { Controller } from 'react-hook-form'
import { FC } from 'react'
import { Input } from '@/components/ui/input'
import { Rules } from '../helpers'

interface InputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger: any
  title: string
  name: string
  placeholder: string
  rules?: Rules
}

export const InputField: FC<InputFieldProps> = ({
  control,
  trigger,
  title,
  name,
  placeholder,
  rules,
}) => {
  return (
    <div>
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
        defaultValue={''}
        render={({ field, fieldState: { error, isTouched } }) => (
          <>
            <Input
              type="text"
              id={name}
              placeholder={placeholder}
              value={field.value}
              onChange={(value) => {
                field.onChange(value.target.value)
                if (trigger) trigger(name)
              }}
              onBlur={() => {
                field.onBlur()
                if (trigger) trigger(name)
              }}
              className="border-t-0 border-x-0 border-b-2 rounded-none shadow-none text-base font-normal text-grey-default focus-visible:border-b-black"
              aria-labelledby={`${name}-label`}
            />
            {isTouched && error && (
              <p className="text-red-500 text-sm mt-1" id={`${name}-error`}>
                {error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  )
}
