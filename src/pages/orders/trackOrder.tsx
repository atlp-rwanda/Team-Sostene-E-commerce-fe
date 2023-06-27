/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useGetOrderStatus } from './redux/hooks';
import { Link, useNavigate } from 'react-router-dom';

function Orders() {
  const { handleGetOrderStatus, result } = useGetOrderStatus();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetOrderStatus();
  }, []);

  function singleOrder(id: string) {
    navigate(`/orders/singleOrder?orderid=${id}`);
  }

  return (
    <>
      {result.loading ? (
        <div className="w-full p-2 py-64 text-center">
          <i className="fa fa-spinner fa-spin text-orange" aria-hidden="true"></i>
        </div>
      ) : result.data.orders.length === 0 ? (
        <div className="cardBox">
          <h1>No orders left !!!</h1>
        </div>
      ) : (
        <div className="relative overflow-auto shadow-md sm:rounded-lg max-w-4xl mx-auto mt-32 max-h-96">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-black dark:text-gray-400 top-0 sticky">
              <tr>
                <th scope="col" className="px-8 py-8">
                  image
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  status
                </th>
                <th scope="col" className="px-6 py-10">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {result.data.orders.map((item) => (
                <tr key={item.id} onClick={() => singleOrder(item.id)}>
                  <td className="px-10 py-5">
                    <img src={item.products[0]?.product.image} className="w-20 h-20 object-cover" />
                  </td>
                  <td>${item.totalPrice}</td>
                  <td>{item.status}</td>
                  <td className="px-6 py-10 flex">
                    {item.status !== 'succeeded' ? (
                      <Link to={`/payment?rid=${item.id}`}>
                        <button>Pay</button>
                      </Link>
                    ) : (
                      <button>Done</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Orders;
