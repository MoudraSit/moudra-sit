"use client";

import { Box, Button, TextField } from "@mui/material";
import { createQueryComment } from "components/senior-queries/actions";
import React from "react";

function NewCommentCard({ queryId }: { queryId: string }) {
  const [newComment, setNewComment] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);

  async function handleNewComment() {
    setIsPending(true);
    await createQueryComment(queryId, newComment);
    setNewComment("");
    setIsPending(false);
  }

  return (
    <Box>
      <TextField
        multiline
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        fullWidth
        color="info"
        size="small"
        placeholder="Nová poznámka"
        minRows={3}
        maxRows={6}
        inputProps={{ style: { fontSize: "1rem" } }} // font size of input text
      />
      <Button
        variant="text"
        disabled={!newComment.length || isPending}
        color="info"
        onClick={handleNewComment}
        sx={{ float: "right" }}
      >
        Přidat poznámku
      </Button>
    </Box>
  );
}

export default NewCommentCard;
