export const commonStyles = {
  "& .MuiInputBase-root": {
    fontSize: "16px !important",
    padding: 0,
  },
  "& .MuiInputBase-root.Mui-disabled": {
    background: "#F5F3EE",
  },
  "& .Mui-disabled": {
    "& .MuiOutlinedInput-notchedOutline": {
      border: "0",
    },
  },
  "& .MuiInputBase-input": {
    padding: "8.5px 14px",
    paddingLeft: "0.5rem",
  },
  "& .MuiInputBase-input.Mui-disabled": {
    background: "#F5F3EE",
    color: "black !important",
    // "-webkit-text-fill-color": "black !important",
    WebkitTextFillColor: "black !important",
  },
  "& .MuiFormLabel-root": {
    fontSize: "1rem !important",
    color: "black !important",
    fontWeight: "bold",
    zIndex: 1,
    transform: "translate(0px, -12px) scale(0.75)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    top: 0,
    borderColor: "#F5F3EE",
    "& legend": {
      zIndex: 0,
      width: 0,
    },
  },
};
