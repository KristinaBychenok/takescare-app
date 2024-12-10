import { useAppSelector } from '../../../store/hooks'
import { CalendarField } from './fields/calendar'
import { CheckboxField } from './fields/checkbox'
import { useMemo } from 'react'
import { TimeSelectsField } from './fields/timeSelects'
import {
  getTimeSlotsFrom,
  getTimeSlotsTo,
  Rules,
  visitFieldsRules,
} from './helpers'
import { InputField } from './fields/input'
import { SearchSelectField } from './fields/searchSelect'
import { TextereaField } from './fields/texterea'
import { addDays, subDays } from 'date-fns'
import { useTranslations } from 'use-intl'

interface VisitProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger: any
  visitDate: string
  timeFrom: string
  isSpecificTime: boolean
}

export const Visit: React.FC<VisitProps> = ({
  control,
  trigger,
  visitDate,
  timeFrom,
  isSpecificTime,
}) => {
  const t = useTranslations('homeVisits.visit')
  const loadedData = useAppSelector((state) => state.homeVisit.loadedData)

  const timeSlotsFrom = useMemo(() => getTimeSlotsFrom(visitDate), [visitDate])
  const timeSlotsTo = useMemo(() => getTimeSlotsTo(timeFrom), [timeFrom])

  const today = new Date()
  const maxDate = addDays(today, 3)
  const yesterday = subDays(today, 1)

  const translateRules = (rule: Rules, field: string) => {
    const trRule = {} as Rules
    if (rule.required) trRule.required = t(`fields.${field}.error.required`)
    if (rule.minLength)
      trRule.minLength = {
        value: rule.minLength.value,
        message: t(`fields.${field}.error.minLength`),
      }
    if (rule.maxLength)
      trRule.maxLength = {
        value: rule.maxLength.value,
        message: t(`fields.${field}.error.maxLength`),
      }
    if (rule.pattern)
      trRule.pattern = {
        value: rule.pattern.value,
        message: t(`fields.${field}.error.pattern`),
      }
    return trRule
  }

  return (
    <div className="bg-white p-10 border border-[#E4E5E7] flex flex-col gap-6">
      <h3 className="font-light text-2xl">{t('title')}</h3>
      <div id="requestNumber">
        <InputField
          control={control}
          trigger={trigger}
          title={t('fields.requestNumber.title')}
          name="requestNumber"
          placeholder={t('fields.requestNumber.placeholder')}
          rules={translateRules(
            visitFieldsRules.requestNumber,
            'requestNumber'
          )}
          aria-labelledby="requestNumber"
          aria-required="true"
        />
      </div>
      <div id="visitType">
        <SearchSelectField
          control={control}
          trigger={trigger}
          options={loadedData.visitTypes}
          title={t('fields.visitType.title')}
          name="visitType"
          placeholder={t('fields.visitType.placeholder')}
          rules={translateRules(visitFieldsRules.visitType, 'visitType')}
          aria-labelledby="visitType"
          aria-required="true"
        />
      </div>
      <div id="specialization">
        <SearchSelectField
          control={control}
          trigger={trigger}
          options={loadedData.specializations}
          title={t('fields.specialization.title')}
          name="specialization"
          placeholder={t('fields.specialization.placeholder')}
          rules={translateRules(
            visitFieldsRules.specialization,
            'specialization'
          )}
          aria-labelledby="specialization"
          aria-required="true"
        />
      </div>
      <div id="visitDate">
        <CalendarField
          control={control}
          trigger={trigger}
          title={t('fields.visitDate.title')}
          name="visitDate"
          placeholder={t('fields.visitDate.placeholder')}
          maxDate={maxDate}
          minDate={yesterday}
          rules={translateRules(visitFieldsRules.visitDate, 'visitDate')}
          aria-labelledby="visitDate"
          aria-required="true"
        />
      </div>
      <CheckboxField
        control={control}
        title={t('fields.isSpecificTime.title')}
        name="isSpecificTime"
        aria-labelledby="specificTimeCheckbox"
      />
      {isSpecificTime && (
        <TimeSelectsField
          control={control}
          title={t('fields.time')}
          optionsFrom={timeSlotsFrom}
          optionsTo={timeSlotsTo}
          nameFrom="visitTimeFrom"
          nameTo="visitTimeTo"
          placeholderFrom={t('fields.visitTimeFrom.placeholder')}
          placeholderTo={t('fields.visitTimeTo.placeholder')}
          isVisitDate={!!visitDate}
          isNoTimeToday={!visitDate && timeSlotsFrom.length === 0}
          aria-labelledby="visitTime"
        />
      )}
      <div id="topic">
        <SearchSelectField
          control={control}
          trigger={trigger}
          options={loadedData.topics}
          title={t('fields.topic.title')}
          name="topic"
          placeholder={t('fields.topic.placeholder')}
          rules={translateRules(visitFieldsRules.topic, 'topic')}
          aria-labelledby="topic"
          aria-required="true"
        />
      </div>
      <div id="additionalInformation">
        <TextereaField
          control={control}
          title={t('fields.additionalInformation.title')}
          name="additionalInformation"
          placeholder={t('fields.additionalInformation.placeholder')}
          aria-labelledby="additionalInformation"
        />
      </div>
      <div id="languageOfVisit">
        <SearchSelectField
          control={control}
          options={loadedData.languagesOfVisit}
          title={t('fields.languageOfVisit.title')}
          name="languageOfVisit"
          placeholder={t('fields.languageOfVisit.placeholder')}
          aria-labelledby="languageOfVisit"
        />
      </div>
    </div>
  )
}
