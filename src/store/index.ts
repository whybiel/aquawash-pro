import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from './slices/appointmentSlice';

export const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['appointments/addAppointment', 'appointments/updateAppointment'],
        // Ignore these field paths in all actions
        ignoredActionsPaths: ['payload.date', 'payload.createdAt', 'payload.updatedAt'],
        // Ignore these paths in the state
        ignoredPaths: ['appointments.appointments'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;