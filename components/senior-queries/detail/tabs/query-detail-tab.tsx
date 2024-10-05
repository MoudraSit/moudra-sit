import {
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { QueryComment, SeniorQuery } from "types/seniorQuery";
import { BORDER_COLOR, ReadOnlyBox, ReadOnlyField } from "./helper-components";
import { formatDate, formatDateTime } from "helper/utils";
import { createQueryComment } from "components/senior-queries/actions";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type Props = {
  seniorQuery: SeniorQuery;
};

function QueryDetailTab({ seniorQuery }: Props) {
  const comments = seniorQuery.fields?.komentare?.messages;
  const sortedComments = [...(comments ?? [])].sort((a, b) =>
    new Date(a.created) < new Date(b.created) ? 1 : -1
  );

  return (
    <>
      <Stack spacing={2}>
        <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
          Datum vložení:
          <span style={{ marginLeft: "0.5rem", fontWeight: "normal" }}>
            {formatDate(seniorQuery.fields.datumVytvoreni)}
          </span>
        </Typography>
        <ReadOnlyBox label="Stav dotazu">
          <Chip
            size="small"
            label={seniorQuery.fields.stavDotazu}
            color="warning"
          />
        </ReadOnlyBox>

        <Box>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            {seniorQuery.fields.popis}
          </Typography>
          <Typography>{seniorQuery.fields.podrobnosti}</Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
              marginBottom: "0.5rem",
            }}
          >
            Senior
          </Typography>
          <Grid
            container
            spacing={1}
            sx={{
              width: "100%",
              border: `1px ${BORDER_COLOR} solid`,
              padding: "0.5rem",
              margin: 0,
            }}
          >
            <Grid item xs={12}>
              <Typography>
                {seniorQuery.fields.iDSeniora.fields.prijmeniJmeno}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <ReadOnlyField
                label="Lokalita"
                value={seniorQuery.fields.iDSeniora.fields.mesto}
              />
            </Grid>
            <Grid item xs={6}>
              <ReadOnlyField
                label="Telefon"
                value={seniorQuery.fields.iDSeniora.fields.telefon}
              />
            </Grid>
            <Grid item xs={6}>
              <ReadOnlyField
                label="Věk"
                value={
                  new Date().getFullYear() -
                  seniorQuery.fields.iDSeniora.fields.rokNarozeni
                }
              />
            </Grid>
            <Grid item xs={6}>
              <ReadOnlyField
                label="E-mail"
                value={seniorQuery.fields.iDSeniora.fields.email}
              />
            </Grid>
          </Grid>
        </Box>
        <ReadOnlyBox label="Zařízení">
          {seniorQuery.fields.kategorieDotazu}
        </ReadOnlyBox>
        <ReadOnlyBox label="Preferované místo setkání">
          {seniorQuery.fields.pozadovaneMistoPomoci}
        </ReadOnlyBox>
        <ReadOnlyBox label="Řešitel dotazu">
          {seniorQuery.fields.resitelDotazu}
        </ReadOnlyBox>
      </Stack>
      <Box>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "16px", marginBottom: "0.5rem" }}
        >
          Poznámka digitálního asistenta
        </Typography>
        <>
          {sortedComments.map((comment) => (
            <QueryCommentCard key={comment.id} {...comment} />
          ))}
        </>
        <NewCommentCard queryId={seniorQuery.id} />
      </Box>
    </>
  );
}

function QueryCommentCard({ text, authorName, created }: QueryComment) {
  return (
    <Grid
      container
      alignItems={"center"}
      sx={{
        background: "#F1F1F1",
        width: "100%",
        margin: 0,
        marginBottom: "0.5rem",
        padding: "0.5rem",
        borderRadius: "11px",
      }}
    >
      <Grid item xs={1}>
        <AccountCircleIcon />
      </Grid>
      <Grid item xs={11} sx={{ paddingLeft: "0.5rem" }}>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="caption" sx={{ fontSize: "12px" }}>
            {authorName}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: "12px", color: "#9E9E9E" }}
          >
            {formatDateTime(created)}
          </Typography>
        </Stack>
        <Typography>{text}</Typography>
      </Grid>
    </Grid>
  );
}

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

export default QueryDetailTab;
