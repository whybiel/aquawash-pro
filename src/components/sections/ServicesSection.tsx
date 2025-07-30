import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Car, Shield, Zap, Clock, Star } from 'lucide-react'

const services = [
  {
    id: 1,
    name: 'Lavagem Completa',
    description: 'Lavagem externa e interna completa do veículo',
    duration: '45 min',
    price: 'R$ 25,00',
    icon: Car,
    features: ['Shampoo especial', 'Aspiração interna', 'Pneus e aros'],
    popular: true
  },
  {
    id: 2,
    name: 'Lavagem + Enceramento',
    description: 'Lavagem completa com aplicação de cera protetora',
    duration: '60 min',
    price: 'R$ 40,00',
    icon: Sparkles,
    features: ['Lavagem completa', 'Cera de carnaúba', 'Proteção UV'],
    popular: false
  },
  {
    id: 3,
    name: 'Lavagem a Seco',
    description: 'Limpeza rápida sem uso de água',
    duration: '30 min',
    price: 'R$ 20,00',
    icon: Zap,
    features: ['Sem água', 'Produtos especiais', 'Ideal para pressa'],
    popular: false
  },
  {
    id: 4,
    name: 'Detalhamento Premium',
    description: 'Serviço completo de detalhamento profissional',
    duration: '120 min',
    price: 'R$ 80,00',
    icon: Shield,
    features: [
      'Lavagem completa',
      'Cera premium',
      'Limpeza motor',
      'Pneus e aros'
    ],
    popular: false
  }
]

const ServicesSection = ({ id }: { id: string }) => {
  return (
    <section className='min-h-[600px] py-20 bg-muted/30' id={id}>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <Badge className='mb-4 bg-primary/10 text-primary border-primary/20'>
            💧 Nossos Serviços
          </Badge>
          <h2 className='text-3xl lg:text-4xl font-bold text-foreground mb-4'>
            Escolha o Serviço Ideal
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            Oferecemos uma gama completa de serviços para manter seu veículo
            sempre impecável, com profissionais qualificados e produtos de alta
            qualidade.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.id}
                className='relative bg-gradient-card hover:shadow-medium transition-all duration-300 group'
              >
                {service.popular && (
                  <div className='absolute -top-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-medium'>
                    <Star className='w-3 h-3 inline mr-1' />
                    Popular
                  </div>
                )}

                <CardHeader>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors'>
                      <Icon className='w-5 h-5 text-primary' />
                    </div>
                    <div className='flex items-center gap-2'>
                      <Clock className='w-4 h-4 text-muted-foreground' />
                      <span className='text-sm text-muted-foreground'>
                        {service.duration}
                      </span>
                    </div>
                  </div>
                  <CardTitle className='text-lg'>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className='space-y-4'>
                    <div className='text-2xl font-bold text-primary'>
                      {service.price}
                    </div>

                    <ul className='space-y-2'>
                      {service.features.map((feature, index) => (
                        <li
                          key={index}
                          className='flex items-center gap-2 text-sm text-muted-foreground'
                        >
                          <div className='w-1.5 h-1.5 bg-primary rounded-full' />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
