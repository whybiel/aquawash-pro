import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'

const selectAppointments = (state: RootState) => state.appointments.appointments
const selectCurrentUser = (_: RootState, userId: string) => userId
const selectUserRole = (_: RootState, __: string, role: string) => role

const normalizeDate = (date: Date | string) =>
  typeof date === 'string' ? new Date(date) : date

export const selectAppointmentsByUser = createSelector(
  [selectAppointments, selectCurrentUser, selectUserRole],
  (appointments, userId, role) => {
    if (role === 'admin')
      return appointments.map((a) => ({ ...a, date: normalizeDate(a.date) }))
    return appointments
      .filter((appointment) => appointment.userId === userId)
      .map((a) => ({ ...a, date: normalizeDate(a.date) }))
  }
)

export const selectUpcomingAppointments = createSelector(
  [selectAppointmentsByUser],
  (appointments) => {
    const now = new Date()
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date)
      return (
        (appointmentDate >= now ||
          (appointmentDate.toDateString() === now.toDateString() &&
            appointment.time > now.toTimeString().slice(0, 5))) &&
        appointment.status !== 'cancelado' &&
        appointment.status !== 'concluido'
      )
    })
  }
)

export const selectPastAppointments = createSelector(
  [selectAppointmentsByUser],
  (appointments) => {
    const now = new Date()
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date)
      return (
        appointmentDate < now ||
        appointment.status === 'concluido' ||
        appointment.status === 'cancelado'
      )
    })
  }
)

export const selectAppointmentStats = createSelector(
  [selectAppointmentsByUser],
  (appointments) => {
    const total = appointments.length
    const completed = appointments.filter(
      (apt) => apt.status === 'concluido'
    ).length
    const pending = appointments.filter(
      (apt) => apt.status === 'pendente'
    ).length
    const confirmed = appointments.filter(
      (apt) => apt.status === 'confirmado'
    ).length
    const totalSpent = appointments
      .filter((apt) => apt.status === 'concluido')
      .reduce((sum, apt) => sum + apt.servicePrice, 0)

    return {
      total,
      completed,
      pending,
      confirmed,
      totalSpent
    }
  }
)
