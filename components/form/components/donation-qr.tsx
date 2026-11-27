import { Box } from "@mui/material";
import Image from "next/image";

// QR code pointing to DONATION_URL (same link as the "zde" text link).
// Hidden on phones: a visitor cannot scan a code shown on the screen of the phone they hold.
function DonationQr() {
  return (
    <Box sx={{ display: { xs: "none", sm: "block" }, pb: 4 }}>
      <Image
        src="/images/qr-dar.png"
        alt="QR kód s odkazem na stránku pro dárce Moudré Sítě"
        width={210}
        height={193}
      />
    </Box>
  );
}

export default DonationQr;
