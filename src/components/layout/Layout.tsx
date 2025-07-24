import Header from "./Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-muted/30 border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">AquaWash Pro</h3>
              <p className="text-sm text-muted-foreground">
                Sistema completo de agendamento para lava jato profissional.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Lavagem Completa</li>
                <li>Enceramento</li>
                <li>Lavagem a Seco</li>
                <li>Detalhamento</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>(11) 99999-9999</li>
                <li>contato@aquawash.com</li>
                <li>Segunda a Sábado: 8h às 18h</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Localização</h4>
              <p className="text-sm text-muted-foreground">
                Av. Principal, 1234<br />
                Centro - São Paulo, SP<br />
                CEP: 01234-567
              </p>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 AquaWash Pro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;