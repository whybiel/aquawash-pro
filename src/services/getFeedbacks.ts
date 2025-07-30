import { toast } from '@/hooks/use-toast'

const frasesAleatorias = [
  'Excelente serviço, muito satisfeito!',
  'Atendimento rápido e eficiente, recomendo!',
  'Profissionais qualificados e atenciosos.',
  'Serviço de alta qualidade, voltarei com certeza.',
  'Muito bom, superou minhas expectativas!'
]

const cargosFakes = [
  'Cliente',
  'Usuário',
  'Visitante',
  'Consumidor',
  'Cliente VIP'
]

async function fetchRandomUsers(qtd: number = 15) {
  try {
    const res = await fetch(`https://randomuser.me/api/?results=${qtd}`)
    const data = await res.json()
    return data.results
  } catch (error: any) {
    toast({
      title: 'Erro ao buscar usuários',
      description:
        'Não foi possível buscar usuários aleatórios. Tente novamente.',
      variant: 'destructive'
    })

    return []
  }
}

export async function returnFeedbacksWithUsers() {
  try {
    const users = await fetchRandomUsers()

    return users.map((user, i) => ({
      name: `${user.name.first} ${user.name.last}`,
      avatar: user.picture.medium,
      message: frasesAleatorias[i % frasesAleatorias.length],
      role: cargosFakes[i % cargosFakes.length]
    }))
  } catch {
    toast({
      title: 'Erro ao gerar feedbacks com usuários',
      description:
        'Não foi possível gerar feedbacks com usuários aleatórios. Tente novamente.',
      variant: 'destructive'
    })

    return []
  }
}
