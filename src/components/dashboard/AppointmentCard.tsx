import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Car, User, Edit3, Trash2, GripVertical } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

interface AppointmentCardProps {
  appointment: Appointment;
}

const statusConfig = {
  pendente: { label: 'Pendente', variant: 'secondary' as const, color: 'text-yellow-600' },
  confirmado: { label: 'Confirmado', variant: 'default' as const, color: 'text-blue-600' },
  concluido: { label: 'Concluído', variant: 'default' as const, color: 'text-green-600' },
  cancelado: { label: 'Cancelado', variant: 'destructive' as const, color: 'text-red-600' }
};

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: appointment.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const statusInfo = statusConfig[appointment.status];
  const canEdit = appointment.status === 'pendente' || appointment.status === 'confirmado';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? 'opacity-50' : ''}`}
    >
      <Card className="card-hover">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              {/* Drag Handle */}
              <div
                {...attributes}
                {...listeners}
                className="mt-2 cursor-grab hover:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
              >
                <GripVertical className="h-4 w-4" />
              </div>

              {/* Appointment Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground text-lg">
                    {appointment.service}
                  </h3>
                  <Badge variant={statusInfo.variant}>
                    {statusInfo.label}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(appointment.date, "dd 'de' MMMM, yyyy", { locale: ptBR })}
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {appointment.time}
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <User className="mr-2 h-4 w-4" />
                    {appointment.professional}
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Car className="mr-2 h-4 w-4" />
                    {appointment.vehicle}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-lg font-semibold text-primary">
                    R$ {appointment.price.toFixed(2)}
                  </div>
                  
                  {canEdit && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit3 className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}