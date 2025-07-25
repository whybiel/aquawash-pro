import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, addDays, isBefore, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAppDispatch } from '@/store/hooks';
import { addAppointment } from '@/store/slices/appointmentSlice';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, Clock, User, Car } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const services = [
  { id: 'basic', name: 'Lavagem Básica', duration: 60, price: 25 },
  { id: 'complete', name: 'Lavagem Completa', duration: 90, price: 45 },
  { id: 'premium', name: 'Lavagem Premium + Cera', duration: 120, price: 70 },
  { id: 'detail', name: 'Lavagem Detalhada', duration: 180, price: 100 },
];

const professionals = [
  { id: '1', name: 'Carlos Silva', specialty: 'Lavagem Premium' },
  { id: '2', name: 'Ana Costa', specialty: 'Detalhamento' },
  { id: '3', name: 'João Santos', specialty: 'Lavagem Geral' },
  { id: '4', name: 'Maria Oliveira', specialty: 'Cera e Enceramento' },
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

// Schema de validação
const bookingSchema = z.object({
  service: z.string().min(1, 'Selecione um serviço'),
  professional: z.string().min(1, 'Selecione um profissional'),
  date: z.date({
    required_error: 'Selecione uma data',
  }),
  time: z.string().min(1, 'Selecione um horário'),
  vehicleMake: z.string().min(1, 'Informe a marca do veículo'),
  vehicleModel: z.string().min(1, 'Informe o modelo do veículo'),
  vehiclePlate: z.string().min(1, 'Informe a placa do veículo'),
  vehicleColor: z.string().min(1, 'Informe a cor do veículo'),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: '',
      professional: '',
      vehicleMake: '',
      vehicleModel: '',
      vehiclePlate: '',
      vehicleColor: '',
      time: '',
      notes: '',
    },
  });

  const validateConflict = (date: Date, time: string) => {
    // Aqui implementaríamos a validação de conflito com outros agendamentos
    // Por enquanto, retorna sempre false (sem conflito)
    return false;
  };

  const onSubmit = (data: BookingFormData) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para fazer um agendamento.",
        variant: "destructive",
      });
      return;
    }

    // Verificar conflitos
    if (validateConflict(data.date, data.time)) {
      toast({
        title: "Conflito de horário",
        description: "Este horário já está ocupado. Escolha outro horário.",
        variant: "destructive",
      });
      return;
    }

    const selectedService = services.find(s => s.name === data.service);
    
    // Criar o agendamento
    const newAppointment = {
      userId: user.id,
      userName: user.name,
      date: data.date,
      time: data.time,
      service: data.service,
      servicePrice: selectedService?.price || 0,
      professional: data.professional,
      vehicle: {
        make: data.vehicleMake,
        model: data.vehicleModel,
        plate: data.vehiclePlate,
        color: data.vehicleColor,
      },
      status: 'pendente' as const,
      notes: data.notes,
    };

    dispatch(addAppointment(newAppointment));

    toast({
      title: "Agendamento criado com sucesso!",
      description: `Seu agendamento para ${format(data.date, "dd/MM/yyyy")} às ${data.time} foi registrado.`,
    });

    // Resetar o formulário
    form.reset();
    setSelectedDate(undefined);
  };

  if (!user) {
    return (
      <Card className="max-w-2xl mx-auto bg-gradient-card border border-border/50">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">
            Faça login para agendar um serviço
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto bg-gradient-card border border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Car className="w-5 h-5" />
          Novo Agendamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Serviço */}
          <div className="space-y-2">
            <Label className="text-foreground">Tipo de Serviço *</Label>
            <Select onValueChange={(value) => form.setValue('service', value)} value={form.watch('service')}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.name}>
                    <div className="flex justify-between items-center w-full">
                      <span>{service.name}</span>
                      <span className="text-sm text-muted-foreground ml-4">
                        R$ {service.price} • {service.duration}min
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.service && (
              <p className="text-sm text-destructive">{form.formState.errors.service.message}</p>
            )}
          </div>

          {/* Profissional */}
          <div className="space-y-2">
            <Label className="text-foreground">Profissional *</Label>
            <Select onValueChange={(value) => form.setValue('professional', value)} value={form.watch('professional')}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Selecione o profissional" />
              </SelectTrigger>
              <SelectContent>
                {professionals.map((prof) => (
                  <SelectItem key={prof.id} value={prof.name}>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <div>
                        <div>{prof.name}</div>
                        <div className="text-xs text-muted-foreground">{prof.specialty}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.professional && (
              <p className="text-sm text-destructive">{form.formState.errors.professional.message}</p>
            )}
          </div>

          {/* Data e Hora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">Data *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-background/50",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      if (date) form.setValue('date', date);
                    }}
                    disabled={(date) => isBefore(date, new Date()) && !isToday(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.date && (
                <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Horário *</Label>
              <Select onValueChange={(value) => form.setValue('time', value)} value={form.watch('time')}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Selecionar horário" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.time && (
                <p className="text-sm text-destructive">{form.formState.errors.time.message}</p>
              )}
            </div>
          </div>

          {/* Dados do Veículo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-foreground">Marca do Veículo *</Label>
              <Input
                placeholder="Ex: Honda"
                {...form.register('vehicleMake')}
                className="bg-background/50"
              />
              {form.formState.errors.vehicleMake && (
                <p className="text-sm text-destructive">{form.formState.errors.vehicleMake.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Modelo do Veículo *</Label>
              <Input
                placeholder="Ex: Civic"
                {...form.register('vehicleModel')}
                className="bg-background/50"
              />
              {form.formState.errors.vehicleModel && (
                <p className="text-sm text-destructive">{form.formState.errors.vehicleModel.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Placa do Veículo *</Label>
              <Input
                placeholder="ABC-1234"
                {...form.register('vehiclePlate')}
                className="bg-background/50"
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  form.setValue('vehiclePlate', value);
                }}
              />
              {form.formState.errors.vehiclePlate && (
                <p className="text-sm text-destructive">{form.formState.errors.vehiclePlate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Cor do Veículo *</Label>
              <Input
                placeholder="Ex: Branco"
                {...form.register('vehicleColor')}
                className="bg-background/50"
              />
              {form.formState.errors.vehicleColor && (
                <p className="text-sm text-destructive">{form.formState.errors.vehicleColor.message}</p>
              )}
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label className="text-foreground">Observações</Label>
            <Textarea
              placeholder="Detalhes adicionais sobre o serviço..."
              {...form.register('notes')}
              className="bg-background/50"
              rows={3}
            />
          </div>

          {/* Resumo do Agendamento */}
          {form.watch('service') && (
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold text-foreground mb-2">Resumo do Agendamento</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><strong>Serviço:</strong> {form.watch('service')}</p>
                <p><strong>Profissional:</strong> {form.watch('professional')}</p>
                {selectedDate && (
                  <p><strong>Data:</strong> {format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}</p>
                )}
                {form.watch('time') && (
                  <p><strong>Horário:</strong> {form.watch('time')}</p>
                )}
                {form.watch('vehicleMake') && form.watch('vehicleModel') && (
                  <p><strong>Veículo:</strong> {form.watch('vehicleMake')} {form.watch('vehicleModel')}</p>
                )}
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Agendando...' : 'Confirmar Agendamento'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}