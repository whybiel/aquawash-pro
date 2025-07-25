import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './slices/appointmentSlice';

export const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['appointments/addAppointment', 'appointments/updateAppointment'],
        ignoredActionsPaths: ['payload.date', 'payload.createdAt', 'payload.updatedAt'],
        ignoredPaths: ['appointments.appointments'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;