import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Appointment {
  id: string;
  userId: string;
  userName: string;
  date: Date;
  time: string;
  service: string;
  servicePrice: number;
  professional: string;
  vehicle: {
    make: string;
    model: string;
    plate: string;
    color: string;
  };
  status: 'pendente' | 'confirmado' | 'concluido' | 'cancelado';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentState = {
  appointments: [
    {
      id: '1',
      userId: 'user1',
      userName: 'João Silva',
      date: new Date('2024-07-30'),
      time: '09:00',
      service: 'Lavagem Completa',
      servicePrice: 35.00,
      professional: 'João Silva',
      vehicle: {
        make: 'Honda',
        model: 'Civic',
        plate: 'ABC-1234',
        color: 'Branco'
      },
      status: 'confirmado',
      createdAt: new Date('2024-07-25'),
      updatedAt: new Date('2024-07-25')
    },
    {
      id: '2',
      userId: 'user1',
      userName: 'João Silva',
      date: new Date('2024-08-02'),
      time: '14:30',
      service: 'Enceramento',
      servicePrice: 80.00,
      professional: 'Maria Santos',
      vehicle: {
        make: 'Toyota',
        model: 'Corolla',
        plate: 'XYZ-5678',
        color: 'Prata'
      },
      status: 'pendente',
      createdAt: new Date('2024-07-25'),
      updatedAt: new Date('2024-07-25')
    },
    {
      id: '3',
      userId: 'admin',
      userName: 'Carlos Admin',
      date: new Date('2024-07-20'),
      time: '11:00',
      service: 'Lavagem Simples',
      servicePrice: 25.00,
      professional: 'Carlos Oliveira',
      vehicle: {
        make: 'Volkswagen',
        model: 'Gol',
        plate: 'DEF-9012',
        color: 'Azul'
      },
      status: 'concluido',
      createdAt: new Date('2024-07-18'),
      updatedAt: new Date('2024-07-20')
    }
  ],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newAppointment: Appointment = {
        ...action.payload,
        id: Date.now().toString(),
        date: new Date(action.payload.date), 
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      state.appointments.push(newAppointment);
    },
    
    updateAppointment: (state, action: PayloadAction<{ id: string; updates: Partial<Appointment> }>) => {
      const { id, updates } = action.payload;
      const appointmentIndex = state.appointments.findIndex(apt => apt.id === id);
      
      if (appointmentIndex !== -1) {
        state.appointments[appointmentIndex] = {
          ...state.appointments[appointmentIndex],
          ...updates,
          updatedAt: new Date(),
        };
      }
    },
    
    cancelAppointment: (state, action: PayloadAction<string>) => {
      const appointmentIndex = state.appointments.findIndex(apt => apt.id === action.payload);
      
      if (appointmentIndex !== -1) {
        state.appointments[appointmentIndex].status = 'cancelado';
        state.appointments[appointmentIndex].updatedAt = new Date();
      }
    },
    
    deleteAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(apt => apt.id !== action.payload);
    },
    
    reorderAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addAppointment,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
  reorderAppointments,
  setLoading,
  setError,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;