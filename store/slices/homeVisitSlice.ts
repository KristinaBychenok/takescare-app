import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface HomeVisitData {
  requestNumber: string
  visitType: string
  specialization: string
  topic: string
  languageOfVisit: string
  visitDate: string
  isSpecificTime: boolean
  visitTimeFrom: string
  visitTimeTo: string
  additionalInformation: string
}

export interface HomeVisitLoadedData {
  visitTypes: string[]
  specializations: string[]
  topics: string[]
  languagesOfVisit: string[]
}

interface HomeVisitState {
  data: HomeVisitData
  loadedData: HomeVisitLoadedData
}

const initialState: HomeVisitState = {
  data: {
    requestNumber: '',
    visitType: '',
    specialization: '',
    topic: '',
    languageOfVisit: '',
    visitDate: '',
    isSpecificTime: false,
    visitTimeFrom: '',
    visitTimeTo: '',
    additionalInformation: '',
  },
  loadedData: {
    visitTypes: [],
    specializations: [],
    topics: [],
    languagesOfVisit: [],
  },
}

const homeVisitSlice = createSlice({
  name: 'homeVisit',
  initialState,
  reducers: {
    setVisitData: (state, action: PayloadAction<HomeVisitData>) => {
      state.data = action.payload
    },
    setVisitLoadedData: (state, action: PayloadAction<HomeVisitLoadedData>) => {
      state.loadedData = action.payload
    },
  },
})

export const { setVisitData, setVisitLoadedData } = homeVisitSlice.actions

export default homeVisitSlice.reducer
