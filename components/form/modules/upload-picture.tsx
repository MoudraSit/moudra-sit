import { Button, Grid, ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import ReactImageUploading, { ImageType } from "react-images-uploading";

// TODO: fix any for imageList, addUpdateIndex
// TODO: fix size uploaded pictures
// Sources: https://codesandbox.io/s/react-images-uploading-demo-u0khz?file=/src/index.js:158-1697
// https://www.npmjs.com/package/react-images-uploading?activeTab=readme

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

function UploadPicture({ uploadedImage }: ImageType) {
  const [images, setImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const maxNumber = 1;

  const onChange = (imageList: any, addUpdateIndex: any) => {
    setImages(imageList);

    if (imageList[0]) {
      let stringObject: string = imageList[0].data_url;
      let typeOfImage: string =
        "image." +
        stringObject.substring(
          stringObject.indexOf("/") + 1,
          stringObject.lastIndexOf(";")
        );
      let newFile = dataURLtoFile(imageList[0].data_url, typeOfImage);
      let newUrl = URL.createObjectURL(newFile);

      console.log(newFile);

      setSelectedImage(newUrl);
      setSelectedFile(newFile);
      uploadedImage(newFile);
    }
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
      {/* <div className="max-w-4xl mx-auto p-20 space-y-6">
        <label>
          <input
            type="file"
            hidden
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files[0];
                setSelectedImage(URL.createObjectURL(file));
                setSelectedFile(file);
              }
            }}
          />
          <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
            {selectedImage ? (
              <img src={selectedImage} alt="" />
            ) : (
              <span>Select Image</span>
            )}
          </div>
        </label>
        <Button
          onClick={handleUpload}
          disabled={uploading}
          style={{ opacity: uploading ? ".5" : "1" }}
          className="bg-red-600 p-3 w-32 text-center rounded text-white"
        >
          {uploading ? "Uploading.." : "Upload"}
        </Button>
      </div> */}
    </>
  );
}

export default UploadPicture;
