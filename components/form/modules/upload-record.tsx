import { Button } from "@mui/material";
import * as React from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

// TODO: fix any, generate multiple records
// Sources: https://www.npmjs.com/package/react-audio-voice-recorder

function UploadRecord() {
  const [records, setRecords] = React.useState([]);
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob: any) => {
    const url = URL.createObjectURL(blob);
    console.log(blob);
    setRecords(blob);
  };

  return (
    <>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        //recorderControls={recorderControls}
      />
      {/* {({}) => (
        <>
          <Button
            variant="contained"
            onClick={recorderControls.stopRecording}
            sx={{
              mt: 1,
              mr: 1,
              bgcolor: "info.main",
              color: "white",
            }}
          >
            Zastavit nahrávání
          </Button>
        </>
      )} */}
    </>
  );
}

export default UploadRecord;
