import { IValues } from "../helpers/constants";

interface IRequirmentResponse {
  data: {
    created: string;
    fields: {};
    id: string;
    modified: string;
    ver: number;
  };
}

interface IImage {
  filename: string;
  mimetype: string;
  filedata: string;
}

// get mime type of base64
function base64MimeType(encoded: string): string {
  let result: string = "";

  if (typeof encoded !== "string") {
    return result;
  }

  const mime: RegExpMatchArray | null = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}

// get image type of base64
function base64ImageType(encoded: string): string {
  let result: string = "";

  if (typeof encoded !== "string") {
    return result;
  }

  const mime: RegExpMatchArray | null = encoded.match(/image\/([a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }

  return result;
}

function placesOfHelp(props: IValues) {
  const places = [];
  if (props.libraryCheckbox) {
    places.push("V knihovně");
  }
  if (props.homeCheckbox) {
    places.push("U mě doma");
  }
  if (props.publicPlaceCheckbox) {
    places.push("Jinde");
  }
  if (props.virtualCheckbox) {
    places.push("Na dálku");
  }
  return places;
}

// return the photo to upload in API format or null
function isUploadedPhoto(values: IValues): [IImage] | null {
  // if image was uploaded
  if (values.image) {
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
    const response = await fetch("/api/formtest/requirment", {
      method: "POST",
      body: JSON.stringify({
        fields: {
          popis: values.requirmentName,
          podrobnosti: values.description,
          datumVytvoreni: currentDate,
          pozadovaneMistoPomoci: placesOfHelp(values),
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

    const jsonObject: IRequirmentResponse = await response.json();

    return jsonObject.data.id;
  } catch (error) {
    console.log("There was an error ", error);
    return Promise.reject(error);
  }
}

export default ApiRequestRequirment;
