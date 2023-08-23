import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Menu, Typography, MenuItem, Stack, Button } from "@mui/material";
import { useState } from "react";
import CreateGameDialog from "./CreateGameDialog";

const TopBar = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const openMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const handleCreateGame = () => {
    setCreateDialogOpen(true);
    closeMenu();
  };

  const handleCreateGameClose = () => {
    setCreateDialogOpen(false);
  };

  return (
    <React.Fragment>
      <CreateGameDialog
        open={createDialogOpen}
        handleClose={handleCreateGameClose}
      />
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
            <Button variant="text" onClick={openMenu} color="inherit">
              Multiplayer
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={menuAnchor}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(menuAnchor)}
              onClose={closeMenu}
            >
              <MenuItem onClick={handleCreateGame}>Create new game</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default TopBar;
