import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required('Card number is required')
    .matches(/^[0-9]{16}$/, 'Card number must be a 16-digit number'),
  expMonth: Yup.number()
    .required('Expiration month is required')
    .min(1, 'Invalid month')
    .max(12, 'Invalid month'),
  expYear: Yup.number()
    .required('Expiration year is required')
    .min(new Date().getFullYear(), 'Expiration year is in the past')
    .test('futureMonth', 'The selected month is in the past', function () {
      const { expYear, expMonth } = this.parent;
      const currentYear = new Date().getFullYear();
      const PresentMonth = new Date().getMonth() + 1;
      if (expYear === currentYear && expMonth < PresentMonth) {
        throw new Yup.ValidationError('The selected month is in the past', null, 'expMonth');
      }
      return true;
    }),
  cvc: Yup.string()
    .required('CVC is required')
    .matches(/^[0-9]{3,4}$/, 'CVC must be a 3 or 4-digit number'),
});
