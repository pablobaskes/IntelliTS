import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, "./assets/"); // Aquí especificas el destino de los archivos.
  },
  filename: function (req: Request, file, cb) {
    // Reemplaza los dos puntos ":" en el nombre del archivo con guiones "-" 
    const date = new Date().toISOString().replace(/:/g, "-");
    cb(null, date + "_" + file.originalname); // Aquí puedes modificar el nombre de los archivos.
  },
});

const upload = multer({ storage: storage });

export default upload;
