import { Dialog, DialogTitle, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

const backendUrl =
  "https://gqzmvnpow7.execute-api.eu-north-1.amazonaws.com/test";

const CreateGameDialog = ({ open, handleClose }) => {
  const [userIDs, setUserIDs] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const createGame = async () => {
      try {
        const response = await fetch(backendUrl + "/game", {
          method: "POST",
          body: JSON.stringify({
            dimension: 19,
          }),
        });
        const body = await response.json();
        setUserIDs(body);
      } catch (error) {
        enqueueSnackbar("Something went wrong, please try again.", {
          variant: "error",
        });
        console.error(error);
        handleClose();
      }
    };

    if (open) {
      createGame();
    }
  }, [open, handleClose, enqueueSnackbar]);

  if (!userIDs) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>New game created!</DialogTitle>
      <Typography>{"Blacks's link: " + userIDs.blackUUID}</Typography>
      <Typography>{"White's link: " + userIDs.whiteUUID}</Typography>
    </Dialog>
  );
};

export default CreateGameDialog;
