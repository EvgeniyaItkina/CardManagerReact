import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from '../../context/ThemeContext';
import './NavbarMaterialUI.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../UserSlice';
import { useState } from 'react';

let pages = [
  { name: 'About', path: '/about' },
];
let buttons = [
  { name: 'Login', path: '/login' },
  { name: 'Registration', path: '/registration' },
];

function NavbarMaterialUI({ onSearch }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [search, setSearch] = useState('');
  const { mode, toggleTheme } = useTheme();
  const userState = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  if (!userState) {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(login(token))
    }
  }
  if (userState && userState.isBusiness && !userState.isAdmin
  ) {
    pages = [
      { name: 'About', path: '/about' },
      { name: 'Fav Cards', path: '/favCards' },
      { name: 'My Cards', path: '/myCards' },
    ];
    buttons = [];
  }

  if (userState && !userState.isBusiness && !userState.isAdmin) {
    pages = [
      { name: 'About', path: '/about' },
      { name: 'Fav Cards', path: '/favCards' },
    ];
    buttons = [];
  }

  if (userState && userState.isAdmin) {
    pages = [
      { name: 'About', path: '/about' },
      { name: 'Fav Cards', path: '/favCards' },
      { name: 'My Cards', path: '/myCards' },
      { name: 'CRM', path: '/CRM' }
    ];
    buttons = [];
  }
  if (!userState) {
    pages = [
      { name: 'About', path: '/about' },
    ];
    buttons = [
      { name: 'Login', path: '/login' },
      { name: 'Registration', path: '/registration' },
    ];
  }

  const handleSearchChange = (event) => {
    const value = event.target.value;
    if (typeof value === 'string') {
      setSearch(value);
      onSearch(value);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const handleUserLogout = () => {
    dispatch(logout());
    navigate("/");
    handleCloseUserMenu();
  };

  const handleUserProfile = () => {
    navigate("/profilechange");
    handleCloseUserMenu();
  }

  return (
    <AppBar position="static" className="my_navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CardKeeper
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}

              {buttons.map((button) => (
                <Button
                  key={button.name}
                  component={Link}
                  to={button.path}
                  sx={{ my: 2, color: 'inherit', display: 'block' }}
                >
                  <Typography textAlign="center">{button.name}</Typography>
                </Button>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CardKeeper
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <form onSubmit={handleSearchSubmit}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              value={search}
              onChange={handleSearchChange}
              sx={{ marginRight: 2, backgroundColor: 'white', borderRadius: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </form>
          <FormControlLabel
            control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
            label={mode === 'light' ? 'Light Mode' : 'Dark Mode'}
          />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {buttons.map((button) => (
              <Button
                key={button.name}
                component={Link}
                to={button.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {button.name}
              </Button>
            ))}
          </Box>
          <Box sx={userState ? { display: 'flex', flexGrow: 0 } : { display: 'none' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Label" src="/favicon.ico" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="Logout" onClick={handleUserLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
              <MenuItem key="Profile" onClick={handleUserProfile}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarMaterialUI;
