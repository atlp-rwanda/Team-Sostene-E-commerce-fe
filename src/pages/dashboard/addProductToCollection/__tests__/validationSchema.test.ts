import { validationSchema } from '../validationSchema';

describe('Validation Schema', () => {
  it('validates a valid form', async () => {
    const validForm = {
      productName: 'Example Product',
      productPrice: 10,
      quantity: 5,
      expDate: '2023-12-31',
      category: 'Example Category',
      bonus: 2,
      description:
        'Lorem ipsum dolor sit amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet ',
      image: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'],
    };
    const isValid = await validationSchema.isValid(validForm);

    expect(isValid).toBe(true);
  });

  it('validates an invalid form with missing required fields', async () => {
    const invalidForm = {
      productName: '',
      productPrice: null,
      quantity: undefined,
      expDate: '',
      category: '',
      bonus: NaN,
      description: '',
      image: [],
    };

    const errors = await validationSchema
      .validate(invalidForm, { abortEarly: false })
      .catch((err: any) => err.inner);

    expect(errors).toHaveLength(10);
    expect(errors[0].path).toBe('productName');
    expect(errors[1].path).toBe('productName');
    expect(errors[2].path).toBe('productPrice');
    expect(errors[3].path).toBe('quantity');
    expect(errors[4].path).toBe('expDate');
    expect(errors[5].path).toBe('category');
    expect(errors[6].path).toBe('bonus');
    expect(errors[7].path).toBe('description');
  });
});
