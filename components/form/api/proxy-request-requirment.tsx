import { validateYupSchema } from "formik";
import { IValues } from "../vertical-stepper";

export interface IRequirmentResponse {
  data: {
    created: string;
    fields: {};
    id: string;
    modified: string;
    ver: number;
  };
}

export interface IImage {
  filename: string;
  mimetype: string;
  filedata: string;
}

// get type of mime
function base64MimeType(encoded: string): string {
  let result: string = "";

  if (typeof encoded !== "string") {
    return result;
  }

  const mime: RegExpMatchArray | null = encoded.match(
    /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
  );

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}

function base64ImageType(encoded: string): string {
  let result: string = "";

  if (typeof encoded !== "string") {
    return result;
  }

  const mime: RegExpMatchArray | null = encoded.match(
    /image\/([a-zA-Z0-9-.+]+).*,.*/
  );

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}

// return the photo to upload in API format or null
function isUploadedPhoto(values: IValues): [IImage] | null {
  // if image was uploaded
  if (values.image) {
    console.log({
      filename: "fotka." + base64ImageType(values.image),
      mimetype: base64MimeType(values.image),
      filedata: values.image,
    });
    return [
      {
        filename: "fotka." + base64ImageType(values.image),
        mimetype: base64MimeType(values.image),
        filedata: values.image,
      },
    ];
  } else {
    return null;
  }
}

async function ApiRequestRequirment(values: IValues, idSenior: string) {
  const currentDate = new Date();

  try {
    const response = await fetch("/api/tabidoo-requirment", {
      method: "POST",
      body: JSON.stringify({
        fields: {
          popis: values.requirmentName,
          podrobnosti: values.description,
          datumVytvoreni: currentDate,
          fotka: isUploadedPhoto(values),
          iDSeniora: {
            id: idSenior,
          },
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonObject: IRequirmentResponse = await response.json(); //extract JSON from the http response

    // return id of senior object
    return jsonObject.data.id;
  } catch (error) {
    console.log("There was an error ", error);
    return Promise.reject(error);
  }
}

export default ApiRequestRequirment;
