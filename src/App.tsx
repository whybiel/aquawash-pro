import { lazy, Suspense } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { AuthProvider } from '@/contexts/AuthContext'
import Index from './pages/Index'

const Booking = lazy(() => import('./pages/Booking'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))

const queryClient = new QueryClient()

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense
              fallback={
                <div className='min-h-screen w-full flex items-center justify-center'>
                  Carregando página...
                </div>
              }
            >
              <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/agendamento' element={<Booking />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </Provider>
)

export default App
