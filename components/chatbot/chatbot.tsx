/**
 * chatIcon - free icon created by Freepik - Flaticon
 * Free for personal and commercial use with attribution
 *
 * Flaticon license:
 * https://www.freepikcompany.com/legal?_gl=1*wlrn0w*test_ga*MTA0Nzc2OTQ5LjE2ODA0MjY0MjY.*test_ga_523JXC6VL7*MTY4NDE1NTQ3Ni4xMC4xLjE2ODQxNTU1MTQuMjIuMC4w*fp_ga*MTA0Nzc2OTQ5LjE2ODA0MjY0MjY.*fp_ga_1ZY8468CQB*MTY4NDE1NTQ3Ni4xMC4xLjE2ODQxNTU1MTQuMjIuMC4w&_ga=2.204569112.985862183.1684155476-104776949.1680426426#nav-flaticon
 */

import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { appTheme } from "../theme/theme";
import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";
import chatIcon from "../../public/images/chatbot/bot.png";
import LoadingComponent from "./loading";

export enum Author {
  User = 0,
  Chatbot = 1,
}

export interface IMessage {
  key: number;
  text: string;
  dateTime: string;
  author: Author;
}

/** Component representing one message in conversation */
function SingleMessage({ text, author, dateTime }: IMessage) {
  if (author === Author.User) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 2,
            alignItems: "flex-end",
          }}
        >
          <Box
            sx={{
              bgcolor: "#ffffff",
              p: 2,
              borderRadius: "20px 20px 0px 20px",
              maxWidth: "80%",
              wordWrap: "break-word",
            }}
          >
            <Typography align="left" color="#3e3e3e" gutterBottom>
              Já, {dateTime}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              align="right"
              color="#3e3e3e"
              gutterBottom
            >
              {text}
            </Typography>
          </Box>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            mb: 2,
          }}
        >
          <Avatar sx={{ mr: 1, backgroundColor: "#e3d65b" }}>
            {/* <a href="https://www.flaticon.com/free-icons/bot" title="bot icons">
              Bot icons created by Freepik - Flaticon
            </a> */}
            <Image src={chatIcon} alt={""} height="30" />
          </Avatar>
          <Box
            sx={{
              bgcolor: "#e3d65b",
              p: 2,
              borderRadius: "20px 20px 20px 0px",
              maxWidth: "80%",
              wordWrap: "break-word",
            }}
          >
            <Typography align="left" color="#3e3e3e" gutterBottom>
              Chatbot, {dateTime}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              align="left"
              color="#3e3e3e"
              gutterBottom
            >
              {text}
            </Typography>
          </Box>
        </Box>
      </>
    );
  }
}

function Chatbot() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const prevMessage = useRef<IMessage[]>();

  useEffect(() => {
    prevMessage.current = message;
  }, [message]);

  async function handleSend() {
    setLoading(true);

    setInput("");

    const dt = new Date();

    const newMessage: IMessage = {
      key: new Date().getTime(),
      dateTime:
        dt.getHours() +
        ":" +
        (dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes()),
      text: input,
      author: Author.User,
    };

    setMessage([...(prevMessage.current as IMessage[]), newMessage]);

    try {
      const response = await fetch("/api/chatbot/chat-gpt", {
        method: "POST",
        body: JSON.stringify({ prompt: input, message: message }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonObject: any = await response.json();

      const dtb = new Date();

      if (jsonObject.text) {
        const gptMessage: IMessage = {
          key: new Date().getTime(),
          dateTime:
            dtb.getHours() +
            ":" +
            (dtb.getMinutes() < 10 ? "0" + dtb.getMinutes() : dtb.getMinutes()),
          text: jsonObject.text,
          author: Author.Chatbot,
        };

        setMessage([...(prevMessage.current as IMessage[]), gptMessage]);
      } else {
        console.log("There was an error in response");
      }
    } catch (error) {
      console.log("There was an error", error);
      return Promise.reject(error);
    }

    setLoading(false);
  }

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Box
          sx={{
            bgcolor: "#028790",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h1"
              align="left"
              color="primary"
              fontWeight="bold"
            >
              Chatbot
            </Typography>
            <Box
              sx={{
                bgcolor: "#f5f3ee",
                mt: 4,
                pt: 10,
                pb: 6,
                pl: 2,
                pr: 2,
                borderRadius: 2,
              }}
            >
              <Image
                src={chatIcon}
                alt={""}
                height="170"
                style={{
                  margin: "10px",
                  color: "#D3215D",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <Typography
                sx={{ fontWeight: "bold", mt: 5 }}
                variant="h2"
                align="center"
                color="#3e3e3e"
                gutterBottom
              >
                Zeptejte se našeho chatbota (jedná se o testovací verzi).
              </Typography>
              <Typography
                sx={{ pb: 4, fontWeight: "bold" }}
                variant="h2"
                align="center"
                color="#3e3e3e"
              >
                S čím potřebujete pomoct?
              </Typography>

              <Container maxWidth="sm">
                {message.map((msg: IMessage) => (
                  <SingleMessage
                    key={msg.key}
                    dateTime={msg.dateTime}
                    text={msg.text}
                    author={msg.author}
                  />
                ))}
                {loading ? <LoadingComponent /> : null}
                <Grid
                  container
                  spacing={1}
                  alignItems="flex-end"
                  sx={{ pl: 6 }}
                >
                  <Grid item xs={12} sm={10}>
                    <TextField
                      id="question"
                      label="Zde zadejte dotaz"
                      name="question"
                      variant="outlined"
                      color="info"
                      multiline
                      rows={2}
                      fullWidth
                      sx={{
                        ".MuiInputBase-root": {
                          backgroundColor: "white",
                        },
                      }}
                      inputProps={{
                        style: {
                          WebkitBoxShadow: "0 0 0 1000px white inset",
                          WebkitTextFillColor: "black",
                          padding: 0,
                          fontSize: 20,
                        },
                      }}
                      InputProps={{ style: { fontSize: 20 } }}
                      InputLabelProps={{ style: { fontSize: 20 } }}
                      onChange={(ev) => setInput(ev.target.value)}
                      onKeyPress={(ev) => {
                        if (ev.key === "Enter") {
                          handleSend();
                          ev.preventDefault();
                        }
                      }}
                      value={input}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        mt: { xs: 2, sm: 0 },
                        ml: { xs: 0, sm: 1 },
                        bgcolor: "#D3215D !important",
                        color: "white",
                      }}
                      onClick={() => handleSend()}
                      endIcon={<SendIcon />}
                    >
                      Odeslat
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Chatbot;
