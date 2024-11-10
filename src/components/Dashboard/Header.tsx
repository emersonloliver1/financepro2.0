import { useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Dashboard', href: '#' },
    { text: 'Transações', href: '#' },
    { text: 'Categorias', href: '#' },
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
              className="block px-4 py-2 text-gray-700 hover:text-primary transition-colors"
            >
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
        <Typography
          variant="h6"
          component="h1"
          className="text-2xl font-heading font-bold text-primary flex-grow"
        >
          MoneyMind
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </IconButton>
            
            <Drawer
              anchor="right"
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
            >
              <MenuList />
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