import { Link, Route, Routes } from 'react-router-dom';
import CreateCollection, { Collections } from './create collection/CreateCollection';

export default function Dashboard() {
  return (
    <div className="flex items-center justify-center flex-row">
      <div className="w-11/12 tablet:w-4/5 p-2 pt-10">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/create-collection" element={<CreateCollection />}></Route>
        </Routes>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="">
      <div className="flex flex-wrap gap-1 pb-10 border-b border-b-translucent justify-evenly">
        <Link
          to="/dashboard/create-collection"
          className="w-32 h-32 flex flex-col cursor-pointer rounded-md border border-translucent hover:bg-translucent transition items-center justify-center p-5 text-center bg-white"
        >
          <i className="fa fa-plus-circle text-3xl text-orange" aria-hidden="true"></i>
          <p>Create Collection</p>
        </Link>
        <div className="w-32 h-32 flex flex-col cursor-pointer rounded-md border border-translucent hover:bg-translucent transition items-center justify-center p-5 text-center bg-white">
          <i className="fa fa-plus text-3xl text-orange" aria-hidden="true"></i>
          <p className="text-md">Add Product</p>
        </div>
      </div>
      <Collections />
    </div>
  );
}
