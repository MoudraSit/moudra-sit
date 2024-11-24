import { Alert, Snackbar } from "@mui/material";
import { JSObject } from "types/common";

type Props = {
  floatingAlert?: boolean;
  floatingAlertOpen?: boolean;
  onFloatingAlertClose?: Function;
  errorMessage?: string;
  showContactSupportMessage?: boolean;
  sx?: JSObject;
};

function ErrorAlert({
  floatingAlert,
  floatingAlertOpen,
  onFloatingAlertClose,
  errorMessage = "Při ukládání nastala chyba, opakujte prosím akci později.",
  showContactSupportMessage = true,
  sx,
}: Props) {
  const alert = (
    <Alert
      severity="error"
      variant="filled"
      sx={{ width: "100%", zIndex: 10000, ...sx }}
    >
      {errorMessage}{" "}
      {showContactSupportMessage ? (
        <span>
          Pokud problém přetrvává, kontaktujte prosím
          <a href="mailto:support@moudrasit.cz">support@moudrasit.cz</a>
        </span>
      ) : null}
    </Alert>
  );

  return floatingAlert ? (
    <Snackbar
      open={floatingAlertOpen}
      autoHideDuration={6000}
      onClose={() => (onFloatingAlertClose ? onFloatingAlertClose() : null)}
    >
      {alert}
    </Snackbar>
  ) : (
    alert
  );
}

export default ErrorAlert;
