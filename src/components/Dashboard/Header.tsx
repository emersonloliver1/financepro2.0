import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';

export const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">MoneyMind</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/dashboard"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/dashboard') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/transactions') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Transações
            </Link>
            <Link
              to="/categories"
              className={`transition-colors hover:text-foreground/80 ${
                isActive('/categories') ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Categorias
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};