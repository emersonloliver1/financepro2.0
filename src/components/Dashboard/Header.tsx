import { useState } from 'react';
import { Menu as MenuIcon, X, Home, Receipt, PieChart, Sparkles } from 'lucide-react';
import { AppBar, Toolbar, IconButton, Drawer } from '@mui/material';
import { motion } from 'framer-motion';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { text: 'Dashboard', href: '#', icon: <Home size={20} /> },
    { text: 'Transações', href: '#', icon: <Receipt size={20} /> },
    { text: 'Categorias', href: '#', icon: <PieChart size={20} /> },
  ];

  const MenuList = () => (
    <div className="p-4">
      {menuItems.map((item) => (
        <motion.div
          key={item.text}
          whileHover={{ x: 5 }}
          className="mb-2"
        >
          <a 
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary-light/20 rounded-lg transition-all"
          >
            {item.icon}
            <span className="font-medium">{item.text}</span>
          </a>
        </motion.div>
      ))}
    </div>
  );

  return (
    <AppBar position="static" className="bg-white shadow-sm border-b border-gray-200">
      <Toolbar className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <Sparkles className="text-primary h-6 w-6" />
          <h1 className="text-2xl font-heading font-bold text-primary">
            MoneyMind
          </h1>
        </motion.div>

        <div className="flex-grow" />

        <div className="hidden md:block">
          <nav className="flex items-center gap-2">
            <MenuList />
          </nav>
        </div>

        <div className="md:hidden">
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </IconButton>
          
          <Drawer
            anchor="right"
            open={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            className="w-64"
          >
            <MenuList />
          </Drawer>
        </div>
      </Toolbar>
    </AppBar>
  );
};