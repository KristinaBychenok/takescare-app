import { Button } from '@/components/ui/button'
import { ChevronRightIcon, CirclePlusIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

interface FormButtonsProps {
  onAddPatient: () => void
  onNext: () => void
  disableAdd: boolean
  disableNext: boolean
}

const FormButtons: React.FC<FormButtonsProps> = ({
  onAddPatient,
  onNext,
  disableAdd,
  disableNext,
}) => {
  const t = useTranslations('homeVisits.homeVisitsButtons')

  return (
    <div className="flex flex-col w-full justify-between gap-6 pb-10">
      <Button
        variant="default"
        className="bg-white text-blue-bright border border-blue-bright w-full hover:bg-[#96999e]"
        type="button"
        onClick={onAddPatient}
        disabled={disableAdd}
        aria-label="add-new-patient"
        aria-disabled={disableAdd ? 'true' : 'false'}
      >
        {t('add')}
        <CirclePlusIcon />
      </Button>
      <Button
        variant="default"
        className="bg-blue-bright text-white w-full hover:bg-[#96999e]"
        type="button"
        onClick={onNext}
        disabled={disableNext}
        aria-label="go-next-step"
        aria-disabled={disableNext ? 'true' : 'false'}
      >
        {t('next')}
        <ChevronRightIcon />
      </Button>
    </div>
  )
}

export default FormButtons
