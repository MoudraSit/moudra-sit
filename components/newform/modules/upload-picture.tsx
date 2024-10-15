import { Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import ReactImageUploading, { ImageType } from "react-images-uploading";

/**
 * Function converts base64 image format to a new blob file
 *
 * function dataURLtoFile(dataurl: any, filename: string) is taken from GitHub Gist
 *
 * Title: file upload from dataUrl with axios
 * Author: Isaac Young - https://gist.github.com/ibreathebsb
 * Available: https://gist.github.com/ibreathebsb/a104a9297d5df4c8ae944a4ed149bcf1#file-upload-js
 * */
function dataURLtoFile(dataurl: any, filename: string) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

/**
 * Function resize an input image and create new image with canvas
 *
 * function resizeImage(base64Str: string, maxWidth, maxHeight) is taken from GitHub Gist
 *
 * Title: resizing an image on the front-end before sending to a server
 * Author: Alexander Mills - https://gist.github.com/ORESoftware
 * Available: https://gist.github.com/ORESoftware/ba5d03f3e1826dc15d5ad2bcec37f7bf
 * */
function resizeImage(base64Str: string, maxWidth = 500, maxHeight = 500) {
  return new Promise<string>((resolve) => {
    //create new image file based on base64 image
    let img = new (window as any).Image();
    img.src = base64Str;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = maxWidth;
      const MAX_HEIGHT = maxHeight;
      let width = img.width;
      let height = img.height;

      // change size of an new image
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      // set props to a canva
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      // draw image on the created canva
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL());
    };
  });
}

function UploadPicture({ uploadedImage }: ImageType) {
  const [images, setImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [maxSizeOverflow, setMaxSizeOverflow] = useState(false);
  const maxNumber = 1;

  // upload image handler
  const onChange = (imageList: any, addUpdateIndex: any) => {
    setImages(imageList);

    // image was upload
    if (imageList[0]) {
      // get base64 string
      const base64object: string = imageList[0].data_url;

      // get type of image
      const typeOfImage: string =
        "image." +
        base64object.substring(base64object.indexOf("/") + 1, base64object.lastIndexOf(";"));

      // create new URL for a file
      const newUrl = URL.createObjectURL(dataURLtoFile(imageList[0].data_url, typeOfImage));

      // set image as selected
      setSelectedImage(newUrl);

      // resize uploaded file to be smaller and able to send with API
      resizeImage(base64object).then((result: string) => {
        // set image to a form
        uploadedImage(result);

        const img: string = result;
        const buffer = Buffer.from(img.substring(img.indexOf(",") + 1));

        // if image has more than 1MB show text
        if (buffer.length / 1e6 > 1) {
          setMaxSizeOverflow(true);
        }
      });
    }
  };

  return (
    <>
      <ReactImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        maxFileSize={10000000}
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
                bgcolor: "#C5C5C6 !important",
                color: "#3e3e3e",
                letterSpacing: 0.5,
                fontSize: 20,
              }}
            >
              Nahrát fotku
            </Button>
            {errors ? (
              <div>
                {errors?.maxNumber && (
                  <Typography
                    sx={{ pt: 6, fontWeight: "bold" }}
                    variant="h5"
                    align="left"
                    color="#D3215D"
                  >
                    Vložte prosím pouze 1 fotografii
                  </Typography>
                )}
                {errors?.acceptType && (
                  <Typography
                    sx={{ pt: 6, fontWeight: "bold" }}
                    variant="h5"
                    align="left"
                    color="#D3215D"
                  >
                    Tento typ fotografie bohužel nepodporujeme
                  </Typography>
                )}
                {errors?.maxFileSize && (
                  <Typography
                    sx={{ pt: 6, fontWeight: "bold" }}
                    variant="h5"
                    align="left"
                    color="#D3215D"
                  >
                    Vložená fotka je příliš velká. Prosím nahrajte nějakou jinou.
                  </Typography>
                )}
              </div>
            ) : null}
            {imageList.map((image, index) =>
              ({ selectedImage } ? (
                <div key={index}>
                  <Image
                    width={0}
                    height={0}
                    sizes="50vw"
                    style={{ width: "50%", height: "auto" }}
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
                        bgcolor: "#D3215D !important",
                        color: "white",
                        letterSpacing: 0.5,
                        fontSize: 20,
                      }}
                      onClick={() => (onImageRemove(index), setMaxSizeOverflow(false))}
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
      {maxSizeOverflow ? (
        <Typography sx={{ pt: 6, fontWeight: "bold" }} variant="h5" align="left" color="#D3215D">
          Vložená fotka je příliš velká. Prosím nahrajte nějakou jinou.
        </Typography>
      ) : null}
    </>
  );
}

export default UploadPicture;
