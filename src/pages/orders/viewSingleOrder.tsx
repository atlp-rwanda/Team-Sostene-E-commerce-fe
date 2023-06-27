/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useGetOrderStatus } from './redux/hooks';
import { useLocation } from 'react-router';
import { Products } from '../../utils/types/product';
import axios from 'axios';
import store from '../../redux/store';

export default function ViewSingleOrder() {
  const { handleGetOrderStatus } = useGetOrderStatus();
  const location = useLocation();
  const queryParameter = new URLSearchParams(location.search);
  const myParam = queryParameter.get('orderid') || '';
  const [data, setData] = useState<Products>();
  useEffect(() => {
    handleGetOrderStatus();
    const token = store.getState().token.value;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}orders/${myParam}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        setData(data.data.order);
      });
  }, []);
  return (
    <div>
      <div className="min-w-screen min-h-screen bg-yellow-300 flex items-center p-5 lg:p-10 overflow-hidden relative">
        {data && (
          <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
            <div className="md:flex items-center -mx-10">
              <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div className="relative">
                  <img
                    src={data.products[0]?.product.image}
                    className="w-full relative z-10"
                    alt=""
                  />
                  <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-10">
                <div className="mb-10">
                  <h1 className="font-bold uppercase text-2xl mb-5">
                    {data.products[0].product.name}
                  </h1>
                  <p className="text-sm">{data.status}</p>
                </div>
                <div>
                  <div className="inline-block align-bottom mr-5">
                    <span className="text-2xl leading-none align-baseline">$</span>
                    <span className="font-bold text-2xl leading-none align-baseline">
                      {data.totalPrice}
                    </span>
                  </div>
                </div>
                <span className="font-lighter text-1xl leading-none align-baseline">
                  Quantity ={data.products[0].quantity}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
