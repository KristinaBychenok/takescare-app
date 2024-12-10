import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface homeVisitNavData {
  title: string
  items: {
    title: string
    id: string
    url: string
  }[]
}

export type homeVisitPatientNavData = homeVisitNavData & {
  id: string
}

export interface homeVisitNavType {
  nav: {
    visit: homeVisitNavData
    patients: homeVisitPatientNavData[]
  }
}

const initialState: homeVisitNavType = {
  nav: {
    visit: {
      title: 'Visit',
      items: [
        { title: 'Request Number', id: 'requestNumber', url: '#requestNumber' },
        { title: 'Visit Type', id: 'visitType', url: '#visitType' },
        {
          title: 'Specialization',
          id: 'specialization',
          url: '#specialization',
        },
        { title: 'Visit Date', id: 'visitDate', url: '#visitDate' },
        { title: 'Topic', id: 'topic', url: '#topic' },
        {
          title: 'Additional Information',
          id: 'additionalInformation',
          url: '#additionalInformation',
        },
        {
          title: 'Language Of Visit',
          id: 'languageOfVisit',
          url: '#languageOfVisit',
        },
      ],
    },
    patients: [],
  },
}

const homeVisitNavSlice = createSlice({
  name: 'homeVisitNav',
  initialState,
  reducers: {
    updateNavPatients: (
      state,
      action: PayloadAction<homeVisitPatientNavData[]>
    ) => {
      state.nav.patients = action.payload
    },
  },
})

export const { updateNavPatients } = homeVisitNavSlice.actions

export default homeVisitNavSlice.reducer
