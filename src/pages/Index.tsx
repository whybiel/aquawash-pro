import Layout from '@/components/layout/Layout'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProfessionalsSection from '@/components/sections/ProfessionalsSection'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { FeedBacks } from '@/components/feedbacks'

const Index = () => {
  const location = useLocation()

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
      <ServicesSection id='services' />
      <ProfessionalsSection id='professionals' />
      <FeedBacks />
    </Layout>
  )
}

export default Index
