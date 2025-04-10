  import * as yup from "yup"
  
  // Define validation schema

  export const investmentSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    amount: yup
      .number()
      .typeError("Required")
      .positive("Amount must be greater than 0")
      .required("Required"),
    roi: yup
      .number()
      .typeError("Required")
      .positive("ROI must be greater than 0")
      .required("Required"),
    // document: yup
    //   .mixed()
      // .required("Document is required")
      // .test("fileSize", "File size is too large", (value:any) => {
      //   if (!value) return true; // Skip validation if no file
      //   return value.size <= 5 * 1024 * 1024; // 5MB max
      // })
      // .test("fileType", "Unsupported file format", (value:any) => {
      //   if (!value) return true; // Skip validation if no file
      //   return ["application/pdf", "image/jpeg", "image/png"].includes(value.type);
      // }),
  });