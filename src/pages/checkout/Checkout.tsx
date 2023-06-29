/* eslint-disable react-hooks/exhaustive-deps */
import {
  InputWithLabel,
  ErrorBox,
  Button,
  SpinnerLoading,
  EmptyCart,
} from '../../components/reusables/Reusable';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useCheckout } from './hooks';
import { useGetCart } from '../../pages/viewCart/redux/hooks';
import { isLoggedIn } from '../../helpers/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface checkoutDetails {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  streetAddress: string;
  country: string;
  city: string;
  postalCode: string;
}

export default function Checkout() {
  const { result, handleGetCart } = useGetCart();
  const { isSuccess, handleSubmit } = useCheckout();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCart();
  }, []);
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      streetAddress: '',
      country: '',
      city: '',
      postalCode: '',
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Invalid email address')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address')
        .required('Email is required'),
      phoneNumber: yup.string().required('Phone number is required'),
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      country: yup.string().required('Country is required'),
      city: yup.string().required('City is required'),
      postalCode: yup.string().required('Postal code is required'),
      streetAddress: yup.string().required('Street address is required'),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values: checkoutDetails) => {
      handleSubmit(values);
    },
  });

  if (result.error != '') {
    toast(result.error);
  }
  if (isSuccess.error) {
    toast(isSuccess.error);
  }

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/accounts/login');
    }
  }, [navigate]);

  return (
    <>
      {isLoggedIn() && (
        <div className=" flex justify-center items-center pt-16 sm:pt-6 phone:pt-10">
          {result.data.products.length === 0 && !result.loading ? (
            <div className="h-[75vh] mt-6">
              <EmptyCart />
            </div>
          ) : (
            <div className="w-[90vw] flex justify-center flex-row desktop:flex-row laptop:flex-row tablet:flex-col-reverse phone:flex-col-reverse sm:flex-col-reverse md:flex-row">
              <div className="w-[55%] p-6 pr-10 desktop:w-[55%] laptop:w-[55%] tablet:w-[55%] phone:w-full sm:w-full">
                <form id="form" onSubmit={formik.handleSubmit} className="w-full">
                  <h2 className="font-bold pb-8 text-left">Contact Information</h2>
                  <div>
                    <InputWithLabel
                      textId="email-address"
                      label="Email address"
                      name="email"
                      id="email"
                      type="string"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <ErrorBox message={formik.errors.email} />
                    )}
                  </div>

                  <div>
                    <InputWithLabel
                      textId="phone"
                      label="Phone number"
                      name="phoneNumber"
                      id="phoneNumber"
                      type="string"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                      <ErrorBox message={formik.errors.phoneNumber} />
                    )}
                  </div>
                  <hr className="border-t border-[#c7c7c7] mt-8" />
                  <div className=" pt-8 w-full">
                    <h2 className="font-bold pb-8 text-left">Shipping Information</h2>
                    <div className="flex gap-x-10 mb-3 flex-row desktop:flex-row laptop:flex-row tablet:flex-col phone:flex-col sm:flex-col md:flex-row">
                      <div className="w-1/2">
                        <InputWithLabel
                          textId="first-name"
                          label="First name"
                          name="firstName"
                          id="firstName"
                          type="string"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.firstName && formik.errors.firstName && (
                          <ErrorBox message={formik.errors.firstName} />
                        )}
                      </div>
                      <div className="w-1/2">
                        <InputWithLabel
                          textId="last-name"
                          label="Last name"
                          name="lastName"
                          id="lastName"
                          type="string"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                          <ErrorBox message={formik.errors.lastName} />
                        )}
                      </div>
                    </div>
                    <div className="flex gap-x-10 mb-3 flex-row desktop:flex-row laptop:flex-row tablet:flex-col phone:flex-col sm:flex-col md:flex-row">
                      <div className="w-1/2">
                        <InputWithLabel
                          textId="country"
                          label="Country"
                          name="country"
                          id="country"
                          type="string"
                          value={formik.values.country}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.country && formik.errors.country && (
                          <ErrorBox message={formik.errors.country} />
                        )}
                      </div>
                      <div className="w-1/2">
                        <InputWithLabel
                          textId="city"
                          label="City"
                          name="city"
                          id="city"
                          type="string"
                          value={formik.values.city}
                          onChange={formik.handleChange}
                        />
                        {formik.touched.city && formik.errors.city && (
                          <ErrorBox message={formik.errors.city} />
                        )}
                      </div>
                    </div>
                    <InputWithLabel
                      textId="street-address"
                      label="Street address"
                      name="streetAddress"
                      id="streetAddress"
                      type="string"
                      value={formik.values.streetAddress}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.streetAddress && formik.errors.streetAddress && (
                      <ErrorBox message={formik.errors.streetAddress} />
                    )}
                    <InputWithLabel
                      textId="postal-code"
                      label="Postal Code"
                      name="postalCode"
                      id="postalCode"
                      type="string"
                      value={formik.values.postalCode}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.postalCode && formik.errors.postalCode && (
                      <ErrorBox message={formik.errors.postalCode} />
                    )}
                  </div>
                  <Button
                    text={isSuccess.loading ? 'Placing Order' : 'Confirm order'}
                    size="full"
                    type="submit"
                  />
                </form>
              </div>
              <div className="w-[45%] p-6 pl-4 flex flex-col phone:w-full desktop:w-[45%] laptop:w-[45%] tablet:w-[45%] sm:w-full">
                <h2 className="font-bold pb-4 text-left">Order summary</h2>
                <div className="pb-4 overflow-scroll h-[150px] mt-0">
                  {result.loading && <SpinnerLoading />}
                  {result.data.products.map((item, index) => (
                    <div
                      className="flex flex-row justify-between pb-4 pt-3 border-b border-gray-200 h-[150px]"
                      key={index}
                    >
                      <div className="flex flex-row gap-4 ">
                        <img
                          src={item.product.image}
                          alt="product image"
                          className="w-20 rounded-sm border-translucent border"
                        />
                        <div className="flex flex-col justify-between">
                          <p className="font-bold text-sm">{item.product.name}</p>
                          <div>
                            <p className="text-sm">Quantity</p>
                            <p className="text-sm">{item.quantity}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between">
                        <p className="font-semibold text-sm">${item.product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-b border-gray-200 mt-12">
                  <dl className=" py-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">${result.data.total}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900">$0</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Taxes</dt>
                      <dd className="text-sm font-medium text-gray-900">$0</dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                      <dt className="text-base font-medium">Total</dt>
                      <dd className="text-base font-medium text-gray-900">${result.data.total}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
