import CardItem from './cardItem';

const product = {
  productImages: [
    { url: 'https://unsplash.com/photos/HEvQ8P4eqlg' },
    { url: 'https://unsplash.com/photos/HEvQ8P4eqlg' },
  ],
  details: 'Lorem ipsum dolor sit amet',
  id: '1',
  category: 'Sample Category',
  ratings: 4,
  price: 99.99,
  bonus: 10,
  collectionId: 'collection1',
  createdAt: '2023-05-28',
  expDate: '2023-06-30',
  expiredflag: false,
  name: 'Sample Product',
  quantity: 10,
};
export default {
  title: 'Components/CardItem',
  component: CardItem,
};

export const Default = () => <CardItem product={product} />;
