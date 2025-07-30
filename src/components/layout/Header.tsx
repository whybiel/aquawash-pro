import { Button } from '@/components/ui/button'
import {
  Droplets,
  User,
  Calendar,
  LogOut,
  Home,
  LayoutDashboard,
  Sparkle,
  UserRound
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { LoginModal } from '@/components/auth/LoginModal'
import { Link } from 'react-router-dom'

const Header = () => {
  const { user, logout } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <header className='bg-gradient-card backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-soft'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-gradient-primary rounded-lg shadow-medium'>
              <Droplets className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-xl font-bold text-foreground'>Lava-Jato</h1>
            </div>
          </div>

          <nav className='hidden md:flex items-center gap-6'>
            <Button
              variant='ghost'
              asChild
              className='text-foreground hover:text-primary'
            >
              <Link to='/'>
                <Home className='w-4 h-4 mr-2' />
                Home
              </Link>
            </Button>
            <Button
              variant='ghost'
              asChild
              className='text-foreground hover:text-primary'
            >
              <Link to='/agendamento'>
                <Calendar className='w-4 h-4 mr-2' />
                Agendar
              </Link>
            </Button>
            <Button
              variant='ghost'
              asChild
              className='text-foreground hover:text-primary'
            >
              <Link to='/dashboard'>
                <LayoutDashboard className='w-4 h-4 mr-2' />
                Dashboard
              </Link>
            </Button>
            <Button
              variant='ghost'
              className='text-foreground hover:text-primary'
            >
              <Link
                to={{ pathname: '/', hash: '#services' }}
                className='flex items-center'
              >
                <Sparkle className='w-4 h-4 mr-2' />
                Serviços
              </Link>
            </Button>
            <Button
              variant='ghost'
              className='text-foreground hover:text-primary'
            >
              <Link
                to={{ pathname: '/', hash: '#professionals' }}
                className='flex items-center'
              >
                <UserRound className='w-4 h-4 mr-2' />
                Profissionais
              </Link>
            </Button>
          </nav>

          <div className='flex items-center gap-3'>
            {user?.name ? (
              <div className='flex items-center gap-2'>
                <Button variant='ghost' className='flex items-center gap-2'>
                  <User className='w-4 h-4' />
                  <span className='hidden sm:inline'>{user?.name}</span>
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={logout}
                  title='Sair'
                  aria-label='Sair'
                >
                  <LogOut className='w-4 h-4' />
                </Button>
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <Button
                  size='sm'
                  className='bg-gradient-primary hover:opacity-90 transition-smooth'
                  onClick={() => setShowLoginModal(true)}
                >
                  Entrar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </header>
  )
}

export default Header
