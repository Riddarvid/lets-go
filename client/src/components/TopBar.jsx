import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Menu, Typography, MenuItem, Stack, Button } from "@mui/material";
import { useState } from "react";

const TopBar = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchor(null);
  };

  const handleCreateGame = () => {};

  return (
    <React.Fragment>
      <AppBar sx={{ width: "100%" }}>
        <Toolbar>
          <Stack direction="row" spacing={3}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Let's Go
            </Typography>
            <Button variant="text" onClick={handleMenu} color="inherit">
              Multiplayer
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={menuAnchor}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(menuAnchor)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default TopBar;
