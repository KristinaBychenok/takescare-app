import { Controller } from 'react-hook-form'
import { FC } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronDown, XIcon } from 'lucide-react'
import { Rules } from '../helpers'

interface MultiSearchSelectFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  options: string[]
  title: string
  name: string
  placeholder: string
  rules?: Rules
  onValueChange?: (value: string[]) => void
}

export const MultiSearchSelectField: FC<MultiSearchSelectFieldProps> = ({
  control,
  options,
  title,
  name,
  placeholder,
  rules,
  onValueChange,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="pb-2 text-base font-bold">
        {title}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className={cn(
                    'flex w-full border-b-2 min-h-10 items-center justify-between cursor-pointer',
                    error ? 'border-red-500' : 'border-gray-300'
                  )}
                >
                  {field.value?.length > 0 ? (
                    <div className="flex flex-wrap items-center">
                      {field.value.map((value: string) => (
                        <span
                          key={value}
                          className="px-3 py-1 m-1 text-sm bg-gray-100 rounded"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500 px-3">{placeholder}</span>
                  )}
                  {field.value?.length > 0 && (
                    <XIcon
                      className="h-4 w-4 ml-auto cursor-pointer mr-2"
                      onClick={() => field.onChange([])}
                    />
                  )}
                  <ChevronDown className="h-4 w-4" />
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          key={option}
                          onSelect={() => {
                            const isSelected = field.value?.includes(option)
                            const newValues = isSelected
                              ? field.value.filter(
                                  (val: string) => val !== option
                                )
                              : [...(field.value || []), option]
                            field.onChange(newValues)
                            if (onValueChange) onValueChange(newValues)
                          }}
                        >
                          <div
                            className={cn(
                              'mr-2 flex h-4 w-4 items-center justify-center rounded border',
                              field.value?.includes(option)
                                ? 'bg-primary text-white'
                                : 'bg-transparent'
                            )}
                          >
                            {field.value?.includes(option) && <CheckIcon />}
                          </div>
                          <span>{option}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {error && (
              <span className="text-sm text-red-500">{error.message}</span>
            )}
          </>
        )}
      />
    </div>
  )
}
