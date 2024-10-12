"use client";

import { AddBox } from "@mui/icons-material";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import QueryCommentCard from "./comment-card";
import NewCommentCard from "./new-comment-card";
import { QueryComment } from "types/seniorQuery";
import { useState } from "react";

type Props = {
  queryId: string;
  comments: Array<QueryComment>;
};

function QueryDetailCommentsSection({ queryId, comments }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Poznámka digitálního asistenta
        </Typography>
        <IconButton onClick={() => setDrawerOpen(true)}>
          <AddBox color="warning" />
        </IconButton>
      </Stack>
      <Box
        sx={{
          maxHeight: "50vh",
          overflow: "scroll",
        }}
      >
        {comments.map((comment) => (
          <QueryCommentCard key={comment.id} {...comment} />
        ))}
      </Box>
      <NewCommentCard
        queryId={queryId}
        isOpen={drawerOpen}
        handleClose={() => setDrawerOpen(false)}
      />
    </Box>
  );
}

export default QueryDetailCommentsSection;
