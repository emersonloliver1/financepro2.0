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
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
          >
            {item.icon}
            <span className="font-medium">{item.text}</span>
          </a>
        </motion.div>
      ))}
    </div>
  );

  return (
    <AppBar 
      position="static" 
      className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-none"
      style={{ boxShadow: '0 1px 0 rgba(0, 0, 0, 0.05)' }}
    >
      <Toolbar className="container mx-auto px-4 py-2">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <Sparkles className="text-primary h-5 w-5" />
          <h1 className="text-xl font-heading font-semibold text-gray-900">
            MoneyMind
          </h1>
        </motion.div>

        <div className="flex-grow" />

        <div className="hidden md:block">
          <nav className="flex items-center gap-4">
            {menuItems.map((item) => (
              <motion.a
                key={item.text}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {item.icon}
                <span>{item.text}</span>
              </motion.a>
            ))}
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
            PaperProps={{
              className: "bg-white/80 backdrop-blur-md"
            }}
          >
            <MenuList />
          </Drawer>
        </div>
      </Toolbar>
    </AppBar>
  );
};