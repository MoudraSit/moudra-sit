import FloatingAlert, { Props } from "./floating-alert";

function SuccessAlert({
  isSuccess,
  setIsSuccess,
  message = "Změny uloženy.",
  ...props
}: Props & {
  isSuccess: boolean;
  setIsSuccess: Function;
  message?: string;
}) {
  return (
    <FloatingAlert
      errorMessage={message}
      type="success"
      floatingAlert
      floatingAlertOpen={isSuccess}
      showContactSupportMessage={false}
      onFloatingAlertClose={() => setIsSuccess(false)}
      {...props}
    />
  );
}

export default SuccessAlert;
