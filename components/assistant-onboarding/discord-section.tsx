"use client";

import { useState, useTransition } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import ArticleIcon from "@mui/icons-material/Article";
import SaveIcon from "@mui/icons-material/Save";
import DiscordIcon from "./discord-icon";
import PrimaryButton from "./primary-button";
import { submitDiscordUsername } from "./actions";

const DISCORD_INVITE_URL = "https://discord.gg/XEsY7JPSaP";

interface Props {
  initialUsername: string;
}

export default function DiscordSection({ initialUsername }: Props) {
  const [username, setUsername] = useState(initialUsername);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const trimmedEmpty = username.trim().length === 0;

  return (
    <Accordion
      defaultExpanded={false}
      disableGutters
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: 1 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={{ xs: 1, sm: 2 }}
          sx={{ width: "100%" }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ flex: 1, minWidth: 0, width: "100%" }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "#EDE7F6",
                color: "#5865F2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <DiscordIcon fontSize="small" />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" component="h2" sx={{ lineHeight: 1.2 }}>
                Discord (dobrovolné)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                Zanechte nám na sebe kontakt pro jednodušší komunikaci.
              </Typography>
            </Box>
          </Stack>
          <Chip
            size="small"
            label="Dobrovolné"
            sx={{
              bgcolor: "#1a1a1a",
              color: "#fff",
              alignSelf: { xs: "flex-start", sm: "center" },
              ml: { xs: 7, sm: 0 },
            }}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Tato část je dobrovolná. Pro usnadnění komunikace nám můžete
            zanechat svoje jméno na Discordu, pod kterým vás můžeme najít.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <TextField
              fullWidth
              size="small"
              placeholder="Zadejte své jméno na Discordu"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setSaved(false);
              }}
            />
            <PrimaryButton
              startIcon={<SaveIcon />}
              disabled={pending || trimmedEmpty}
              onClick={() =>
                startTransition(async () => {
                  setError(null);
                  setSaved(false);
                  const res = await submitDiscordUsername(username);
                  if (!res.ok) {
                    setError(res.message);
                  } else {
                    setSaved(true);
                  }
                })
              }
              sx={{ whiteSpace: "nowrap" }}
            >
              Uložit jméno
            </PrimaryButton>
          </Stack>

          {error && <Alert severity="error">{error}</Alert>}
          {saved && !error && <Alert severity="success">Jméno bylo uloženo.</Alert>}

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Button
              variant="contained"
              startIcon={<ArticleIcon />}
              onClick={() => setGuideOpen(true)}
              sx={{
                bgcolor: "#1a1a1a",
                color: "#fff",
                "&:hover": { bgcolor: "#000" },
              }}
            >
              Návod na přidání do lobby
            </Button>
            <Button
              variant="contained"
              component="a"
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<DiscordIcon />}
              sx={{
                bgcolor: "#1a1a1a",
                color: "#fff",
                "&:hover": { bgcolor: "#000" },
              }}
            >
              Otevřít Discord
            </Button>
          </Stack>
        </Stack>
      </AccordionDetails>

      <Dialog open={guideOpen} onClose={() => setGuideOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          Návod na přidání do lobby
          <IconButton onClick={() => setGuideOpen(false)} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            {"posílám návod na Discord:\n\n"}
            1) klikni zde na odkaz 👉{" "}
            <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer">
              {DISCORD_INVITE_URL}
            </a>
            {"\n\n2) pokud nemáš DC účet, tak si ho vytvoř\n\n" +
              "3) přihlas se na server Moudrá Síť\n\n" +
              "4) projdi si úvodní kroky, které ti ukážou náš sever:\n\n" +
              "a) změň si přezdívku u nás na svoje jméno a příjmení (ať víme, kdo jsi a můžeme ti kdyžtak psát)\n\n" +
              "b) do Lobby napiš město, kde budeš působit, ať tě můžeme na discordu správně zařadit a dát ti plný přístup\n\n" +
              "pokud tvoje město má víc částí -> napiš i tu část (např. Praha 10, Brno - komín apod)\n\n" +
              "b) mrkni do kanálu Technická podpora\n\n" +
              "c) mrkni do kanálu Klábosení\n\n" +
              "e) projděte si pravidla"}
          </Typography>
        </DialogContent>
      </Dialog>
    </Accordion>
  );
}
