import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Rules } from '../helpers'

interface TextereaFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  title: string
  name: string
  placeholder: string
  rules?: Rules
}

export const TextereaField: FC<TextereaFieldProps> = ({
  control,
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
        render={({ field, fieldState: { error } }) => (
          <>
            <Textarea
              placeholder={placeholder}
              id={name}
              value={field.value}
              onChange={field.onChange}
              className="bg-grey-light text-xs font-normal mt-2 resize-none"
              rows={5}
              aria-labelledby={`${name}-label`}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  )
}
