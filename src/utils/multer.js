import multer from "multer";
import fs from 'fs';
import { nanoid } from "nanoid";
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const fileValidation = {
    image:['image/jpeg','image/png','image/gif'],
    file:['application/pdf','application/msword']
}
export function fileUpload(customPath = 'general',customValidation =[]){

    const fullPath = path.join(__dirname,`../uploads/${customPath}`)
    if(!fs.existsSync(fullPath)){
        fs.mkdirSync(fullPath,{recursive:true});
    }
    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null, fullPath)
        },
        filename:(req,file,cb)=>{
            console.log({file});
            const suffixName = nanoid()+'-'+file.originalname
            file.dest = `uploads/${customPath}/${suffixName}`
            cb(null,suffixName);
        }
    })

    function fileFilter (req,file,cb){
        if(customValidation.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb('In-valid format',false)
        }
    }
    const upload = multer({dest:'uploads',fileFilter,storage});
    return upload;
}












