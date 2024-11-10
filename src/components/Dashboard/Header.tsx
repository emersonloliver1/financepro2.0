import { useState } from 'react';
import { Menu as MenuIcon, X, Home, Receipt, PieChart, Sparkles } from 'lucide-react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Dashboard', href: '#', icon: <Home size={20} /> },
    { text: 'Transações', href: '#', icon: <Receipt size={20} /> },
    { text: 'Categorias', href: '#', icon: <PieChart size={20} /> },
  ];

  const MenuList = () => (
    <List>
      {menuItems.map((item) => (
        <ListItem
          key={item.text}
          sx={{ padding: 0 }}
        >
          <ListItemText>
            <a 
              href={item.href}
              className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:text-primary hover:bg-purple-50 transition-all rounded-lg"
            >
              {item.icon}
              {item.text}
            </a>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="static" className="bg-white shadow-sm">
      <Toolbar className="container mx-auto px-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary h-6 w-6" />
          <Typography
            variant="h6"
            component="h1"
            className="text-2xl font-heading font-bold text-primary flex-grow"
          >
            MoneyMind
          </Typography>
        </div>

        {isMobile ? (
          <>
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
              <div className="p-4">
                <MenuList />
              </div>
            </Drawer>
          </>
        ) : (
          <nav>
            <MenuList />
          </nav>
        )}
      </Toolbar>
    </AppBar>
  );
};