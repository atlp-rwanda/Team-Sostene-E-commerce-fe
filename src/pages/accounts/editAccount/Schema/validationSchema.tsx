import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  oldPass: Yup.string()
    .required('Old Password is required !!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/,
      'Password not strong (use 8 characters including capital cases and signs)'
    ),
  newPassword: Yup.string()
    .required('New Password is required !!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/,
      'Password not strong (use 8 characters including capital cases and signs)'
    ),
  confirmPass: Yup.string()
    .required('Please enter confirm password')
    .oneOf([Yup.ref('newPassword')], 'Check your Confirm password')
    .test(
      'password-match',
      'New password cannot be the same as the old password',
      function (value) {
        return value !== this.resolve(Yup.ref('oldPass'));
      }
    ),
});
