import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, Clock, User, Car } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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

export const BookingForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    serviceId: '',
    professionalId: '',
    date: undefined as Date | undefined,
    time: '',
    vehicleModel: '',
    vehiclePlate: '',
    notes: '',
  });

  const selectedService = services.find(s => s.id === formData.serviceId);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!formData.date) {
      toast({
        title: "Data obrigatória",
        description: "Por favor, selecione uma data para o agendamento",
        variant: "destructive",
      });
      return;
    }

    if (!formData.time) {
      toast({
        title: "Horário obrigatório",
        description: "Por favor, selecione um horário",
        variant: "destructive",
      });
      return;
    }

    // Verificar se a data não é no passado
    const selectedDateTime = new Date(formData.date);
    const [hours, minutes] = formData.time.split(':');
    selectedDateTime.setHours(parseInt(hours), parseInt(minutes));
    
    if (selectedDateTime < new Date()) {
      toast({
        title: "Data inválida",
        description: "Não é possível agendar para datas passadas",
        variant: "destructive",
      });
      return;
    }

    // Simular salvamento
    toast({
      title: "Agendamento realizado!",
      description: `Agendamento para ${format(formData.date, 'dd/MM/yyyy', { locale: ptBR })} às ${formData.time}`,
    });

    // Reset form
    setFormData({
      serviceId: '',
      professionalId: '',
      date: undefined,
      time: '',
      vehicleModel: '',
      vehiclePlate: '',
      notes: '',
    });
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Serviço */}
          <div className="space-y-2">
            <Label className="text-foreground">Tipo de Serviço *</Label>
            <Select value={formData.serviceId} onValueChange={(value) => setFormData({...formData, serviceId: value})}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
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
          </div>

          {/* Profissional */}
          <div className="space-y-2">
            <Label className="text-foreground">Profissional *</Label>
            <Select value={formData.professionalId} onValueChange={(value) => setFormData({...formData, professionalId: value})}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Selecione o profissional" />
              </SelectTrigger>
              <SelectContent>
                {professionals.map((prof) => (
                  <SelectItem key={prof.id} value={prof.id}>
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
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => setFormData({...formData, date})}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Horário *</Label>
              <Select value={formData.time} onValueChange={(value) => setFormData({...formData, time: value})}>
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
            </div>
          </div>

          {/* Dados do Veículo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleModel" className="text-foreground">Modelo do Veículo *</Label>
              <Input
                id="vehicleModel"
                placeholder="Ex: Honda Civic"
                value={formData.vehicleModel}
                onChange={(e) => setFormData({...formData, vehicleModel: e.target.value})}
                className="bg-background/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehiclePlate" className="text-foreground">Placa do Veículo *</Label>
              <Input
                id="vehiclePlate"
                placeholder="ABC-1234"
                value={formData.vehiclePlate}
                onChange={(e) => setFormData({...formData, vehiclePlate: e.target.value.toUpperCase()})}
                className="bg-background/50"
                required
              />
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-foreground">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Detalhes adicionais sobre o serviço..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="bg-background/50"
              rows={3}
            />
          </div>

          {/* Resumo do Agendamento */}
          {selectedService && (
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h4 className="font-semibold text-foreground mb-2">Resumo do Agendamento</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><strong>Serviço:</strong> {selectedService.name}</p>
                <p><strong>Duração:</strong> {selectedService.duration} minutos</p>
                <p><strong>Valor:</strong> R$ {selectedService.price}</p>
                {formData.professionalId && (
                  <p><strong>Profissional:</strong> {professionals.find(p => p.id === formData.professionalId)?.name}</p>
                )}
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
          >
            Confirmar Agendamento
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};