import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import { LayoutDashboard, BarChart, Layers } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip } from '../ui/tooltip';
import { TooltipContent } from '../ui/tooltip';
import { TooltipTrigger } from '../ui/tooltip';
import { TooltipProvider } from '../ui/tooltip';

export const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold">MoneyMind</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/dashboard">
                    <Button
                      variant={isActive('/dashboard') ? "default" : "ghost"}
                      size="icon"
                      className="w-9 h-9"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span className="sr-only">Dashboard</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Dashboard</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/transactions">
                    <Button
                      variant={isActive('/transactions') ? "default" : "ghost"}
                      size="icon"
                      className="w-9 h-9"
                    >
                      <BarChart className="h-4 w-4" />
                      <span className="sr-only">Transações</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Transações</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/categories">
                    <Button
                      variant={isActive('/categories') ? "default" : "ghost"}
                      size="icon"
                      className="w-9 h-9"
                    >
                      <Layers className="h-4 w-4" />
                      <span className="sr-only">Categorias</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Categorias</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};