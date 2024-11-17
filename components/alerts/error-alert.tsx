import { Alert, Snackbar } from "@mui/material";

type Props = {
  floatingAlert?: boolean;
  floatingAlertOpen?: boolean;
  onFloatingAlertClose?: Function;
  errorMessage?: string;
};

function ErrorAlert({
  floatingAlert,
  floatingAlertOpen,
  onFloatingAlertClose,
  errorMessage = "Při ukládání nastala chyba, opakujte prosím akci později.",
}: Props) {
  const alert = (
    <Alert severity="error" variant="filled" sx={{ width: "100%", zIndex: 10000 }}>
      {errorMessage} Pokud problém přetrvává, kontaktujte prosím{" "}
      <a href="mailto:support@moudrasit.cz">support@moudrasit.cz</a>.
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
