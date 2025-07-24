import { Button } from "@/components/ui/button";
import { Droplets, User, Calendar, Settings } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <header className="bg-gradient-card backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e Nome */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-medium">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AquaWash Pro</h1>
              <p className="text-sm text-muted-foreground">Sistema de Agendamento</p>
            </div>
          </div>

          {/* Navegação */}
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Calendar className="w-4 h-4 mr-2" />
              Agendamentos
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Serviços
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Profissionais
            </Button>
          </nav>

          {/* Área do usuário */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Usuário</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Entrar
                </Button>
                <Button size="sm" className="bg-gradient-primary hover:opacity-90 transition-smooth">
                  Cadastrar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;