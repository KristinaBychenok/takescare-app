import { Controller } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select'
import { FC, useState } from 'react'
import { Rules } from '../helpers'

interface TimeSelectsFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  optionsFrom: string[]
  optionsTo: string[]
  title: string
  nameFrom: string
  nameTo: string
  placeholderFrom: string
  placeholderTo: string
  isVisitDate: boolean
  isNoTimeToday: boolean
  rules?: Rules
}

export const TimeSelectsField: FC<TimeSelectsFieldProps> = ({
  control,
  optionsFrom,
  optionsTo,
  title,
  nameFrom,
  nameTo,
  placeholderFrom,
  placeholderTo,
  isVisitDate,
  isNoTimeToday,
  rules,
}) => {
  const [isOpenFrom, setIsOpenFrom] = useState(false)
  const [isOpenTo, setIsOpenTo] = useState(false)

  return (
    <div>
      <p className="pb-2 text-base font-bold">{title}</p>
      <div className="flex flex-row gap-2">
        <Controller
          name={nameFrom}
          control={control}
          rules={rules}
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                onOpenChange={(open) => setIsOpenFrom(open)}
                open={isOpenFrom}
              >
                <SelectTrigger
                  className={`w-full border-t-0 border-x-0 border-b-2 appearance-none rounded-none shadow-none flex justify-between items-center ${
                    error ? 'border-red-500' : 'border-[#E4E5E7]'
                  } text-base font-normal text-grey-default`}
                >
                  <SelectValue placeholder={placeholderFrom} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {!isVisitDate && (
                      <SelectLabel>Please, select Visit Date!</SelectLabel>
                    )}
                    {!!isVisitDate && isNoTimeToday && (
                      <SelectLabel>
                        There are no time slots available today.
                      </SelectLabel>
                    )}
                    {optionsFrom.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
        />
        <Controller
          name={nameTo}
          control={control}
          rules={{ required: `${title} is required` }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                onOpenChange={(open) => setIsOpenTo(open)}
                open={isOpenTo}
              >
                <SelectTrigger
                  className={`w-full border-t-0 border-x-0 border-b-2 appearance-none rounded-none shadow-none flex justify-between items-center ${
                    error ? 'border-red-500' : 'border-[#E4E5E7]'
                  } text-base font-normal text-grey-default`}
                >
                  <SelectValue placeholder={placeholderTo} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {optionsTo.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
        />
      </div>
    </div>
  )
}
