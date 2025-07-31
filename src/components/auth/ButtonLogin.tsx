import MicrosoftLogin from 'react-microsoft-login'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/hooks/use-toast'
import { jwtDecode } from 'jwt-decode'

const clientId = import.meta.env.VITE_MICROSOFT_CLIENT_ID
const redirectUri = import.meta.env.VITE_MICROSOFT_REDIRECT_URI

export const LoginMicrosoftButton = ({ onClose }: { onClose: () => void }) => {
  const { login } = useAuth()

  type IdTokenPayload = {
    name: string
    preferred_username: string
    oid: string
    roles?: string[]
  }

  const handleLogin = (err: any, data: any) => {
    if (err) {
      toast({
        title: 'Erro de autenticação',
        description: 'Não foi possível processar o login. Tente novamente.',
        variant: 'destructive'
      })
      return
    }

    const { idToken, accessToken } = data

    try {
      const decoded: IdTokenPayload = jwtDecode(idToken)

      const user = {
        name: decoded.name,
        email: decoded.preferred_username,
        id: decoded.oid,
        accessToken: accessToken,
        roles: decoded.roles || ['user']
      }

      login(user)
      onClose()
    } catch (decodeError) {
      toast({
        title: 'Erro de autenticação',
        description: 'Não foi possível processar o login. Tente novamente.',
        variant: 'destructive'
      })
    }
  }

  return (
    <button className='w-full h-14 rounded-lg border-2 hover:bg-gray-100 transition-colors'>
      <MicrosoftLogin
        clientId={clientId}
        authCallback={handleLogin}
        redirectUri={redirectUri}
        buttonTheme='light'
        graphScopes={['user.read']}
      >
        <img
          src='/microsoft.png'
          alt='Microsoft Logo'
          width={16}
          height={16}
          loading='lazy'
          className='w-4 h-4 mr-4 inline-block'
        />
        Entrar com Microsoft
      </MicrosoftLogin>
    </button>
  )
}
