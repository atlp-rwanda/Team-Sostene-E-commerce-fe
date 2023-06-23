/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useFetchUsers } from './hooks';
import { setRole, disableAccount } from './redux/assignRolesSlice';

interface USER {
  id: string;
  email: string;
  username: string;
  role: string;
  status: string;
}

export default function AssignRole() {
  const [searchTerm, setSearchTerm] = useState('');
  const data = useFetchUsers();
  const filteredItems = data.users.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="w-full flex justify-center flex-col items-center pt-12">
      {/* <ToastContainer /> */}
      <div className="w-full flex justify-center flex-col items-right px-[3.5%] pb-2">
        <div className="pb-4 bg-white flex flex-row items-center justify-between p-2">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              data-testid="search-role"
              type="text"
              id="table-search"
              className="block p-2 pl-10 pr-20 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              placeholder="Search for users name"
            />
          </div>
        </div>
      </div>
      <div className="relative overflow-auto w-11/12 max-h-[70vh] shadow-md sm:rounded-lg">
        {data.loading ? (
          <div className="w-full p-2 text-center">
            <i className="fa fa-spinner fa-spin text-orange" aria-hidden="true"></i>
          </div>
        ) : (
          <table className=" text-sm text-left w-full text-gray-500">
            <thead className="text-xs text-black uppercase bg-[#BFC3D1] top-0 sticky border-b">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  UserName
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Change Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Disable Account
                </th>
              </tr>
            </thead>
            <tbody>
              {data.users &&
                filteredItems.map((user, index) => (
                  <UserRow
                    key={index}
                    email={user.email}
                    role={user.role}
                    status={user.status}
                    id={user.id}
                    username={user.username}
                  />
                ))}
            </tbody>
          </table>
        )}
        {data.error != '' ? <div className="w-full p-2 text-center">{data.error}</div> : ''}
      </div>
    </div>
  );
}

export function UserRow({ email, username, role, status, id }: USER) {
  return (
    <tr data-testid="user-row" className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4  md:py-2 sm-py-2 font-medium text-gray-900 whitespace-nowrap"
      >
        {email}
      </th>
      <td className="px-6 py-4  md:py-2 sm-py-2 ">{username}</td>
      <td className="px-6 py-4  md:py-2 sm-py-2 ">
        <span
          className={`p-1 rounded-sm  ${
            status === 'ACTIVE' ? 'text-black bg-green' : 'text-black bg-red'
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4 md:py-2 sm-py-2 ">{role}</td>
      <td className="px-6 py-4  md:py-2 sm-py-2 whitespace-nowrap">
        <RoleButtons id={id} />
      </td>
      <td className="px-6 py-4  md:py-2 sm-py-2 ">
        <DisableButtons id={id} status={status} />
      </td>
    </tr>
  );
}

export function RoleButtons({ id }: { id: string }) {
  const token = useAppSelector((state) => state.token.value) || '';
  const isRoleSet = useAppSelector((state) => state.setRole);
  const dispatch = useAppDispatch();
  const roleRef = useRef<HTMLSelectElement>(null);
  const handleSubmit = async () => {
    const rl = roleRef.current?.value;
    const data: { id: string; role: string; token: string } = {
      id,
      role: rl!,
      token,
    };

    const response = await dispatch(setRole(data));
    if (response.meta.requestStatus === 'fulfilled') {
      window.location.reload();
    } else if (response.meta.requestStatus === 'rejected') {
      if (isRoleSet.error !== '') {
        toast.error(isRoleSet.error);
      }
    }
  };

  return (
    <div className="font-medium text-orange space-x-2">
      <select ref={roleRef} name="" className="outline-none rounded-xs" id="">
        <option value="SELLER" className="p-1">
          SELLER
        </option>
        <option value="ADMIN" className="p-1">
          ADMIN
        </option>
        <option value="BUYER" className="p-1">
          BUYER
        </option>
      </select>
      <button data-testid="role-btn" onClick={handleSubmit} className="p-1 px-2 bg-translucent">
        <i className="fa fa-check" aria-hidden="true"></i> Save
      </button>
    </div>
  );
}

export function DisableButtons({ id, status }: { id: string; status: string }) {
  const token = useAppSelector((state) => state.token.value) || '';
  const isDisabled = useAppSelector((state) => state.disableAccount);
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    const data: { id: string; token: string } = {
      id,
      token,
    };

    const response = await dispatch(disableAccount(data));
    if (response.meta.requestStatus === 'fulfilled') {
      window.location.reload();
    } else if (response.meta.requestStatus === 'rejected') {
      if (isDisabled.error !== '') {
        toast.error(isDisabled.error);
      }
    }
  };

  return (
    <div className="font-medium text-orange space-x-2">
      <button
        data-testid="role-btn"
        onClick={handleSubmit}
        className="p-1 px-2 bg-translucent w-40"
      >
        <i className="fa-solid fa-xmark"></i>
        {status === 'ACTIVE' ? 'Disable Account' : 'Enable Account'}
      </button>
    </div>
  );
}
