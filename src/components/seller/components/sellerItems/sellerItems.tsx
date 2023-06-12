/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './sellerItems.module.scss';
import CardItem from '../cardItem/cardItem';
import NotFoundSearch from '../../../../designComponents/notFoundSearch/notFoundSearch';
import useFetch from '../../../../hooks/useFetch';
import LoadingSpinner from '../../../../designComponents/loadingSpinner/loadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setSearch } from './sellerItemsFilters.slice';
import { RootState } from '../../../../redux/store';
import axios from 'axios';
import { BACKEND_URL } from '../../../../utils/constants';

//defines data
export interface cardDetails {
  products: {
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
  //redux get initial values from redux
  const search = useSelector((state: RootState) => state.filterCollectionProducts.search);
  const page = useSelector((state: RootState) => state.filterCollectionProducts.page);
  //get instant data from db
  const url = `${BACKEND_URL}/products/all?page=${page}&limit=10`;
  const { data, isLoading, error } = useFetch(url);
  const [initialData, setInitialData] = useState<cardDetails | undefined>(
    data as cardDetails | undefined
  );
  const [loadingRefetch, setLoadingRefetch] = useState<boolean>(isLoading);
  const [errorRefetch, setErrorRefetch] = useState<Error | null>(error);

  useEffect(() => {
    const handleRefetch = async (): Promise<void> => {
      setLoadingRefetch(true);
      try {
        const response = await axios.get(url);
        setInitialData(response?.data);
        setLoadingRefetch(false);
      } catch (error) {
        setErrorRefetch(error as Error);
        setLoadingRefetch(false);
      }
    };
    if (page > 0 && page <= 10) {
      handleRefetch();
    }
  }, [page]);

  const cardData: cardDetails = {
    products: initialData?.products || [],
    message: initialData?.message || '',
    page: initialData?.page || 1,
    totalPages: initialData?.totalPages || 1,
  };

  const dataItems = cardData.products;
  const [sellerItems, setSellerItems] = useState(dataItems);

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

  return (
    <div className={styles.sellerItems}>
      <div className="single">
        {loadingRefetch && <LoadingSpinner />}
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
        {errorRefetch && <div className="error">{errorRefetch?.message}</div>}
        {initialData && (
          <div className="listItemsBox" data-testid="box_cardList">
            {sellerItems.length === 0 && <NotFoundSearch reset={handleResetSearch} />}
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
