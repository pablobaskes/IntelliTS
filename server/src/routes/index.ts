import { Router } from "express";
import { readdirSync } from "fs";
const PATH = `${__dirname}`;
const router = Router();
const clearFileName = (filename: string) => {
  const file = filename.split(".");
  return `${file[0]}.${file[1]}`;
};
readdirSync(PATH).filter((filename) => {
  const cleanName = clearFileName(filename);
  const cleanRouteName = cleanName.split('.').shift()
  if (cleanRouteName !== "index") {
    import(`./${cleanName}`).then((moduleRoute) => {
      router.use(`/${cleanRouteName}`, moduleRoute.router);
    });
    
  }
});
export { router };
