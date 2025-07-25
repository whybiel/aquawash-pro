import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle2, TrendingUp, User, Car } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { AppointmentList } from '@/components/dashboard/AppointmentList';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { useAuth } from '@/contexts/AuthContext';
import { useAppSelector } from '@/store/hooks';
import { 
  selectUpcomingAppointments, 
  selectPastAppointments, 
  selectAppointmentStats 
} from '@/store/selectors/appointmentSelectors';

const Dashboard = () => {
  const { user } = useAuth();
  
  const allAppointments = useAppSelector((state) => state.appointments.appointments);
  const upcomingAppointments = useAppSelector((state) =>
    selectUpcomingAppointments(state, 'user1', user?.role || 'user')
  )
  
  const pastAppointments = useAppSelector(state => 
    selectPastAppointments(state, 'user1', user?.role || 'user')
  );
  
  const stats = useAppSelector(state => 
    selectAppointmentStats(state, 'user1', user?.role || 'user')
  );

  const chartData = useMemo(() => {
    const allAppointments = [...upcomingAppointments, ...pastAppointments];
    const monthlyData: { [key: string]: { agendamentos: number; receita: number } } = {};
    
    allAppointments.forEach(appointment => {
      const monthKey = appointment.date.toLocaleString('pt-BR', { month: 'short' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { agendamentos: 0, receita: 0 };
      }
      
      monthlyData[monthKey].agendamentos += 1;
      if (appointment.status === 'concluido') {
        monthlyData[monthKey].receita += appointment.servicePrice;
      }
    });
    
    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      ...data
    }));
  }, [upcomingAppointments, pastAppointments]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Bem-vindo de volta, {user?.name || 'Usuário'}!
            </p>
          </div>

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
                  {stats.total}
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
                  {stats.completed}
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
                  R$ {stats.totalSpent.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

            <div className="space-y-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg">Análise Mensal</CardTitle>
                  <CardDescription>
                    Seus agendamentos nos últimos meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnalyticsChart data={chartData} />
                </CardContent>
              </Card>

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