import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  productName: Yup.string().min(3).max(80).required('Product name is required'),
  productPrice: Yup.number().required('Price is required'),
  quantity: Yup.number().required(' Product quantity is required'),
  expDate: Yup.string().required('Valid Date is required'),
  category: Yup.string().required('Category is required'),
  bonus: Yup.number().required('Bonus Is required'),
  description: Yup.string()
    .min(50)
    .required('Product description is to required, with minimun of 50 words'),
  image: Yup.array()
    .min(4, 'Please select at least 4 images')
    .max(8, 'Please select at most 8 images'),
});
