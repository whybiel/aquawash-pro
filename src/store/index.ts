import { configureStore } from '@reduxjs/toolkit'
import appointmentReducer from './slices/appointmentSlice'

export const store = configureStore({
  reducer: {
    appointments: appointmentReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'appointments/addAppointment',
          'appointments/updateAppointment',
          'appointments/setEditingAppointment'
        ],
        ignoredActionsPaths: [
          'payload.date',
          'payload.createdAt',
          'payload.updatedAt'
        ],
        ignoredPaths: [
          'appointments.appointments',
          'appointments.editingAppointment'
        ]
      }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
