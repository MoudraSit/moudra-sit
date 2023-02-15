import { Button } from "@mui/material";
import React from "react";
import ReactImageUploading from "react-images-uploading";

// TODO: fix any for imageList, addUpdateIndex
// TODO: fix size uploaded pictures
// Sources: https://codesandbox.io/s/react-images-uploading-demo-u0khz?file=/src/index.js:158-1697
// https://www.npmjs.com/package/react-images-uploading?activeTab=readme

function UploadPicture() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <>
      <ReactImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg", "png"]}
      >
        {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
          <>
            <Button
              variant="contained"
              onClick={onImageUpload}
              {...dragProps}
              sx={{
                mt: 1,
                mr: 1,
                bgcolor: "secondary.main",
                color: "white",
              }}
            >
              Nahrát fotku
            </Button>
            {imageList.map((image, index) => (
              <>
                <div key={index} className="image-item">
                  <img
                    src={image.data_url}
                    alt=""
                    max-width="300px"
                    height="auto"
                  />
                  <div className="image-item__btn-wrapper">
                    <Button
                      variant="contained"
                      sx={{
                        mt: 1,
                        mr: 1,
                        mb: 2,
                        bgcolor: "red",
                        color: "white",
                      }}
                      onClick={() => onImageRemove(index)}
                    >
                      Odstranit
                    </Button>
                  </div>
                </div>
              </>
            ))}
          </>
        )}
      </ReactImageUploading>
    </>
  );
}

export default UploadPicture;
