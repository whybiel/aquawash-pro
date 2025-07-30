import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Star, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className='min-h-[600px] relative bg-gradient-hero text-white overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80' />

      <div className='container mx-auto px-4 py-24 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-6'>
            <Badge className='bg-white/20 text-white border-white/30 hover:bg-white/30'>
              🚗 Agendamento Online Disponível
            </Badge>

            <h1 className='text-4xl lg:text-6xl font-bold leading-tight'>
              Seu Carro
              <span className='block text-accent-foreground'>Sempre Limpo</span>
            </h1>

            <p className='text-xl text-blue-50 max-w-lg'>
              Agende seu horário de forma rápida e fácil. Profissionais
              qualificados, equipamentos modernos e o melhor atendimento da
              região.
            </p>

            <div className='grid grid-cols-3 gap-4 py-6'>
              <div className='text-center'>
                <div className='text-2xl font-bold'>500+</div>
                <div className='text-sm text-blue-100'>
                  Clientes Satisfeitos
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold'>15+</div>
                <div className='text-sm text-blue-100'>Profissionais</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold'>4.9</div>
                <div className='text-sm text-blue-100'>Avaliação</div>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                size='lg'
                className='bg-white text-primary hover:bg-white/90 transition-smooth'
                onClick={() => (window.location.href = '/agendamento')}
              >
                <Calendar className='w-5 h-5 mr-2' />
                Agendar Agora
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='text-primary border-white hover:bg-white/10'
              >
                <Link to={{ pathname: '/', hash: '#services' }}>
                  Ver Serviços
                </Link>
              </Button>
            </div>
          </div>

          <div className='relative'>
            <div className='relative bg-gradient-card rounded-2xl p-4 shadow-strong'>
              <img
                src='/hero-car-wash.webp'
                width={628}
                height={471}
                alt='Lavagem de carro profissional'
                loading='eager'
                decoding='async'
                fetchPriority='high'
              />

              <div className='absolute top-8 right-8 bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-medium shadow-medium'>
                <Star className='w-4 h-4 inline mr-1' />
                Avaliação 4.9
              </div>

              <div className='absolute bottom-8 left-8 bg-card text-card-foreground px-4 py-2 rounded-lg shadow-medium'>
                <div className='flex items-center gap-2'>
                  <Shield className='w-4 h-4 text-success' />
                  <span className='text-sm font-medium'>
                    Garantia de Qualidade
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl' />
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl' />
    </section>
  )
}

export default HeroSection
