import { lazy, Suspense, useEffect } from 'react'
import Layout from '@/components/layout/Layout'

import HeroSection from '@/components/sections/HeroSection'

const ServicesSection = lazy(
  () => import('@/components/sections/ServicesSection')
)
const ProfessionalsSection = lazy(
  () => import('@/components/sections/ProfessionalsSection')
)
const FeedBacks = lazy(() => import('@/components/feedbacks'))

const Index = () => {
  useEffect(() => {
    if (location.hash === '#services' || location.hash === '#professionals') {
      const element = document.getElementById(location.hash.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])

  return (
    <Layout>
      <HeroSection />

      <Suspense fallback={<div>Carregando conteúdo...</div>}>
        <ServicesSection id='services' />
        <ProfessionalsSection id='professionals' />
        <FeedBacks />
      </Suspense>
    </Layout>
  )
}

export default Index
