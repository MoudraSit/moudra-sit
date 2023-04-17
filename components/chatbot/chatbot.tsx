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
import PersonIcon from "@mui/icons-material/Person";

import chatbot from "../../public/images/chatbot/chatbot.gif";
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

  // YOUR CODE (NOT RELATED TO DIALOGFLOW MESSENGER)

  // if (typeof window !== "undefined") {
  //   window.addEventListener("dfMessengerLoaded", function (event) {
  //     const dfMessenger = document.querySelector("df-messenger");
  //     const style = document.createElement("style");

  //     const nonMobileMinWidth = 501; // Breakpoint where DF Messenger switches between mobile/non-mobile styles

  //     style.textContent =
  //       "@media screen and (min-width: " +
  //       nonMobileMinWidth +
  //       "px) { .chat-wrapper { max-height: 45% } }";
  //     if (dfMessenger) {
  //       dfMessenger.shadowRoot
  //         ?.querySelector("df-messenger-chat")
  //         ?.shadowRoot?.appendChild(style);
  //     }
  //   });
  // }

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

    console.log(input);

    try {
      const response = await fetch("/api/chatbot/chat-gpt", {
        method: "POST",
        body: JSON.stringify({ prompt: input, message: message }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      // TODO: parse response
      const jsonObject: any = await response.json();

      console.log(jsonObject.text);

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
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
      <div
        dangerouslySetInnerHTML={{
          __html: `
   <df-messenger
  intent="WELCOME"
  chat-title="Chatbot"
  ask-something="Zeptejte se"
  agent-id="2ca6976c-d320-4c33-93ca-fd3eebe5af47"
  language-code="cs"
  chat-icon="https://moudrasit.cz/wp-content/uploads/2023/04/bot.png"
></df-messenger>
<style>

  df-messenger {
   --df-messenger-bot-message: #ffffff;
   --df-messenger-button-titlebar-color: #ffffff;
   --df-messenger-button-titlebar-font-color: #000000;
   --df-messenger-chat-background-color: #f5f3ee;
   --df-messenger-font-color: black;
   --df-messenger-send-icon: #878fac;
   --df-messenger-user-message: #FF9800;
   --df-messenger-chip-color: #FF9800;
   --df-messenger-chip-border-color: #FF9800;
    margin: 0;
    padding: 0;
    position: fixed;
    right: 80px;
    transform: translateX(10%) translateY(10%);
    bottom: 0px;
    z-index: 200;

    div.chat-wrapper[opened="true"] { height: 440px; } 

  }
</style>
<script>


</script>
`,
        }}
      />

      <ThemeProvider theme={appTheme}>
        <Box
          sx={{
            bgcolor: "#028790",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                bgcolor: "#f5f3ee",
                pt: 10,
                pb: 6,
                pl: 2,
                pr: 2,
                borderRadius: 2,
              }}
            >
              {/* <Typography
                sx={{ fontWeight: "bold", mt: 5, pt: 4 }}
                variant="h2"
                align="center"
                color="#3e3e3e"
                gutterBottom
              >
                Chatbot
              </Typography> */}

              {/* <Typography
                sx={{ fontWeight: "bold" }}
                variant="h5"
                align="center"
                color="#3e3e3e"
                gutterBottom
              >
                Pokusí se Vám poskytnout nejlepší možnou odpověď na Váš dotaz.
              </Typography> */}
              <Image
                src={chatIcon}
                alt={""}
                height="170"
                style={{
                  margin: "10px",
                  color: "#e25b5b",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <Typography
                sx={{ fontWeight: "bold", mt: 5 }}
                variant="h5"
                align="center"
                color="#3e3e3e"
                gutterBottom
              >
                Zeptejte se našeho chatbota!
              </Typography>
              <Typography
                sx={{ pb: 4, fontWeight: "bold" }}
                variant="h5"
                align="center"
                color="#3e3e3e"
                paragraph
              >
                S čím přesně potřebujete pomoct?
              </Typography>

              <Container maxWidth="sm">
                {message.map((msg: IMessage) => (
                  //console.log(msg.key),
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
                      id="description"
                      label="Dotaz"
                      name="description"
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
                        //console.log(`Pressed keyCode ${ev.key}`);
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
                        bgcolor: "#e25b5b !important",
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
