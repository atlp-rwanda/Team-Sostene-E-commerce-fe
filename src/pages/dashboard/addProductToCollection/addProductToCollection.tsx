import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './addProductToCollection.module.scss';
import { validationSchema } from './validationSchema';
import { Formik } from 'formik';
import { ImageInterf, initialStateProducts, setProduct } from './addProduct.slice';
import UploadMultiple from '../uploadMultiple/uploadMultiple';
import { useDispatch } from 'react-redux';
import { usePostProductToDB } from '../../../hooks/useAddProductToDb';
import { toast } from 'react-toastify';

export default function AddProductToCollection() {
  const { cid, cname } = useParams();
  const dispatch = useDispatch();
  const [showMessages, setShowMessages] = useState(false);
  const [images, setImages] = useState<ImageInterf[] | []>([]);
  const { handleAddToDB, isLoading, data, error } = usePostProductToDB();

  useEffect(() => {
    if (data) {
      setShowMessages(true);
      setTimeout(() => {
        setShowMessages(false);
      }, 3000);
    }
    !showMessages && data && toast.success('Product has been added successfully');
  }, [isLoading]);

  return (
    <div className={styles.addProduct}>
      <div className="title">
        Add a product to <span className="collectionName">{cname}</span>
      </div>
      {error && toast.error(error.message)}
      <Formik
        initialValues={initialStateProducts.product}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(setProduct(values));
          handleAddToDB(cid!, values);
          setImages([]);
          resetForm();
        }}
      >
        {(formik) => {
          return (
            <form action="POST" onSubmit={formik.handleSubmit} autoComplete="off" className="form">
              {isLoading && (
                <div className="loadingSpinner" role="loadingSpinner">
                  <p className="w-full flex items-center p-2 text-center justify-center">
                    <i className="fa fa-circle-o-notch fa-spin text-orange" aria-hidden="true"></i>
                  </p>
                </div>
              )}
              <div className=" wrapper wrapper1">
                <div className="left_two">
                  <div className="inputBox">
                    <small className="name">Enter product name</small>
                    <input
                      type="text"
                      placeholder="productName"
                      name="productName"
                      id="productName"
                      role="productName"
                      onChange={formik.handleChange}
                      value={formik.values.productName}
                      className="emailTitle"
                    />
                    {formik.touched.productName && formik.errors.productName && (
                      <div className="error">{formik.errors.productName}</div>
                    )}
                  </div>
                  <div className="inputBox">
                    <small className="name">Enter product price</small>
                    <input
                      type="number"
                      placeholder="productPrice"
                      name="productPrice"
                      id="productPrice"
                      role="productPrice"
                      onChange={formik.handleChange}
                      value={formik.values.productPrice}
                      className="emailTitle"
                    />
                    {formik.touched.productPrice && formik.errors.productPrice && (
                      <div className="error">{formik.errors.productPrice}</div>
                    )}
                  </div>
                </div>
                <div className="left_two">
                  <div className="inputBox">
                    <small className="name">Enter product quantity</small>
                    <input
                      type="number"
                      placeholder="quantity"
                      name="quantity"
                      id="quantity"
                      role="quantity"
                      onChange={formik.handleChange}
                      value={formik.values.quantity}
                      className="emailTitle"
                    />
                    {formik.touched.quantity && formik.errors.quantity && (
                      <div className="error">{formik.errors.quantity}</div>
                    )}
                  </div>
                  <div className="inputBox">
                    <small className="name">How much is your product bonus?</small>
                    <input
                      type="number"
                      placeholder="bonus"
                      name="bonus"
                      id="bonus"
                      role="bonus"
                      onChange={formik.handleChange}
                      value={formik.values.bonus}
                      className="emailTitle"
                    />
                    {formik.touched.bonus && formik.errors.bonus && (
                      <div className="error">{formik.errors.bonus}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="wrapper wrapper2">
                <div className="left_two">
                  <div className="inputBox">
                    <small className="name">Product category</small>
                    <input
                      type="text"
                      placeholder="category"
                      name="category"
                      id="category"
                      role="category"
                      onChange={formik.handleChange}
                      value={formik.values.category}
                      className="emailTitle"
                    />
                    {formik.touched.category && formik.errors.category && (
                      <div className="error">{formik.errors.category}</div>
                    )}
                  </div>
                  <div className="inputBox">
                    <small className="name">When will your product expire?</small>
                    <input
                      type="date"
                      placeholder="expDate"
                      name="expDate"
                      id="expDate"
                      role="expDate"
                      onChange={formik.handleChange}
                      value={`${formik.values.expDate}`}
                      className="emailTitle"
                    />
                    {formik.touched.expDate && formik.errors.expDate && (
                      <div className="error">{formik.errors.expDate as string}</div>
                    )}
                  </div>
                </div>
                <div className="inputBox area">
                  <small className="name">Describe your product in more that 50 words</small>
                  <textarea
                    rows={3}
                    placeholder="description"
                    name="description"
                    id="description"
                    role="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    className="textArea"
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="error">{formik.errors.description}</div>
                  )}
                </div>
              </div>
              <div className=" wrapper wrapper3">
                {formik.touched.image && formik.errors.image && (
                  <div className="error">{formik.errors.image as string}</div>
                )}
                <UploadMultiple images={images} setImages={setImages} formik={formik} />
              </div>
              <div className="action">
                <button type="button" className="submitBtn viewBtn py-3 px-4 rounded">
                  <Link to={`/sellerItems?cid=${cid}&cname=${cname}`}>View Collection</Link>
                </button>
                <button type="submit" className="submitBtn py-3 px-4 rounded">
                  Submit
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
