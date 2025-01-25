import { TOO_SMALL_HEIGHT } from "helper/consts";

export const outerBoxStyles = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
};

export const innerBoxStyles = {
  [`@media (max-height: ${TOO_SMALL_HEIGHT}px)`]: {
    padding: { xs: "0.5rem 1rem", md: "1rem 2rem" },
  },
  padding: { xs: "1rem", md: "2rem" },
  flexGrow: 1,
  maxWidth: 700,
  width: "100%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
};
