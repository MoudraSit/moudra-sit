"use client";

import { CircularProgress, Drawer, Stack, TextField } from "@mui/material";
import FloatingAlert from "components/alerts/floating-alert";
import SubmitButton from "components/buttons/submit-button";
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
  const [isError, setIsError] = React.useState(false);

  async function handleNewComment() {
    try {
      setIsError(false);
      setIsPending(true);
      await createQueryComment(queryId, newComment);
      setNewComment("");
      setIsPending(false);
      handleClose();
    } catch (error) {
      console.error(error);
      setIsPending(false);
      setIsError(true);
    }
  }

  return (
    <Drawer open={isOpen} onClose={() => handleClose()} anchor="bottom">
      <Stack
        sx={{ padding: "1rem", maxWidth: 700, margin: "auto", width: "100%" }}
        spacing={2}
      >
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
            placeholder="Nový komentář"
            minRows={6}
            maxRows={10}
            inputProps={{ style: { fontSize: "1rem" } }} // font size of input text
          />
        )}
        <SubmitButton
          label="Přidat komentář"
          disabled={!newComment.length || isPending}
          onClick={handleNewComment}
        />
        {isError ? <FloatingAlert /> : null}
      </Stack>
    </Drawer>
  );
}

export default NewCommentCard;
