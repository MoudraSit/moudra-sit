import { Button } from "@mui/material";
import * as React from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

function UploadRecord() {
  const [records, setRecords] = React.useState([]);
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob: any) => {
    const url = URL.createObjectURL(blob);
    console.log(blob);
    setRecords(blob);
  };

  const onChange = () => {
    setRecords([]);
  };

  return (
    <>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      {records[0] ? (
        <>
          <Button
            variant="contained"
            onClick={onChange}
            sx={{
              mt: 1,
              mr: 1,
              bgcolor: "info.main",
              color: "white",
              letterSpacing: 0.5,
            }}
          >
            Odstranit
          </Button>
        </>
      ) : null}
    </>
  );
}

export default UploadRecord;
