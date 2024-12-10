import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PatientData {
  patientId: string
  age: 'adult' | 'child'
  name: string
  surname: string
  symptoms: string | string[]
  docType: 'pesel' | 'passport'
  pesel: string
  passportNumber: string
  dateOfBirth: string
  country: string
  street: string
  appartment: string
  isOtherAddress: boolean
  visitCountry: string
  visitStreet: string
  visitAppartment: string
}

export interface PatientLoadedData {
  countries: string[]
  symptoms: string[]
}

interface homeVisitPatientsState {
  patients: PatientData[]
  loadedData: PatientLoadedData
}

const initialState: homeVisitPatientsState = {
  patients: [],
  loadedData: {
    countries: [],
    symptoms: [],
  },
}

const homeVisitPatientsSlice = createSlice({
  name: 'homeVisitPatients',
  initialState,
  reducers: {
    setPatientLoadedData: (state, action: PayloadAction<PatientLoadedData>) => {
      state.loadedData = action.payload
    },
    addPatient: (state, action: PayloadAction<Partial<PatientData>>) => {
      state.patients = [...state.patients, action.payload as PatientData]
    },
    deletePatient: (state, action: PayloadAction<string>) => {
      state.patients = state.patients.filter(
        (p) => p.patientId !== action.payload
      )
    },
    updatePatient(state, action: PayloadAction<Partial<PatientData>>) {
      const index = state.patients.findIndex(
        (p) => p.patientId === action.payload.patientId
      )
      if (index !== -1) {
        state.patients[index] = { ...state.patients[index], ...action.payload }
      }
    },
  },
})

export const {
  setPatientLoadedData,
  addPatient,
  deletePatient,
  updatePatient,
} = homeVisitPatientsSlice.actions

export default homeVisitPatientsSlice.reducer
