import { UploadedFile } from "../interfaces/UploadFile.interface";

export const saveFile = async (file: UploadedFile) => {
  // Aquí guardarías la ruta del archivo en la base de datos.
  console.log("File saved: " + file.path);
};
