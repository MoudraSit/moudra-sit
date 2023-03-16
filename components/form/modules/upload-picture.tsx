import { Button, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import ReactImageUploading, { ImageType } from "react-images-uploading";

// TODO: fix any for imageList, addUpdateIndex
// TODO: fix size uploaded pictures
// Sources: https://codesandbox.io/s/react-images-uploading-demo-u0khz?file=/src/index.js:158-1697
// https://www.npmjs.com/package/react-images-uploading?activeTab=readme

// Sources: compress photo
// https://gist.github.com/ORESoftware/ba5d03f3e1826dc15d5ad2bcec37f7bf

function dataURLtoFile(dataurl: any, filename: any) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

function resizeImage(base64Str: string, maxWidth = 700, maxHeight = 500) {
  return new Promise((resolve) => {
    let img = new (window as any).Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement('canvas')
      const MAX_WIDTH = maxWidth
      const MAX_HEIGHT = maxHeight
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
      }
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL())
    }
  })
}

function UploadPicture({ uploadedImage }: ImageType) {
  const [images, setImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const maxNumber = 1;

  const onChange = (imageList: any, addUpdateIndex: any) => {
    setImages(imageList);

    if (imageList[0]) {
      let base64object: string = imageList[0].data_url;
      
      let typeOfImage: string =
        "image." +
        base64object.substring(
          base64object.indexOf("/") + 1,
          base64object.lastIndexOf(";")
        );
      let newFile = dataURLtoFile(imageList[0].data_url, typeOfImage);
      let newUrl = URL.createObjectURL(newFile);
      
      resizeImage(base64object).then((result) => {
        console.log(result);
        uploadedImage(result);
      });

      setSelectedImage(newUrl);
      uploadedImage(base64object);
    }
  };

  return (
    <>
      <ReactImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        maxFileSize={5000000}
        dataURLKey="data_url"
        acceptType={["jpg", "png", "jpeg"]}
      >
        {({ imageList, onImageUpload, onImageRemove, dragProps, errors }) => (
          <>
            <Button
              variant="contained"
              onClick={onImageUpload}
              {...dragProps}
              sx={{
                mt: 1,
                mr: 1,
                mb: 1,
                bgcolor: "secondary.main",
                color: "white",
              }}
            >
              Nahrát fotku
            </Button>
            {errors ? (<div>
      {errors?.maxNumber && <Typography
            sx={{ pt: 6, fontWeight: "bold" }}
            variant="h5"
            align="left"
            color="#e25b5b"
            paragraph
          >
            Vložte prosím pouze 1 fotografii
          </Typography>}
      {errors?.acceptType && <Typography
            sx={{ pt: 6, fontWeight: "bold" }}
            variant="h5"
            align="left"
            color="#e25b5b"
            paragraph
          >
            Tento typ fotografie bohužel nepodporujeme
          </Typography>}
      {errors?.maxFileSize && <Typography
            sx={{ pt: 6, fontWeight: "bold" }}
            variant="h5"
            align="left"
            color="#e25b5b"
            paragraph
          >
            Vložená fotka je příliš velká. Prosím nahrajte nějakou jinou.
          </Typography>}
    </div>) : null}
            {imageList.map((image, index) =>
              ({ selectedImage } ? (
                <div key={index}>
                  <img
                    width={300}
                    id="input-image"
                    alt=""
                    src={selectedImage}
                  /> 
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
                </div>
              ) : null)
            )}
          </>
        )}
      </ReactImageUploading>
    </>
  );
}

export default UploadPicture;
