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

interface SearchSelectFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger?: any
  options: string[]
  title: string
  name: string
  placeholder: string
  rules?: Rules
  onValueChange?: (value: string) => void
}

export const SearchSelectField: FC<SearchSelectFieldProps> = ({
  control,
  trigger,
  options,
  title,
  name,
  placeholder,
  rules,
  onValueChange,
}) => {
  return (
    <div className="flex flex-col">
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
            <Popover>
              <PopoverTrigger
                onClick={() => {
                  if (trigger) trigger(name)
                }}
              >
                <div
                  className={cn(
                    'flex w-full border-b-2 min-h-10 items-center justify-between cursor-pointer',
                    error ? 'border-red-500' : 'border-gray-300'
                  )}
                  aria-labelledby={`${name}-label`}
                >
                  {field.value ? (
                    <span className="text-base font-normal text-grey-default px-3 py-1 rounded">
                      {field.value}
                    </span>
                  ) : (
                    <span className="text-gray-500 px-3">{placeholder}</span>
                  )}
                  {field.value && (
                    <XIcon
                      className="h-4 w-4 ml-auto cursor-pointer mr-2"
                      onClick={() => {
                        field.onChange('')
                        if (onValueChange) onValueChange('')
                        if (trigger) trigger(name)
                      }}
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
                            field.onChange(option)
                            if (onValueChange) onValueChange(option)
                            if (trigger) trigger(name)
                          }}
                          onBlur={() => {
                            field.onBlur()
                            if (trigger) trigger(name)
                          }}
                        >
                          <div
                            className={cn(
                              'mr-2 flex h-4 w-4 items-center justify-center rounded border',
                              field.value === option
                                ? 'bg-primary text-white'
                                : 'bg-transparent'
                            )}
                          >
                            {field.value === option && <CheckIcon />}
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
