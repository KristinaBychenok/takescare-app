'use client'

import React, { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Visit } from './visit'
import {
  HomeVisitLoadedData,
  setVisitData,
  setVisitLoadedData,
} from '@/store/slices/homeVisitSlice'
import { HomeVisitData } from '../../../store/slices/homeVisitSlice'
import { useFieldArray, useForm } from 'react-hook-form'
import { Patient } from './patient'
import FormButtons from './form-buttons'
import {
  addPatient,
  deletePatient,
  PatientData,
  PatientLoadedData,
  setPatientLoadedData,
  updatePatient,
} from '@/store/slices/homeVisitPatientsSlice'
import { updateNavPatients } from '@/store/slices/homeVisitNavSlice'
import { convertToRoman, createPatientNavItems } from './helpers'
import { BreadcrumbComponent } from './fields/breadcrumb'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

export const HomeVisitsComponent = ({
  visitLoadedData,
  patientLoadedData,
}: {
  visitLoadedData: HomeVisitLoadedData
  patientLoadedData: PatientLoadedData
}) => {
  const dispatch = useAppDispatch()
  const path = usePathname()
  const t = useTranslations('homeVisits')
  const storePatients = useAppSelector(
    (state) => state.homeVisitPatients.patients
  )

  const {
    control: controlVisit,
    watch: watchVisit,
    formState: { isValid: isValidVisitForm },
    trigger: triggerVisit,
  } = useForm<HomeVisitData>({
    defaultValues: {
      requestNumber: '',
      visitType: visitLoadedData.visitTypes[0],
      specialization: '',
      topic: '',
      languageOfVisit: '',
      visitDate: '',
      isSpecificTime: false,
      visitTimeFrom: '',
      visitTimeTo: '',
      additionalInformation: '',
    },
  })

  const {
    control: controlPatients,
    formState: { isValid: isValidPatientsForm },
    trigger: triggerPatients,
  } = useForm<{
    patients: PatientData[]
  }>({
    defaultValues: {
      patients: [] as PatientData[],
    },
  })

  const {
    append,
    fields: patientsFields,
    update,
    remove,
  } = useFieldArray({
    control: controlPatients,
    name: 'patients',
  })

  const handleAddPatient = () => {
    const patientId = Math.random().toString(36)
    const newPatient = {
      patientId,
      age: 'adult',
      docType: 'pesel',
    } as PatientData

    append(newPatient)
    dispatch(addPatient(newPatient))
  }

  const handlePatientChange = (
    id: string,
    updatedFields: Partial<PatientData>
  ) => {
    const updatedPatients = patientsFields.map((patient) =>
      patient.patientId === id ? { ...patient, ...updatedFields } : patient
    )

    const updatedPatient = updatedPatients.find((p) => p.patientId === id)
    if (updatedPatient) {
      update(patientsFields.indexOf(updatedPatient), updatedPatient)
      dispatch(updatePatient(updatedPatient))
    }
  }

  const handleDeletePatient = (id: string) => {
    const updatedPatients = [...patientsFields]

    const deletedPatientIndex = updatedPatients.findIndex(
      (p) => p.patientId === id
    )
    remove(deletedPatientIndex)
    dispatch(deletePatient(id))
  }

  const handleNext = () => {
    const visitInfo = watchVisit()
    dispatch(
      setVisitData({
        ...visitInfo,
        visitDate: new Date(visitInfo.visitDate).toISOString(),
      })
    )
  }

  useEffect(() => {
    dispatch(setVisitLoadedData(visitLoadedData))
    dispatch(setPatientLoadedData(patientLoadedData))

    const patientId = Math.random().toString(36)
    const newPatient = {
      patientId,
      age: 'adult',
      docType: 'pesel',
    } as PatientData

    if (!!storePatients && storePatients.length === 0) {
      append(newPatient)
      dispatch(addPatient(newPatient))
    }
  }, [dispatch, visitLoadedData, patientLoadedData, append, storePatients])

  const navPatientItems = useMemo(() => {
    return patientsFields.map((p, index) => {
      const isFirstPatient = index === 0
      const items = createPatientNavItems(index, p.patientId, isFirstPatient)

      return {
        id: p.patientId,
        title: `${t('sidebar.patient.title')} ${
          patientsFields.length > 1 ? convertToRoman(index + 1) : ''
        }`,
        items,
      }
    })
  }, [patientsFields])

  useEffect(() => {
    const updatedPatientNav = [...navPatientItems]

    dispatch(updateNavPatients(updatedPatientNav))
  }, [navPatientItems])

  const breadcrumbItems = useMemo(() => {
    const paths = path.split('/').slice(1)

    return paths.map((p) => ({
      value: p,
      label: p
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      href: '/' + p,
      isSelected: p === paths[paths.length - 1],
    }))
  }, [path])

  return (
    <>
      <div className="flex flex-col gap-6">
        <BreadcrumbComponent items={breadcrumbItems} />
        <h1 className="text-4xl font-light">{t('title')}</h1>
        <form className="space-y-6">
          <Visit
            control={controlVisit}
            trigger={triggerVisit}
            visitDate={watchVisit('visitDate')}
            timeFrom={watchVisit('visitTimeFrom')}
            isSpecificTime={watchVisit('isSpecificTime')}
          />
          {patientsFields.length > 0 && (
            <ul className="flex flex-col gap-6">
              {patientsFields.map((patient, index) => {
                return (
                  <Patient
                    key={patient.patientId}
                    control={controlPatients}
                    trigger={triggerPatients}
                    index={index}
                    patient={patient}
                    onChange={(updatedPatient) =>
                      handlePatientChange(patient.patientId, updatedPatient)
                    }
                    name={`patients[${index}]`}
                    isOtherAddress={patient.isOtherAddress}
                    docType={patient.docType}
                    onDelete={handleDeletePatient}
                  />
                )
              })}
            </ul>
          )}
          <FormButtons
            onAddPatient={handleAddPatient}
            onNext={handleNext}
            disableAdd={patientsFields.length >= 6}
            disableNext={!(isValidVisitForm && isValidPatientsForm)}
          />
        </form>
      </div>
    </>
  )
}
