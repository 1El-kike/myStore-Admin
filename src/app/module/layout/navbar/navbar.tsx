import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { FaMailBulk, FaSearch, FaStore } from "react-icons/fa";
import {
  MdAccountCircle,
  MdMore,
  MdNotifications,
  MdNotificationsActive,
  MdOutlineAccountCircle,
  MdProductionQuantityLimits,
  MdSpaceDashboard,
} from "react-icons/md";
import { IconBase } from "react-icons";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { FcSettings } from "react-icons/fc";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const Navbars = ({ width }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorSl, setAnchorSl] = useState<null | HTMLElement>(null);
  const [anchorUl, setAnchorUl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [whit, setwhit] = useState<boolean>(false);

  useEffect(() => {
    setwhit(width);
  }, [width]);

  const isMenuOpen = Boolean(anchorEl);
  const isStoreOpen = Boolean(anchorSl);
  const isUserOpen = Boolean(anchorUl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleStores = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorSl(event.currentTarget);
  };
  const handleUser = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorSl(null);
    setAnchorUl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuProducts = "primary-search-account-menu";
  const menuStores = "primary-search-account-store";
  const menuUser = "primary-search-account-menu-mobile";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderStores = (
    <Menu
      anchorEl={anchorSl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuStores}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isStoreOpen}
      onClose={handleMenuClose}
    >
      <Link to={"stores"}>
        <MenuItem onClick={handleMenuClose}>Stores Management</MenuItem>
      </Link>
      <MenuItem onClick={handleMenuClose}>Stores Sales</MenuItem>
      <MenuItem onClick={handleMenuClose}>Inventory</MenuItem>
    </Menu>
  );
  const renderProducts = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuProducts}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Order List</MenuItem>
      <MenuItem onClick={handleMenuClose}>Shopping</MenuItem>
      <Link to={"products"}>
        <MenuItem onClick={handleMenuClose}>Create Product</MenuItem>
      </Link>
    </Menu>
  );
  const renderUser = (
    <Menu
      anchorEl={anchorUl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuUser}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isUserOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>User</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sing In</MenuItem>
      <Link to={"user"}>
        <MenuItem onClick={handleMenuClose}>Sing Up</MenuItem>
      </Link>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to={"dashboard"}>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MdSpaceDashboard />
            </Badge>
          </IconButton>
          Dashboards
        </MenuItem>
      </Link>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <MdProductionQuantityLimits />
          </Badge>
        </IconButton>
        <p>Products</p>
      </MenuItem>
      <MenuItem onClick={handleStores}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <FaStore />
        </IconButton>
        <p>Stores</p>
      </MenuItem>
    </Menu>
  );

  const isMobile = useMediaQuery({ query: "(max-width: 758px)" });

  return (
    <div className="flex justify-end">
      <Box
        sx={whit ? { height: 65, width: "60%" } : { height: 65, width: "80%" }}
      >
        <AppBar
          position="fixed"
          sx={{
            backgroundImage: "linear-gradient(to right, #7c2d3e, #4b5563)",
            width: whit
              ? isMobile
                ? "100%"
                : "96%"
              : isMobile
              ? "100%"
              : "84%",
            zIndex: 40,
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <IconBase />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
            <Search>
              <SearchIconWrapper>
                <FaSearch />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <FcSettings />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <MdNotificationsActive />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuUser}
                aria-haspopup="true"
                onClick={handleUser}
                color="inherit"
              >
                <MdOutlineAccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MdMore />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderStores}
        {renderProducts}
        {renderUser}
      </Box>
    </div>
  );
};
