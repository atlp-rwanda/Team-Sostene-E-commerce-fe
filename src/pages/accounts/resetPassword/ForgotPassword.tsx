import * as yup from 'yup';
import { forgot_password } from '../../../utils/constants';
import { Button, ErrorBox, InputWithLabel } from '../../../components/reusables/Reusable';
import { useFormik } from 'formik';
import { useForgotPassword } from './hooks';
import { toast, ToastContainer } from 'react-toastify';

interface FormValues {
  email: string;
}

export default function ForgotPassword() {
  const { isSent, handleSubmit } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required('Email is required')
        .email('Invalid email address')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address'),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values: FormValues) => {
      handleSubmit(values);
    },
  });

  if (isSent.error !== '') {
    toast.error(isSent.error);
  }

  return (
    <div className="container__box_reset_p">
      <div className="container__box__text">
        <h2 className="text-2xl text-center font-bold sm:text-sm text-black">
          {forgot_password.title}
        </h2>
        <p className="py-4">{forgot_password.text}</p>
      </div>
      <form id="form" onSubmit={formik.handleSubmit}>
        <InputWithLabel
          type="text"
          label="Email"
          name="email"
          id="email"
          textId="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email && <ErrorBox message={formik.errors.email} />}
        <Button text={isSent.loading ? 'Sending ...' : 'Send Link'} size="full" />
      </form>
      <ToastContainer />
    </div>
  );
}
