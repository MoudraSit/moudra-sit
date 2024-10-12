"use client";

import {
  Button,
  CircularProgress,
  Drawer,
  Stack,
  TextField,
} from "@mui/material";
import { createQueryComment } from "components/senior-queries/actions";
import React from "react";

type Props = {
  queryId: string;
  isOpen: boolean;
  handleClose: Function;
};

function NewCommentCard({ queryId, isOpen, handleClose }: Props) {
  const [newComment, setNewComment] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);

  async function handleNewComment() {
    setIsPending(true);
    setNewComment("");
    await createQueryComment(queryId, newComment);
    setIsPending(false);
    handleClose();
  }

  return (
    <Drawer open={isOpen} onClose={() => handleClose()} anchor="bottom">
      <Stack sx={{ padding: "1rem" }}>
        {isPending ? (
          <CircularProgress
            color="secondary"
            size={150}
            sx={{ alignSelf: "center" }}
          />
        ) : (
          <TextField
            multiline
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            fullWidth
            color="info"
            size="small"
            placeholder="Nová poznámka"
            minRows={6}
            maxRows={10}
            inputProps={{ style: { fontSize: "1rem" } }} // font size of input text
          />
        )}
        <Button
          variant="text"
          fullWidth
          disabled={!newComment.length || isPending}
          color="info"
          onClick={handleNewComment}
        >
          Přidat poznámku
        </Button>
      </Stack>
    </Drawer>
  );
}

export default NewCommentCard;
