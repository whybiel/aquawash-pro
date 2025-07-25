
# AquaWash Pro

Sistema completo de agendamento para lava jato profissional.

---

## Índice

- [Visão Geral](#visão-geral)
- [Decisões Técnicas](#decisões-técnicas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Padrões de Código e Convenções](#padrões-de-código-e-convenções)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Customização de Tema](#customização-de-tema)
- [Testes](#testes)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Visão Geral

O AquaWash Pro é uma aplicação web para gerenciamento de agendamentos em lava jato, permitindo que clientes agendem serviços, visualizem profissionais e acompanhem seus agendamentos. O sistema também oferece um painel administrativo para controle de agendamentos e análise de dados.

---

## Decisões Técnicas

- **React + TypeScript**: Utilizado para garantir tipagem estática, melhor manutenção e escalabilidade.
- **Redux Toolkit**: Gerenciamento de estado global, especialmente para agendamentos e autenticação.
- **React Router**: Navegação SPA.
- **Radix UI + Tailwind CSS**: Componentização acessível e estilização rápida e consistente.
- **Vite**: Build tool moderna para desenvolvimento rápido.
- **Arquitetura Modular**: Separação clara entre componentes, páginas, hooks, contextos e store.
- **Responsividade**: Layouts otimizados para mobile e desktop.
- **Design System**: Utilização de tokens CSS customizáveis e utilitários Tailwind.

---

## Estrutura do Projeto
src/ App.tsx # Entrypoint da aplicação index.css # Design system, tokens e utilitários 

assets/ # Imagens e recursos estáticos components/ auth/ # Autenticação (ex: LoginModal) 

booking/ # Agendamento (ex: BookingForm) 

dashboard/ # Dashboard e analytics layout/ # Header, Layout, Footer 

sections/ # Seções da landing page (Hero, Serviços, Profissionais) 

ui/ # Componentes reutilizáveis (Button, Card, etc) 

contexts/ # Contextos globais (ex: AuthContext) 

hooks/ # Hooks customizados 

lib/ # Funções utilitárias 

pages/ # Páginas principais (Index, Booking, Dashboard, NotFound) 

store/ # Redux store, slices e selectors

- **components/ui/**: Biblioteca de componentes atômicos, estilizados com Tailwind e tokens do design system.
- **contexts/**: Contextos React para autenticação e outros estados globais.
- **store/**: Slices Redux para agendamentos, usuários, etc.
- **pages/**: Cada rota principal tem seu próprio componente de página.

---

## Principais Funcionalidades

- **Agendamento Online**: Formulário completo com validação, seleção de serviço, profissional, data e horário.
- **Dashboard**: Estatísticas, gráficos e listagem de agendamentos.
- **Gestão de Profissionais**: Visualização de equipe e disponibilidade.
- **Tema Personalizável**: Tokens CSS para fácil customização de cores e gradientes.
- **Acessibilidade**: Componentes Radix UI e navegação por teclado.
- **Notificações**: Toasts para feedback de ações do usuário.

---

## Padrões de Código e Convenções

- **TypeScript**: Tipagem obrigatória em todos os componentes e funções.
- **Tailwind CSS**: Utilização extensiva de utilitários e classes customizadas.
- **Componentização**: Componentes pequenos, reutilizáveis e sem lógica de negócio acoplada.
- **Redux Toolkit**: Slices organizados por domínio.
- **ESLint + Prettier**: Padronização automática de código.

---

## Como Rodar o Projeto

1. Instale as dependências:
   ```sh
   npm install
    ```

2. Rode o projeto em modo desenvolvimento:    
    ```sh
    npm run dev
    ```

3. Acesse a aplicação em `http://localhost:8080`.