import { Alert, Snackbar } from "@mui/material";

type Props = {
  floatingAlert?: boolean;
  floatingAlertOpen?: boolean;
  onFloatingAlertClose?: Function;
  errorMessage?: string;
  showContactSupportMessage?: boolean;
};

function ErrorAlert({
  floatingAlert,
  floatingAlertOpen,
  onFloatingAlertClose,
  errorMessage = "Při ukládání nastala chyba, opakujte prosím akci později.",
  showContactSupportMessage = true,
}: Props) {
  const alert = (
    <Alert
      severity="error"
      variant="filled"
      sx={{ width: "100%", zIndex: 10000 }}
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
