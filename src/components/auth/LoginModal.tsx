import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { LoginMicrosoftButton } from './ButtonLogin'
import { DialogDescription } from '@radix-ui/react-dialog'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md bg-gradient-card border border-border/50'>
        <DialogHeader>
          <DialogTitle className='text-center text-xl font-bold text-foreground'>
            Entrar no Sistema
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Use uma das opções abaixo para acessar sua conta.
        </DialogDescription>

        <div className='space-y-4'>
          <LoginMicrosoftButton onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
