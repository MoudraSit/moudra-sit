import axios from "axios";

async function ApiUploadImage(image: string) {
  const body = new FormData();

  body.append("myImage", image);

  //console.log("posilam na API");
  //console.log(image);

  try {
    const response = await axios.post("/api/upload", body);

    // return id of senior object
    return response;
  } catch (error) {
    console.log("There was an error ", error);
    return Promise.reject(error);
  }
}

export default ApiUploadImage;
