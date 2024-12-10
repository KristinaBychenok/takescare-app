import { Controller } from 'react-hook-form'
import { FC } from 'react'
import { Button } from '@/components/ui/button'

interface ToogleInputsFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger?: any
  title: string
  name: string
  options: { value: string; label: string }[]
  selectedColor: string
  selectedBg: string
  notSelectedColor: string
  notSelectedBg: string
  isBg?: string
  onChange?: (value: string) => void
  age?: string
}

export const ToogleInputsField: FC<ToogleInputsFieldProps> = ({
  control,
  title,
  name,
  options,
  selectedColor,
  selectedBg,
  notSelectedColor,
  notSelectedBg,
  isBg,
  onChange,
}) => {
  return (
    <div>
      <p className="pb-2 text-base font-bold">{title}</p>
      <div
        style={{ backgroundColor: isBg || '' }}
        className="flex flex-col md:flex-row gap-4 p-1 w-full rounded-[8px]"
      >
        <Controller
          name={name}
          control={control}
          defaultValue={options[0].value}
          render={({ field }) => (
            <>
              {options.map((option) => {
                const isSelected = field.value === option.value
                const buttonStyles = {
                  color: isSelected ? selectedColor : notSelectedColor,
                  backgroundColor: isSelected ? selectedBg : notSelectedBg,
                  boxShadow: isBg ? 'none' : '',
                }

                return (
                  <Button
                    key={option.value}
                    variant="default"
                    className="rounded-[8px] w-full hover:bg-none"
                    style={buttonStyles}
                    type="button"
                    onClick={() => {
                      field.onChange(option.value)
                      if (onChange) {
                        onChange(option.value)
                      }
                    }}
                  >
                    {option.label}
                  </Button>
                )
              })}
            </>
          )}
        />
      </div>
    </div>
  )
}
