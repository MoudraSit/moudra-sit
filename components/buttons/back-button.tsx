import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";

type Props = {
  href: string;
};

// TODO: real back button, this href adds it on top of the history stack

function BackButton({ href }: Props) {
  return (
    <Button
      LinkComponent={Link}
      variant="text"
      size="small"
      href={href}
      startIcon={<ArrowBackIosIcon />}
      sx={{ color: "black", width: '64px' }}
    >
      Zpět
    </Button>
  );
}

export default BackButton;
