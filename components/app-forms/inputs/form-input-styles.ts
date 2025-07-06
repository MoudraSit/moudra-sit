export const commonStyles = {
  "& .MuiInputBase-root": {
    fontSize: "16px !important",
    padding: 0,
  },
  "& .MuiInputBase-root.Mui-disabled": {
    background: "#F6F6F6",
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
    background: "#F6F6F6",
    color: "black !important",
    // "-webkit-text-fill-color": "black !important",
    WebkitTextFillColor: "black !important",
  },
  "& .MuiFormLabel-root": {
    fontSize: "15px !important",
    color: "black !important",
    fontWeight: "bold",
    zIndex: 1,
    transform: "translate(0px, -16px) scale(1)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    top: 0,
    borderColor: "#DADADA",
    "& legend": {
      zIndex: 0,
      width: 0,
    },
  },
};
