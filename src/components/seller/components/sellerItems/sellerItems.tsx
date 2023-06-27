/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './sellerItems.module.scss';
import CardItem from '../cardItem/cardItem';
import LoadingSpinner from '../../../../designComponents/loadingSpinner/loadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { sellerProducts, setPage, setSearch } from './sellerItemsFilters.slice';
import { RootState } from '../../../../redux/store';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import Empty from '../../../../pages/emptyState/empty';
import { useNavigate } from 'react-router-dom';

//defines data
export interface cardDetails {
  product: {
    productImages: { url: string }[];
    details?: string;
    id: string;
    category: string;
    ratings?: number;
    price: number;
    bonus: number;
    collectionId: string;
    createdAt?: string;
    expDate: string;
    expiredflag: boolean;
    name: string;
    quantity: number;
  }[];
  message: string;
  page: number;
  totalPages: number;
}

export default function SellerItems() {
  const dispatch = useDispatch();
  const customDispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParameter = new URLSearchParams(location.search);
  const myParam = queryParameter.get('cid') || '';
  //redux get initial values from redux
  const search = useSelector((state: RootState) => state.filterCollectionProducts.search);
  const page = useSelector((state: RootState) => state.filterCollectionProducts.page);

  const [initialData, setInitialData] = useState<cardDetails | undefined>();
  const [loadingRefetch, setLoadingRefetch] = useState<boolean>(false);
  const [cardData, setCardData] = useState<cardDetails>({
    product: [],
    message: '',
    page: 1,
    totalPages: 1,
  });
  const { products, loading, errors } = useAppSelector((state) => state.filterCollectionProducts);
  useEffect(() => {
    const handleRefetch = async (): Promise<void> => {
      setLoadingRefetch(true);
      customDispatch(sellerProducts({ myParam, page }));
    };
    if (page > 0 && page <= 10) {
      handleRefetch();
    }
  }, [page]);

  const newData: cardDetails = {
    product: products,
    message: '',
    page: 1,
    totalPages: 1,
  };

  useEffect(() => {
    setInitialData(newData);
  }, [products]);

  const dataItems = cardData.product;
  const [sellerItems, setSellerItems] = useState(dataItems);
  useEffect(() => {
    setCardData(newData);
    setSellerItems(dataItems);
  }, [initialData, dataItems]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };
  const handleChangePage = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPage(Number(e.target.value)));
  };

  const handleResetSearch = () => {
    dispatch(setSearch(''));
    dispatch(setPage(1));
    setSellerItems(dataItems);
    navigate('/dashboard');
  };
  useEffect(() => {
    if (loadingRefetch === false) {
      setSellerItems(dataItems);
    }
  }, [loadingRefetch]);

  // filter items
  useEffect(() => {
    let filteredItems = [...dataItems];

    search && filteredItems
      ? (filteredItems = filteredItems.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        ))
      : null;
    setSellerItems(filteredItems);
  }, [search]);

  if (errors) {
    return <div className={styles.error}>{errors}</div>;
  }
  return (
    <div className={styles.sellerItems}>
      <div className="single">
        {loading && <LoadingSpinner />}
        <div className="topFilterBox">
          <input
            type="text"
            placeholder="Search Item"
            role="getSearchTest"
            className="SearchInput"
            value={search}
            onChange={handleSearch}
          />
          <div />
          <div className="page" data-testid="pagesId">
            Page:
            <input
              type="number"
              className="inputPage SearchInput"
              role="changePage"
              autoFocus
              max={10}
              min={1}
              value={page}
              onChange={handleChangePage}
            />
            <span className="pages">
              Out of {cardData.totalPages} Page{cardData.totalPages > 1 && 's'}
            </span>
          </div>
        </div>
        {initialData && (
          <div className="listItemsBox" data-testid="box_cardList">
            {sellerItems.length === 0 && (
              <div className="none">
                <Empty store={'collection'} data={'product'} reset={handleResetSearch} />
              </div>
            )}
            {sellerItems &&
              sellerItems.length > 0 &&
              sellerItems.map((data) => {
                return (
                  <div className="card" key={data.id} data-testid="card-item">
                    <CardItem product={data} />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
