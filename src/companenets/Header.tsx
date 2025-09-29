import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import logo from "../assets/images/coba_logo.png";
import { useAppSelector } from "../app/hooks"; // bizim typed hook
import { useAppDispatch } from "../app/hooks";
import { clearUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { identityService } from "../services/identityService";

function Header() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const res = await identityService.logout();
        console.log(res);
      }
    } catch (err) {
      console.error("Logout API hatası:", err);
    } finally {
      localStorage.removeItem("token");
      dispatch(clearUser());
      navigate("/login");
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { label: "ANASAYFA", path: "/" },
    { label: "HAKKIMIZDA", path: "/about" },
    { label: "ÜRÜNLER", path: "/shop" },
  ];

  return (
    <>
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar>
          <img src={logo} height={45} alt="logo" />
          <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>

          {/* Desktop Menü */}
          {!isMobile && (
            <>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  color="inherit"
                >
                  {item.label}
                </Button>
              ))}
              {!isAuthenticated ? (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    color="warning"
                    variant="contained"
                    sx={{
                      ml: 2,
                      "&:hover": {
                        backgroundColor: "#f8a831ff",
                        color: "#fff",
                      },
                    }}
                  >
                    Giriş Yap
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    color="primary"
                    variant="contained"
                    sx={{
                      ml: 2,
                      "&:hover": {
                        backgroundColor: "#79a3e2ff",
                        color: "#fff",
                      },
                    }}
                  >
                    Kayıt Ol
                  </Button>
                </>
              ) : (
                <>
                  <Typography sx={{ ml: 2 }}>{user?.username}</Typography>
                  <Button
                    color="error"
                    variant="outlined"
                    sx={{ ml: 2 }}
                    onClick={handleLogout}
                  >
                    Çıkış Yap
                  </Button>
                </>
              )}
              <IconButton color="inherit" sx={{ ml: 2 }}>
                <Badge badgeContent={5} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </>
          )}

          {/* Mobile Menü */}
          {isMobile && (
            <>
              <IconButton color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={5} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer (Mobile Menü) */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItemButton component={Link} to={item.path} key={index}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}

            {!isAuthenticated ? (
              <>
                <ListItem>
                  <Button
                    component={Link}
                    to="/login"
                    color="warning"
                    variant="contained"
                    fullWidth
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f8a831ff",
                        color: "#fff",
                      },
                    }}
                  >
                    Giriş Yap
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    component={Link}
                    to="/register"
                    color="primary"
                    variant="contained"
                    fullWidth
                    sx={{
                      "&:hover": {
                        backgroundColor: "#79a3e2ff",
                        color: "#fff",
                      },
                    }}
                  >
                    Kayıt Ol
                  </Button>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    {user?.username}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    color="error"
                    variant="outlined"
                    fullWidth
                    onClick={handleLogout}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#ff4d4d",
                        color: "#fff",
                      },
                    }}
                  >
                    Çıkış Yap
                  </Button>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
