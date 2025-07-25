import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { AppointmentCard } from './AppointmentCard';
import { useAppDispatch } from '@/store/hooks';
import { reorderAppointments } from '@/store/slices/appointmentSlice';
import type { Appointment } from '@/store/slices/appointmentSlice';

interface AppointmentListProps {
  appointments: Appointment[];
}

export function AppointmentList({ appointments: initialAppointments }: AppointmentListProps) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const dispatch = useAppDispatch();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setAppointments((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        const reorderedItems = arrayMove(items, oldIndex, newIndex);
        
        // Atualizar o Redux store
        dispatch(reorderAppointments(reorderedItems));
        
        return reorderedItems;
      });
    }
  }

  // Atualizar estado local quando props mudam
  if (JSON.stringify(appointments) !== JSON.stringify(initialAppointments)) {
    setAppointments(initialAppointments);
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Nenhum agendamento encontrado.
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={appointments.map(apt => apt.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}