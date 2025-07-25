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

interface Appointment {
  id: string;
  date: Date;
  time: string;
  service: string;
  professional: string;
  vehicle: string;
  status: 'pendente' | 'confirmado' | 'concluido' | 'cancelado';
  price: number;
}

interface AppointmentListProps {
  appointments: Appointment[];
}

export function AppointmentList({ appointments: initialAppointments }: AppointmentListProps) {
  const [appointments, setAppointments] = useState(initialAppointments);
  
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

        return arrayMove(items, oldIndex, newIndex);
      });
    }
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