import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Award, Clock } from 'lucide-react'

const professionals = [
  {
    id: 1,
    name: 'Carlos Silva',
    role: 'Especialista em Detalhamento',
    experience: '8 anos',
    rating: 4.9,
    totalServices: 1200,
    specialties: ['Detalhamento', 'Enceramento', 'Lavagem Premium'],
    avatar: '/api/placeholder/100/100',
    available: true
  },
  {
    id: 2,
    name: 'Ana Santos',
    role: 'Profissional Sênior',
    experience: '6 anos',
    rating: 4.8,
    totalServices: 950,
    specialties: ['Lavagem Completa', 'Limpeza Interna', 'Lavagem a Seco'],
    avatar: '/api/placeholder/100/100',
    available: true
  },
  {
    id: 3,
    name: 'Roberto Lima',
    role: 'Especialista em Pintura',
    experience: '10 anos',
    rating: 5.0,
    totalServices: 800,
    specialties: ['Polimento', 'Correção de Pintura', 'Proteção Cerâmica'],
    avatar: '/api/placeholder/100/100',
    available: true
  },
  {
    id: 4,
    name: 'Maria Oliveira',
    role: 'Profissional Júnior',
    experience: '3 anos',
    rating: 4.7,
    totalServices: 500,
    specialties: ['Lavagem Básica', 'Aspiração', 'Limpeza de Pneus'],
    avatar: '/api/placeholder/100/100',
    available: true
  }
]

const ProfessionalsSection = ({ id }: { id: string }) => {
  return (
    <section className=' min-h-[600px] py-20 bg-background' id={id}>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <Badge className='mb-4 bg-accent/10 text-accent border-accent/20'>
            👥 Nossa Equipe
          </Badge>
          <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4'>
            Profissionais Qualificados
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            Nossa equipe é formada por profissionais experientes e capacitados,
            prontos para oferecer o melhor cuidado para seu veículo.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {professionals.map((professional) => (
            <Card
              key={professional.id}
              className='bg-gradient-card hover:shadow-medium transition-all duration-300 group'
            >
              <CardHeader className='text-center'>
                <div className='relative mx-auto mb-4'>
                  <Avatar className='w-20 h-20 mx-auto border-4 border-background shadow-soft'>
                    <AvatarImage
                      src={professional.avatar}
                      alt={professional.name}
                    />
                    <AvatarFallback className='bg-gradient-primary text-white text-lg font-bold'>
                      {professional.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-background ${
                      professional.available
                        ? 'bg-success'
                        : 'bg-muted-foreground'
                    }`}
                  />
                </div>

                <CardTitle className='text-lg'>{professional.name}</CardTitle>
                <CardDescription className='text-sm'>
                  {professional.role}
                </CardDescription>

                <div className='flex items-center justify-center gap-1 mt-2'>
                  <Star className='w-4 h-4 text-warning fill-current' />
                  <span className='text-sm font-medium text-foreground'>
                    {professional.rating}
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    ({professional.totalServices} serviços)
                  </span>
                </div>
              </CardHeader>

              <CardContent className='space-y-4'>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Award className='w-4 h-4' />
                  <span>{professional.experience} de experiência</span>
                </div>

                <div className='flex items-center gap-2 text-sm'>
                  <Clock className='w-4 h-4' />
                  <span
                    className={
                      professional.available
                        ? 'text-success'
                        : 'text-muted-foreground'
                    }
                  >
                    {professional.available ? 'Disponível' : 'Ocupado'}
                  </span>
                </div>

                <div className='space-y-2'>
                  <div className='text-sm font-medium text-foreground'>
                    Especialidades:
                  </div>
                  <div className='flex flex-wrap gap-1'>
                    {professional.specialties.map((specialty, index) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='text-xs'
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProfessionalsSection
