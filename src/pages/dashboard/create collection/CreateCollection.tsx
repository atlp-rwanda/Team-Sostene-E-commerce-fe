import { useRef } from 'react';
import { useCollections, useCreateCollection } from './hooks';

export default function CreateCollection() {
  const { handleCreate, error, loading } = useCreateCollection();
  const nameRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    handleCreate(nameRef?.current?.value || '');
    if (nameRef.current) {
      nameRef.current.value = '';
    }
  };
  return (
    <div className="w-full h-96 flex items-start pt-20 justify-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-fade border-2 border-fade shadow-sm rounded px-8 pt-6 pb-8 mb-4"
        >
          <p className=" text-red text-sm font-semibold">{error}</p>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Enter collection name
            </label>
            <input
              ref={nameRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
            />
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-orange hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {loading ? (
                <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
              ) : (
                'Create'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Collections() {
  const { loading, error, collections } = useCollections();
  return (
    <div className="w-full border-2 p-2 mt-10 border-fade">
      <div className="w-full text-2xl">Your collections</div>
      <div className="w-full p-5 flex flex-wrap gap-2 grid-cols-2">
        {loading ? (
          <p className="w-full flex items-center p-2 text-center justify-center">
            <i className="fa fa-circle-o-notch fa-spin text-orange" aria-hidden="true"></i>
          </p>
        ) : error != '' ? (
          <p>{error}</p>
        ) : collections.length != 0 ? (
          collections.map((collection, index) => (
            <button
              key={index}
              className="p-1 cursor-pointer  my-2 w-auto items-center text-center bg-orange text-white"
            >
              {collection.name}
            </button>
          ))
        ) : (
          <div className="p-2">No collections created yet.</div>
        )}
      </div>
    </div>
  );
}
