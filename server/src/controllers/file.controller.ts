import { saveFile } from "../services/file.service";
import { Request, Response } from "express";

export const uploadFile = async (req: Request, res: Response) => {
  console.log('subiendo archivo..')
  try {
    if (!req.file) {
      return res
        .status(400)
        .send({ error: "No file attached with the request" });
    }

    const file = req.file;
    await saveFile(file); // Aquí guardas la ruta del archivo en la base de datos.
    res.status(200).send({ message: "File uploaded successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while uploading the file" });
  }
};
