import { useParams } from 'react-router-dom';
import Handler from './components/Handler';
import { useSearchProducts } from './hooks';

export default function Search() {
  const { query } = useParams<string>();
  const result = useSearchProducts({ query });
  return (
    <div className="w-full">
      {result.loading ? (
        <div className="w-full p-32 py-56 flex items-center justify-center text-center">
          <i className="fa fa-spinner fa-spin text-orange" aria-hidden="true"></i>
        </div>
      ) : (
        ''
      )}
      {result.error != '' ? <p>Error Occurred: {result.error}</p> : ''}
      {result.result.length != 0 ? (
        <Handler title={`Results for "${query}"`} products={result.result} />
      ) : (
        <NoResult query={query || ''} />
      )}
    </div>
  );
}

const NoResult = (props: { query: string }) => {
  return (
    <div className="text-black w-full flex items-center flex-col pt-44 justify-center">
      <img
        src="https://icons.veryicon.com/png/o/commerce-shopping/jkd_wap/no-result.png"
        alt="no results"
        className=" w-24"
      />
      No results found for {`"${props.query}"`}
    </div>
  );
};
