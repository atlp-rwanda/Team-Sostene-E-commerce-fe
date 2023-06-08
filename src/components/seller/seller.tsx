import styles from './seller.module.scss';
import SellerItems from './components/sellerItems/sellerItems';
import Navigation from '../navigation/nav';

export default function Seller() {
  return (
    <div className={styles.seller} data-testid="sellerItemsId">
      <Navigation />
      <SellerItems />
    </div>
  );
}
