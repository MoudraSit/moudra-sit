import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  options.uploadDir = path.join(process.cwd(), "/public/upload");
  options.filename = (name, ext, path, form) => {
    return Date.now().toString() + "_" + path.originalFilename;
  };
  options.maxFileSize = 4000 * 1024 * 1024;

  console.log("cajk");

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      console.log(files);
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  console.log("Executing /api/upload handler.");

  if (request.method !== "POST") {
    response.status(400).send("Use POST method");
    return;
  }

  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/upload"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/upload"));
  }
  await readFile(request);
  response.json({ done: "ok" });
}

export default handler;
