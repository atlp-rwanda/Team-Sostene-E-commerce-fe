import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetchProduct from '../../hooks/updateProduct';

interface productDetails {
  productImages: { url: string }[];
  id: string;
  category: string;
  price: number;
  bonus: number;
  collectionId: string;
  createdAt: string;
  expDate: string;
  expiredflag: boolean;
  name: string;
  quantity: number;
  description: string;
}
function UpdateProduct() {
  const location = useLocation();
  const queryParameter = new URLSearchParams(location.search);
  const id = queryParameter.get('pid') || '';
  const { loading, data, error } = useFetchProduct(id);

  useEffect(() => {
    if (!loading) {
      console.log(data);
    }
  }, [loading]);

  const [formData, setFormData] = useState<productDetails>({
    name: '',
    productImages: [{ url: '' }], // Update the initial state declaration
    id: '',
    category: '',
    price: 0,
    bonus: 0,
    collectionId: '',
    createdAt: '',
    expDate: '',
    expiredflag: false,
    quantity: 0,
    description: '',
  });
  // eslint-disable-next-line no-console
  // console.log(formData, 'hynsns');

  useEffect(() => {
    if (loading) {
      console.log('loading');
    } else if (error) {
      console.log(error);
    } else if (!loading) {
      setFormData(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: data?.data.name,
        description: data?.data.description,
        price: data?.data.price,
        category: data?.data.category,
        expDate: data?.data.expDate,
        bonus: data?.data.bonus,
        quantity: data?.data.quantity,
        productImages: data?.data.productImages,
      }));
    }
  }, [loading, data, error]);
  // eslint-disable-next-line no-console
  console.log(data);

  const handleName = (e: any) => {
    setFormData({ ...formData, name: e.target.value });
  };
  const handlePrice = (e: any) => {
    setFormData({ ...formData, price: e.target.value });
  };
  const handleCategory = (e: any) => {
    setFormData({ ...formData, category: e.target.value });
  };
  const handleExpDate = (e: any) => {
    setFormData({ ...formData, expDate: e.target.value });
  };
  const handlebonus = (e: any) => {
    setFormData({ ...formData, bonus: e.target.value });
  };
  const handleQuantity = (e: any) => {
    setFormData({ ...formData, quantity: e.target.value });
  };
  const handleImage = (e: any) => {
    setFormData({ ...formData, productImages: e.target.value });
  };

  return (
    <>
      {!loading && (
        <div className="bg-translucent border-4 rounded-lg shadow relative m-10">
          <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold">Edit products</h3>
            <button
              type="button"
              className="text--400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="product-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-6">
            <form action="#">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="product-name"
                    id="product-name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Apple Imac 27”"
                    value={formData.name}
                    onChange={handleName}
                    data-testid="productname"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">
                    Product Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="shadow-sm bg-orange-50  border-gray-300 border-b-2 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="$2300"
                    value={formData.price || ''}
                    data-testid="productprice"
                    onChange={handlePrice}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">Category</label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Apple"
                    value={formData.category || ''}
                    data-testid="category"
                    onChange={handleCategory}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">
                    Expired Date
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Electronics"
                    value={formData.expDate || ''}
                    data-testid="expired-date"
                    onChange={handleExpDate}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="p-6 space-y-6">
            <form action="#">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">Bonus</label>
                  <input
                    type="text"
                    name="product-name"
                    id="product-name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Apple Imac 27”"
                    value={formData.bonus || ''}
                    data-testid="bonus"
                    onChange={handlebonus}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">Quantity</label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Electronics"
                    value={formData.quantity || ''}
                    data-testid="quantity"
                    onChange={handleQuantity}
                  />
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="product-details"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="product-details"
                    // rows="6"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                    placeholder="Details"
                    value={formData.description || ''}
                    name="description"
                    onChange={handleQuantity}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
          <div
            className="w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6"
            id="dropzone"
          >
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 z-50" />
            <div className="text-center">
              <img
                className="mx-auto h-12 w-12"
                src="https://www.svgrepo.com/show/357902/image-upload.svg"
                alt=""
              />

              <h3 className="mt-2 text-sm font-medium text-gray-900">
                <label className="relative cursor-pointer">
                  <span>Drag and drop</span>
                  <span className="text-indigo-600"> or browse</span>
                  <span>to upload</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleImage}
                  />
                </label>
              </h3>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>

            <img src="" className="mt-4 mx-auto max-h-40 hidden" id="preview" />
          </div>

          <div className="p-6 border-t border-gray-200 rounded-b">
            <button
              className="text-black bg-orange-600 hover:bg-cyan-700 border  focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Save all
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default UpdateProduct;
