import { Button, Grid, ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";
import React from "react";
import ReactImageUploading, { ImageType } from "react-images-uploading";

// TODO: fix any for imageList, addUpdateIndex
// TODO: fix size uploaded pictures
// Sources: https://codesandbox.io/s/react-images-uploading-demo-u0khz?file=/src/index.js:158-1697
// https://www.npmjs.com/package/react-images-uploading?activeTab=readme

function dataURItoBlob(dataURI: string) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;

  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

function UploadPicture({ uploadedImage }: ImageType) {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    var blob = dataURItoBlob(imageList[0].data_url);

    console.log(blob, addUpdateIndex);

    uploadedImage(blob);
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
            <ImageList
              gap={6}
              sx={{
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(280px,1fr)) !important",
              }}
            >
              {imageList.map((image, index) => (
                <ImageListItem key={index} sx={{ height: "100% !important" }}>
                  <img id="input-image" alt="" src={image.data_url} />
                  <div className="image-item__btn-wrapper">
                    <Button
                      variant="contained"
                      sx={{
                        mt: 1,
                        mr: 1,
                        mb: 2,
                        bgcolor: "#e25b5b",
                        color: "white",
                      }}
                      onClick={() => onImageRemove(index)}
                    >
                      Odstranit
                    </Button>
                  </div>
                </ImageListItem>
              ))}
            </ImageList>
          </>
        )}
      </ReactImageUploading>
    </>
  );
}

export default UploadPicture;
