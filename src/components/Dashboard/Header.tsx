import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-heading font-bold text-primary">
            MoneyMind
          </h1>
          
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white shadow-lg md:shadow-none md:block md:static`}>
            <ul className="flex flex-col md:flex-row md:items-center md:space-x-8 p-4 md:p-0">
              <li>
                <a href="#" className="block py-2 text-gray-700 hover:text-primary transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 text-gray-700 hover:text-primary transition-colors">
                  Transações
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 text-gray-700 hover:text-primary transition-colors">
                  Categorias
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};