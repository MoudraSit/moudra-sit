import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import CancelButton from "components/buttons/cancel-button";
import SubmitButton from "components/buttons/submit-button";
import { formatDate } from "helper/utils";

type Props = {
  open: boolean;
  handleClose: Function;
  handleConfirm: Function;
  visitDate: string;
};

function ConfirmCalendarEventDialog({
  open,
  handleClose,
  handleConfirm,
  visitDate,
}: Props) {
  return (
    <Dialog open={open} onClose={() => handleClose()} sx={{ m: "0rem" }}>
      <DialogContent sx={{ p: "1rem" }}>
        <DialogContentText>
          Opravdu chcete přidat do svého kalendáře{" "}
          <span style={{ fontWeight: "bold" }}>
            setkání dne {formatDate(visitDate)}?
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={() => handleClose()} />
        <SubmitButton onClick={() => handleConfirm()} label={"OK"} />
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmCalendarEventDialog;
