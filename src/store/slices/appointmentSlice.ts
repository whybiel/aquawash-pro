import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Appointment {
  id: string
  userId: string
  userName: string
  date: Date
  time: string
  service: string
  servicePrice: number
  professional: string
  vehicle: {
    make: string
    model: string
    plate: string
    color: string
  }
  status: 'pendente' | 'confirmado' | 'concluido' | 'cancelado'
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface AppointmentState {
  appointments: Appointment[]
  loading: boolean
  error: string | null
  editingAppointment: Appointment | null
}

const initialState: AppointmentState = {
  appointments: [],
  loading: false,
  error: null,
  editingAppointment: null
}

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: (
      state,
      action: PayloadAction<Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>>
    ) => {
      const newAppointment: Appointment = {
        ...action.payload,
        id: Date.now().toString(),
        date: new Date(action.payload.date),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      state.appointments.push(newAppointment)
    },

    updateAppointment: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Appointment> }>
    ) => {
      const { id, updates } = action.payload
      const appointmentIndex = state.appointments.findIndex(
        (apt) => apt.id === id
      )

      if (appointmentIndex !== -1) {
        state.appointments[appointmentIndex] = {
          ...state.appointments[appointmentIndex],
          ...updates,
          updatedAt: new Date()
        }
      }
    },

    cancelAppointment: (state, action: PayloadAction<string>) => {
      const appointmentIndex = state.appointments.findIndex(
        (apt) => apt.id === action.payload
      )

      if (appointmentIndex !== -1) {
        state.appointments[appointmentIndex].status = 'cancelado'
        state.appointments[appointmentIndex].updatedAt = new Date()
      }
    },

    deleteAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(
        (apt) => apt.id !== action.payload
      )
    },

    reorderAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },

    setEditingAppointment: (
      state,
      action: PayloadAction<Appointment | null>
    ) => {
      state.editingAppointment = action.payload
    }
  }
})

export const {
  addAppointment,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
  reorderAppointments,
  setLoading,
  setError,
  setEditingAppointment
} = appointmentSlice.actions

export default appointmentSlice.reducer
