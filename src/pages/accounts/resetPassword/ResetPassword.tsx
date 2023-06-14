import * as yup from 'yup';
import { reset_password } from '../../../utils/constants';
import { Button, ErrorBox, InputWithLabel } from '../../../components/reusables/Reusable';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useResetPassword } from './hooks';

interface FormValues {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const { token } = useParams<string>();
  const { isReset, handleSubmit } = useResetPassword();

  const validationSchema = yup.object({
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/,
        'Must be at least 8 characters, containing a capital letter, a number and a symbol'
      ),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], "Passwords don't match"),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values: FormValues) => {
      handleSubmit({ password: values.password }, token || '');
    },
  });

  return (
    <div className="container__box_reset_p">
      <div className="container__box__text">
        <h2 className="text-2xl text-center font-bold sm:text-sm text-black">
          {reset_password.title}
        </h2>
        <p className="py-4">{reset_password.text}</p>
      </div>
      <form id="form" onSubmit={formik.handleSubmit}>
        <InputWithLabel
          type="password"
          label="New Password"
          name="password"
          id="password"
          textId="newpassword"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password && (
          <ErrorBox message={formik.errors.password} />
        )}
        <InputWithLabel
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          id="confirmPassword"
          textId="confirmpassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <ErrorBox message={formik.errors.confirmPassword} />
        )}
        <div className="btn-container">
          <Button text={isReset.loading ? 'Resetting ...' : 'Change Password'} size="full" />
        </div>
      </form>
    </div>
  );
}
