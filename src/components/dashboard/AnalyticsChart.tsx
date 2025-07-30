import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ChartDataItem {
  month: string
  agendamentos: number
  receita: number
}

interface AnalyticsChartProps {
  data?: ChartDataItem[]
}

const defaultMonthlyData = [
  { month: 'Jan', agendamentos: 12, receita: 420 },
  { month: 'Fev', agendamentos: 19, receita: 665 },
  { month: 'Mar', agendamentos: 8, receita: 280 },
  { month: 'Abr', agendamentos: 25, receita: 875 },
  { month: 'Mai', agendamentos: 18, receita: 630 },
  { month: 'Jun', agendamentos: 22, receita: 770 },
  { month: 'Jul', agendamentos: 15, receita: 525 }
]

const serviceData = [
  { name: 'Lavagem Simples', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Lavagem Completa', value: 28, color: 'hsl(var(--secondary))' },
  { name: 'Enceramento', value: 20, color: 'hsl(var(--accent))' },
  { name: 'Detalhamento', value: 17, color: 'hsl(var(--muted))' }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-background border border-border rounded-lg p-3 shadow-lg'>
        <p className='text-foreground font-medium'>{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className='text-sm' style={{ color: entry.color }}>
            {entry.dataKey === 'agendamentos' ? 'Agendamentos' : 'Receita'}:{' '}
            {entry.value}
            {entry.dataKey === 'receita' && ' R$'}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-background border border-border rounded-lg p-3 shadow-lg'>
        <p className='text-foreground font-medium'>{payload[0].name}</p>
        <p className='text-sm text-primary'>{payload[0].value}% dos serviços</p>
      </div>
    )
  }
  return null
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const chartData = data && data.length > 0 ? data : defaultMonthlyData

  return (
    <Tabs defaultValue='appointments' className='w-full'>
      <TabsList className='grid w-full grid-cols-3 mb-4'>
        <TabsTrigger value='appointments'>Agendamentos</TabsTrigger>
        <TabsTrigger value='revenue'>Receita</TabsTrigger>
        <TabsTrigger value='services'>Serviços</TabsTrigger>
      </TabsList>

      <TabsContent value='appointments'>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='hsl(var(--border))'
              />
              <XAxis
                dataKey='month'
                stroke='hsl(var(--muted-foreground))'
                fontSize={12}
              />
              <YAxis stroke='hsl(var(--muted-foreground))' fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type='monotone'
                dataKey='agendamentos'
                stroke='hsl(var(--primary))'
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: 'hsl(var(--primary))',
                  strokeWidth: 2
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>

      <TabsContent value='revenue'>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='hsl(var(--border))'
              />
              <XAxis
                dataKey='month'
                stroke='hsl(var(--muted-foreground))'
                fontSize={12}
              />
              <YAxis stroke='hsl(var(--muted-foreground))' fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey='receita'
                fill='hsl(var(--primary))'
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>

      <TabsContent value='services'>
        <div className='h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={serviceData}
                cx='50%'
                cy='50%'
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
    </Tabs>
  )
}
