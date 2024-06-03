import joi from "joi";
import { Types } from "mongoose";

const dataMethods = ["body", "query", "params"];

const validateObjectId = (value, helper) => {
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("In-valid objectId");
};
export const generalFields = {
  id: joi.string().custom(validateObjectId),
  str: joi.string().min(2),
  num: joi.number(),
  email: joi.string().email({
    minDomainSegments: 2,
    maxDomainSegments: 4,
    tlds: { allow: ["com", "net"] },
  }),
  password:
    joi.string() /*.pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))*/,
  confirmPassword: joi.string(),
  age: joi.number().min(15).max(70),
  phone: joi.string().min(11).max(11),
  image: joi.string().custom(validateObjectId),
  //-------------------------book fields---------------------------------------
  // title:joi.string().min(2).max(500),
  // caption:joi.string().min(2).max(500),
  // file:joi.object(),
  bol: joi.bool(),
  phoneNumber: joi.number(),
};

export const validation = (schema) => {
  return (req, res, next) => {
    const inputs = { ...req.body, ...req.query, ...req.params };
    console.log(inputs, "in validate");
    // if(req.headers?.authorization){inputs.authorization = req.headers.authorization}
    if (req.file || req.files) {
      inputs.file = req.file || req.files;
    }
    const validationResult = schema.validate(inputs, { abortEarly: false });
    console.log(validationResult.error, "befor error validation");
    if (validationResult.error)
      return res.status(400).json({
        message: "Validation error",
        validationResult: validationResult.error.details,
      });
    console.log("done validation");
    return next();
  };
};

// export const validation =(schema)=>{
//     return (req, res,next) => {
//         const validationErr = []

//         dataMethods.forEach(key => {
//             if(schema[key]){
//                 const validationResult = schema[key].validate(req[key],{abortEarly:false});
//                 if(validationResult.error)validationErr.push(validationResult.error.details);
//             }
//         });
//         if(validationErr.length > 0)return res.json({message:'validation Error',validationErr});
//         return next();
//     }
// };
