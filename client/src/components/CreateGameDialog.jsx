import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

const apiUrl =
  "wss://b93z3z9h0c.execute-api.eu-north-1.amazonaws.com/production";

const CreateGameDialog = ({ open, handleClose }) => {
  const [userIDs, setUserIDs] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const createGame = async () => {
      try {
        console.log("Creating ws");
        const ws = new WebSocket(apiUrl);
        ws.onopen = () => {
          console.log("Sending create game request");
          ws.send(
            JSON.stringify({
              action: "createGame",
              size: 19,
            })
          );
        };
        ws.onmessage = (event) => {
          console.log("Response received", event);
          const message = JSON.parse(event.data);
          if (message.type === "game-created") {
            console.log("Updating state");
            setUserIDs(message.data);
          }
        };
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

  console.log(userIDs);
  if (!userIDs) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>New game created!</DialogTitle>
      <DialogContent>
        <Stack>
          <Button href={`/multiplayer/${userIDs.blackId}`}>Black</Button>
          <Button href={`/multiplayer/${userIDs.whiteId}`}>White</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGameDialog;
