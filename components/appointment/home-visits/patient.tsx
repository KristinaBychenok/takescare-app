import { PatientData } from '@/store/slices/homeVisitPatientsSlice'
import { ToogleInputsField } from './fields/toogleInputs'
import { useAppSelector } from '@/store/hooks'
import { MultiSearchSelectField } from './fields/multiSearchSelect'
import { EmptyInputField } from './fields/emptyInput'
import { SearchSelectField } from './fields/searchSelect'
import { CheckboxField } from './fields/checkbox'
import { CheckedState } from '@radix-ui/react-checkbox'
import { CalendarField } from './fields/calendar'
import {
  convertToRoman,
  getDateOfBirthByPesel,
  patientFieldRules,
  Rules,
} from './helpers'
import { XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface PatientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger: any
  index: number
  patient: PatientData
  onChange: (updatedPatient: Partial<PatientData>) => void
  name: string
  isOtherAddress: boolean
  docType: 'pesel' | 'passport'
  onDelete: (id: string) => void
}

export const Patient: React.FC<PatientProps> = ({
  control,
  trigger,
  index,
  patient,
  onChange,
  name,
  isOtherAddress,
  docType,
  onDelete,
}) => {
  const t = useTranslations('homeVisits.patient')
  const symptoms = useAppSelector(
    (state) => state.homeVisitPatients.loadedData.symptoms
  )
  const counties = useAppSelector(
    (state) => state.homeVisitPatients.loadedData.countries
  )
  const patients = useAppSelector((state) => state.homeVisitPatients.patients)

  const handleChange =
    (field: keyof PatientData) => (value: string | string[] | CheckedState) => {
      const updates: Partial<PatientData> = { [field]: value }

      if (
        field === 'pesel' &&
        typeof value === 'string' &&
        value.length === 11
      ) {
        const dateOfBirth = getDateOfBirthByPesel(value).toISOString()
        updates.dateOfBirth = dateOfBirth
      }

      if (field === 'dateOfBirth' && typeof value === 'string') {
        console.log(new Date(value).getFullYear())
        const age = new Date(value).getFullYear() > 2006 ? 'child' : 'adult'
        updates.age = age
      }

      onChange(updates)
    }

  const today = new Date()
  const minDate = new Date(
    new Date().setFullYear(new Date().getFullYear() - 100)
  )

  const translateRules = (rule: Rules, field: string) => {
    const trRule = {} as Rules
    if (rule.required) trRule.required = t(`${field}.errors.required`)
    if (rule.minLength)
      trRule.minLength = {
        value: rule.minLength.value,
        message: t(`${field}.errors.minLength`),
      }
    if (rule.maxLength)
      trRule.maxLength = {
        value: rule.maxLength.value,
        message: t(`${field}.errors.maxLength`),
      }
    if (rule.pattern)
      trRule.pattern = {
        value: rule.pattern.value,
        message: t(`${field}.errors.pattern`),
      }
    return trRule
  }

  return (
    <li
      className="bg-white p-10 border border-[#E4E5E7] flex flex-col gap-6"
      aria-labelledby={`${name}-label`}
    >
      <div className="flex flex-row justify-between items-center">
        <h3 className="font-light text-2xl">{`${t('title')} ${
          patients.length > 1 ? convertToRoman(index + 1) : ''
        }`}</h3>
        {index !== 0 && (
          <XIcon
            className="h-8 w-8 ml-auto cursor-pointer mr-2 p-1 rounded hover:bg-[#E5F0FF]"
            onClick={() => {
              onDelete(patient.patientId)
            }}
            aria-label={`Delete Patient ${index + 1}`}
          />
        )}
      </div>
      <div id={`${name}-age`}>
        <ToogleInputsField
          control={control}
          title={t('fields.age.title')}
          name={`${name}.age`}
          options={[
            { value: 'adult', label: t('fields.age.options.adult') },
            { value: 'child', label: t('fields.age.options.child') },
          ]}
          selectedColor="#FEFEFE"
          selectedBg="#09162A"
          notSelectedColor="#112950"
          notSelectedBg="#FEFEFE"
          onChange={handleChange('age')}
          aria-labelledby={`${name}-age`}
        />
      </div>
      <div id={`${name}-patientData`}>
        <label htmlFor={`${name}.name`} className="pb-2 text-base font-bold">
          {t('fields.patientData.title')}
        </label>
        <div className="flex flex-col md:flex-row gap-6">
          <EmptyInputField
            control={control}
            trigger={trigger}
            title="Name"
            name={`${name}.name`}
            placeholder={t('fields.patientData.name.placeholder')}
            onValueChange={handleChange('name')}
            rules={translateRules(
              patientFieldRules.name,
              'fields.patientData.name'
            )}
            aria-labelledby={`${name}-patientData`}
            aria-required="true"
          />
          <EmptyInputField
            control={control}
            trigger={trigger}
            title="Surname"
            name={`${name}.surname`}
            placeholder={t('fields.patientData.surname.placeholder')}
            onValueChange={handleChange('surname')}
            rules={translateRules(
              patientFieldRules.name,
              'fields.patientData.surname'
            )}
            aria-labelledby={`${name}-patientData`}
            aria-required="true"
          />
        </div>
      </div>
      <div id={`${name}-symptoms`}>
        <MultiSearchSelectField
          control={control}
          options={symptoms}
          title={t('fields.symptoms.title')}
          name={`${name}.symptoms`}
          placeholder={t('fields.symptoms.placeholder')}
          onValueChange={handleChange('symptoms')}
          aria-labelledby={`${name}-symptoms`}
        />
      </div>
      <div id={`${name}-docType`}>
        <ToogleInputsField
          control={control}
          trigger={trigger}
          title={t('fields.docType.title')}
          name={`${name}.docType`}
          options={[
            { value: 'pesel', label: t('fields.docType.options.pesel') },
            { value: 'passport', label: t('fields.docType.options.passport') },
          ]}
          selectedColor="#242628"
          selectedBg="#FEFEFE"
          notSelectedColor="#6D7178"
          notSelectedBg="inherit"
          isBg="#E5F0FF"
          onChange={handleChange('docType')}
          aria-labelledby={`${name}-docType`}
        />
      </div>
      {docType === 'pesel' && (
        <EmptyInputField
          control={control}
          trigger={trigger}
          title="PESEL number"
          name={`${name}.pesel`}
          placeholder={t('fields.pesel.placeholder')}
          onValueChange={handleChange('pesel')}
          rules={translateRules(patientFieldRules.pesel, 'fields.pesel')}
          aria-labelledby={`${name}-pesel`}
        />
      )}
      {docType === 'passport' && (
        <div className="flex flex-col md:flex-row gap-6 mt-2">
          <EmptyInputField
            control={control}
            trigger={trigger}
            title="Passport Number"
            name={`${name}.passportNumber`}
            placeholder={t('fields.passportNumber.placeholder')}
            onValueChange={handleChange('passportNumber')}
            rules={translateRules(
              patientFieldRules.passportNumber,
              'fields.passportNumber'
            )}
            aria-labelledby={`${name}-passportNumber`}
          />
          <CalendarField
            control={control}
            trigger={trigger}
            title=""
            name="dateOfBirth"
            placeholder={t('fields.dateOfBirth.placeholder')}
            maxDate={today}
            minDate={minDate}
            onValueChange={handleChange('dateOfBirth')}
            rules={translateRules(
              patientFieldRules.dateOfBirth,
              'fields.dateOfBirth'
            )}
            aria-labelledby={`${name}-dateOfBirth`}
            dateOfBirth={
              patients.find((p) => p.patientId === patient.patientId)
                ?.dateOfBirth
            }
          />
        </div>
      )}
      {index === 0 && (
        <>
          <div id={`${name}-address`}>
            <label
              htmlFor={`${name}.address`}
              className="pb-2 text-base font-bold"
            >
              {t('fields.address.title')}
            </label>
            <SearchSelectField
              control={control}
              trigger={trigger}
              options={counties}
              title=""
              name={`${name}.country`}
              placeholder={t('fields.address.country.placeholder')}
              onValueChange={handleChange('country')}
              rules={translateRules(
                patientFieldRules.country,
                'fields.address.country'
              )}
              aria-labelledby={`${name}-country`}
              aria-required="true"
            />
            <div className="flex flex-col md:flex-row gap-6 mt-2">
              <div className="flex w-full md:w-3/4">
                <EmptyInputField
                  control={control}
                  trigger={trigger}
                  title="Street"
                  name={`${name}.street`}
                  placeholder={t('fields.address.street.placeholder')}
                  onValueChange={handleChange('street')}
                  rules={translateRules(
                    patientFieldRules.street,
                    'fields.address.street'
                  )}
                  aria-labelledby={`${name}-street`}
                  aria-required="true"
                />
              </div>
              <div className="flex w-full md:w-1/4">
                <EmptyInputField
                  control={control}
                  trigger={trigger}
                  title="Apartment"
                  name={`${name}.appartment`}
                  placeholder={t('fields.address.appartment.placeholder')}
                  onValueChange={handleChange('appartment')}
                  rules={translateRules(
                    patientFieldRules.appartment,
                    'fields.address.appartment'
                  )}
                  aria-labelledby={`${name}-appartment`}
                  aria-required="true"
                />
              </div>
            </div>
          </div>
          <CheckboxField
            control={control}
            title={t('fields.isOtherAddress.title')}
            name={`${name}.isOtherAddress`}
            onValueChange={handleChange('isOtherAddress')}
            aria-labelledby={`${name}-other-address`}
          />
          {isOtherAddress && (
            <div>
              <label
                htmlFor={`${name}.name`}
                className="pb-2 text-base font-bold"
              >
                {t('fields.visitAddress.title')}
              </label>
              <SearchSelectField
                control={control}
                trigger={trigger}
                options={counties}
                title=""
                name={`${name}.visitCountry`}
                placeholder={t('fields.visitAddress.country.placeholder')}
                onValueChange={handleChange('visitCountry')}
                rules={translateRules(
                  patientFieldRules.visitCountry,
                  'fields.visitAddress.country'
                )}
                aria-labelledby={`${name}-visitCountry`}
              />
              <div className="flex flex-col md:flex-row gap-6 mt-2">
                <div className="flex w-full md:w-3/4">
                  <EmptyInputField
                    control={control}
                    trigger={trigger}
                    title="Street"
                    name={`${name}.visitStreet`}
                    placeholder={t('fields.visitAddress.street.placeholder')}
                    onValueChange={handleChange('visitStreet')}
                    rules={translateRules(
                      patientFieldRules.visitStreet,
                      'fields.visitAddress.street'
                    )}
                    aria-labelledby={`${name}-visitStreet`}
                    aria-required="true"
                  />
                </div>
                <div className="flex w-full md:w-1/4">
                  <EmptyInputField
                    control={control}
                    trigger={trigger}
                    title="Apartment"
                    name={`${name}.visitAppartment`}
                    placeholder={t(
                      'fields.visitAddress.appartment.placeholder'
                    )}
                    onValueChange={handleChange('visitAppartment')}
                    rules={translateRules(
                      patientFieldRules.visitAppartment,
                      'fields.visitAddress.appartment'
                    )}
                    aria-labelledby={`${name}-visitAppartment`}
                    aria-required="true"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </li>
  )
}
