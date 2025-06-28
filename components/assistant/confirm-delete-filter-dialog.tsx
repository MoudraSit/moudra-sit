import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import CancelButton from "components/buttons/cancel-button";
import SubmitButton from "components/buttons/submit-button";

type Props = {
  open: boolean;
  handleClose: Function;
  handleConfirm: Function;
  filterName: string;
};

function ConfirmDeleteFilterDialog({
  open,
  handleClose,
  handleConfirm,
  filterName,
}: Props) {
  return (
    <Dialog open={open} onClose={() => handleClose()} sx={{ m: "0rem" }}>
      <DialogContent sx={{ p: "1rem" }}>
        <DialogContentText>
          Opravdu chcete vymazat filtr{" "}
          <span style={{ fontWeight: "bold" }}>{filterName}</span>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={() => handleClose()} />
        <SubmitButton onClick={() => handleConfirm()} label={"OK"} />
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteFilterDialog;
