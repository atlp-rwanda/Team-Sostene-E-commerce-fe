import { useRef, useState } from 'react';
import { Button } from '../../../components/reusables/Reusable';
import { InputWithLabel } from '../../../components/reusables/Reusable';
import { handler } from './hooks/hooks';
import styles from './changepass.module.scss';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { validationSchema } from './Schema/validationSchema';
import { toast } from 'react-toastify';

const Changepassword = () => {
  const [isPending, setisPending] = useState(false);
  const errorDiv = useRef<HTMLDivElement | null>(null);
  const signupDiv = useRef<HTMLFormElement | null>(null);
  const successDiv = useRef<HTMLDivElement | null>(null);

  const toggleFormClass = () => {
    signupDiv.current?.classList.toggle(`${styles['hide-form-password']}`);
    successDiv.current?.classList.toggle(`${styles['hide-form-password']}`);
  };

  const formik = useFormik({
    initialValues: {
      oldPass: '',
      newPassword: '',
      confirmPass: '',
    },
    validationSchema,
    onSubmit: (values: { oldPass: string; newPassword: string; confirmPass: string }) => {
      handle(values);
    },
  });

  async function handle(values: { oldPass: string; newPassword: string; confirmPass: string }) {
    setisPending(true);
    const body = {
      oldPassword: values.oldPass,
      newPassword: values.newPassword,
    };
    try {
      await handler(`${import.meta.env.VITE_BACKEND_URL}users/change-password`, body);
      setisPending(false);
      toggleFormClass();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
      // errorDiv.current!.textContent = error.response.data.message;
      setisPending(false);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFieldChange = (e: any) => {
    formik.handleChange(e);
    formik.setFieldTouched(e.target.name, true, false);
  };

  return (
    <div className={styles.cardStyle}>
      <div className={`${styles.success} ${styles['hide-form-password']}`} ref={successDiv}>
        <p>PASSWORD CHANGED SUCCESSFULLY</p>
        <Link to="/"> Go back to home</Link>
      </div>
      <form name="signupForm" id={styles.signupForm} onSubmit={formik.handleSubmit} ref={signupDiv}>
        <h2 className={styles.formTitle}>Change Password</h2>
        <p>Enter your new password below</p>
        <div className={styles.inputDiv}>
          <InputWithLabel
            type="password"
            label="OLD PASSWORD"
            name="oldPass"
            id="oldpassword"
            textId="oldpassword"
            value={formik.values.oldPass}
            onChange={handleFieldChange}
          />
          {formik.touched.oldPass && formik.errors.oldPass && (
            <div className={styles.text_error} data-testid="div1" ref={errorDiv}>
              {formik.errors.oldPass}
            </div>
          )}
          <InputWithLabel
            type="password"
            label="NEW PASSWORD"
            name="newPassword"
            id="newpassword"
            textId="newpassword"
            value={formik.values.newPassword}
            onChange={handleFieldChange}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className={styles.text_error} data-testid="div2">
              {formik.errors.newPassword}
            </div>
          )}
          <InputWithLabel
            type="password"
            label="CONFIRM PASSWORD"
            name="confirmPass"
            id="confirmPassword"
            textId="confirmpassword"
            value={formik.values.confirmPass}
            onChange={handleFieldChange}
          />
          {formik.touched.confirmPass && formik.errors.confirmPass && (
            <div className={styles.text_error} data-testid="div3">
              {formik.errors.confirmPass}
            </div>
          )}
        </div>

        <div className={styles.buttonWrapper}>
          <Button size="full" type="submit" loading_state={isPending} text={'CHANGE PASSWORD'} />
        </div>
      </form>
    </div>
  );
};

export default Changepassword;
