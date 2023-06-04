import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Navigation from '../../../components/navigation/nav';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addProduct } from '../redux/addItemSlice';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

interface ImageFile {
  file: File;
  preview: string | ArrayBuffer | null;
}

interface Collection {
  id: string;
  name: string;
}

const useGetCollection = () => {
  const token = useAppSelector((state) => state.token.value);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    function getCollection(token: string) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}users/collections`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCollections(response.data.data);
        })
        .catch(() => {
          setError('An Unexpected Error. Please Login again');
        });
    }
    getCollection(token || '');
  });

  return { collections, error };
};

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const collectionRef = useRef<HTMLSelectElement>(null);
  const { error, collections } = useGetCollection();
  const isAdded = useAppSelector((state) => state.addProduct);
  const dispatch = useAppDispatch();
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageFile: ImageFile = {
          file,
          preview: reader.result,
        };
        setSelectedImages((prevImages) => [...prevImages, imageFile]);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const elements = formRef.current!.elements;
    const formDataToSend = new FormData();
    formDataToSend.append('productName', (elements.namedItem('name') as HTMLInputElement).value);
    formDataToSend.append('productPrice', (elements.namedItem('price') as HTMLInputElement).value);
    formDataToSend.append('category', (elements.namedItem('category') as HTMLInputElement).value);
    formDataToSend.append('expDate', (elements.namedItem('expDate') as HTMLInputElement).value);
    formDataToSend.append('bonus', (elements.namedItem('bonus') as HTMLInputElement).value);
    formDataToSend.append(
      'description',
      (elements.namedItem('description') as HTMLInputElement).value
    );
    formDataToSend.append('quantity', (elements.namedItem('quantity') as HTMLInputElement).value);
    selectedImages.forEach((imageFile) => {
      formDataToSend.append(`image`, imageFile.file);
    });
    dispatch(
      addProduct({ data: formDataToSend, collectionId: collectionRef.current?.value || '' })
    ).then((response: { meta: { requestStatus: string } }) => {
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success('Product Added.');
        formRef.current?.reset();
        setSelectedImages([]);
      }
      if (response.meta.requestStatus === 'rejected') {
        toast.error(isAdded.error === '' ? 'An Error Occurred. Try Again' : isAdded.error);
      }
    });
  };

  return (
    <div>
      <Navigation />
      <section className="max-w-4xl p-3 mx-auto bg-indigo-600 rounded-md shadow-md  mt-20">
        <h1 className="text-xl font-bold text-orange capitalize dark:text-orange">
          Add Product To Collection
        </h1>
        <ToastContainer />
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 tablet:grid-cols-2">
            <div>
              <label className="text-black ">Product Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md    focus:outline-none"
              />
            </div>

            <div>
              <label className="text-black ">Collection</label>
              {error === '' ? (
                <select
                  name="collection"
                  ref={collectionRef}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray text-white border border-gray-300 rounded-sm   focus:outline-none"
                >
                  {collections.length != 0 ? (
                    collections.map((collection, index) => (
                      <option key={index} value={collection.id}>
                        {collection.name}
                      </option>
                    ))
                  ) : (
                    <option value="">No collections. Please Create a collection</option>
                  )}
                </select>
              ) : (
                <p className="p-4 border-translucent border">{error}</p>
              )}
            </div>

            <div>
              <label className="text-black " htmlFor="username">
                Product Price <i className="text-orange text-sm">(In Dollars)</i>
              </label>
              <input
                type="text"
                name="price"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none"
              />
            </div>

            <div>
              <label className="text-black ">Category</label>
              <select
                name="category"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none"
              >
                <option>Mobile Phones &amp; Tablets</option>
                <option>Computer &amp; Laptops</option>
                <option>Audio &amp; Video</option>
                <option>Gaming</option>
                <option>Mens Fashion</option>
                <option>Females Fashion</option>
                <option>Jewelry &amp; Watches</option>
                <option>Sports Equipment</option>
                <option>Fitness &amp; Exercise</option>
              </select>
            </div>
            <div>
              <label className="text-black ">Expiry Date</label>
              <input
                id="date"
                type="date"
                name="expDate"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none"
              />
            </div>
            <div>
              <label className="text-black " htmlFor="username">
                Product Quantity
              </label>
              <input
                type="number"
                name="quantity"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none"
              />
            </div>
            <div>
              <label className="text-black " htmlFor="username">
                Bonus
              </label>
              <input
                type="number"
                name="bonus"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none"
              />
            </div>
            <div>
              <label className="text-black " htmlFor="username">
                Product Description
              </label>
              <textarea
                name="description"
                id="textarea"
                className="block w-full px-4 h-32 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-tablet font-medium text-white">Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-black"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="items-center text-tablet text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600"
                    >
                      <span className=" bg-orange text-black text-sm p-1 border-sm">
                        Upload an Image
                      </span>
                      <input
                        id="file-upload"
                        onChange={handleImageChange}
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-black">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
          {selectedImages.length === 0 ? (
            ''
          ) : (
            <div className="">
              <div className="p-1 font-semibold">
                <span className="text-orange">{`(${selectedImages.length})`}</span> Selected Images
              </div>
              <div className=" m-5 mt-0 h-64 bg-translucent grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 overflow-scroll">
                {selectedImages.map((item, index) => (
                  <Image url={item.preview?.toString()} key={index} />
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-end mt-6">
            <button className="p-2 leading-5 text-white transition-colors duration-200 transform bg-orange rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              {isAdded.loading ? <p>Loading</p> : 'Save'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Image(props: { url?: string }) {
  return (
    <div className="w-60 m-2 border border-translucent">
      <img src={props.url} alt="" />
    </div>
  );
}
