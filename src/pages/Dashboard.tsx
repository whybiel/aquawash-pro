import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Car, User, TrendingUp, CheckCircle2, XCircle, Edit3 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { AppointmentList } from '@/components/dashboard/AppointmentList';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { useAuth } from '@/contexts/AuthContext';

// Mock data para demonstração
const mockAppointments = [
  {
    id: '1',
    date: new Date('2024-07-30'),
    time: '09:00',
    service: 'Lavagem Completa',
    professional: 'João Silva',
    vehicle: 'Honda Civic - ABC-1234',
    status: 'confirmado' as const,
    price: 35.00
  },
  {
    id: '2',
    date: new Date('2024-08-02'),
    time: '14:30',
    service: 'Enceramento',
    professional: 'Maria Santos',
    vehicle: 'Toyota Corolla - XYZ-5678',
    status: 'pendente' as const,
    price: 80.00
  },
  {
    id: '3',
    date: new Date('2024-07-20'),
    time: '11:00',
    service: 'Lavagem Simples',
    professional: 'Carlos Oliveira',
    vehicle: 'Volkswagen Gol - DEF-9012',
    status: 'concluido' as const,
    price: 25.00
  },
  {
    id: '4',
    date: new Date('2024-07-15'),
    time: '16:00',
    service: 'Detalhamento Interno',
    professional: 'Ana Costa',
    vehicle: 'Ford Focus - GHI-3456',
    status: 'cancelado' as const,
    price: 120.00
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [appointments] = useState(mockAppointments);

  const upcomingAppointments = appointments.filter(apt => 
    apt.date >= new Date() && apt.status !== 'cancelado'
  );

  const pastAppointments = appointments.filter(apt => 
    apt.date < new Date() || apt.status === 'concluido'
  );

  const totalSpent = appointments
    .filter(apt => apt.status === 'concluido')
    .reduce((sum, apt) => sum + apt.price, 0);

  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(apt => apt.status === 'concluido').length;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Bem-vindo de volta, {user?.name || 'Usuário'}!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Próximos Agendamentos
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {upcomingAppointments.length}
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Agendamentos
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {totalAppointments}
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Serviços Concluídos
                </CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {completedAppointments}
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Investido
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  R$ {totalSpent.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Appointments Section */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="upcoming">Próximos</TabsTrigger>
                  <TabsTrigger value="past">Histórico</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">
                      Próximos Agendamentos
                    </h2>
                    <Button asChild size="sm">
                      <a href="/agendamento">
                        Novo Agendamento
                      </a>
                    </Button>
                  </div>
                  <AppointmentList appointments={upcomingAppointments} />
                </TabsContent>

                <TabsContent value="past" className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Histórico de Agendamentos
                  </h2>
                  <AppointmentList appointments={pastAppointments} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Analytics Section */}
            <div className="space-y-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">Análise Mensal</CardTitle>
                  <CardDescription>
                    Seus agendamentos nos últimos meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnalyticsChart />
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/agendamento">
                      <Calendar className="mr-2 h-4 w-4" />
                      Novo Agendamento
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Ver Profissionais
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Car className="mr-2 h-4 w-4" />
                    Meus Veículos
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;