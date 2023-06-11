import styles from './seller.module.scss';
import SellerItems from './components/sellerItems/sellerItems';

export default function Seller() {
  return (
    <div className={styles.seller} data-testid="sellerItemsId">
      <SellerItems />
    </div>
  );
}
