import { configureStore } from '@reduxjs/toolkit'
import homeVisitSlice from './slices/homeVisitSlice'
import homeVisitPatientsSlice from './slices/homeVisitPatientsSlice'
import homeVisitNavSlice from './slices/homeVisitNavSlice'

const store = configureStore({
  reducer: {
    homeVisit: homeVisitSlice,
    homeVisitPatients: homeVisitPatientsSlice,
    homeVisitNav: homeVisitNavSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
