/* eslint-disable react/no-unescaped-entities */
import { useRef, RefObject, useEffect } from 'react';
import styles from './nav.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../../helpers/auth';
import Icon from '../notification/Icon';
import NotificationPane from '../notification/notificationPane';
import routes from '../../utils/routes';
import { CartIcon } from '../cart/Cart';
import {
  AdminComponent,
  ProtectedComponent,
  ReverseProtectedComponent,
  SellerComponent,
} from '../roles/Protected';
import SearchBar from '../searchBar/SearchBar';
import { DarkButton } from '../Darkmode/DarkButton';

const value = true;

const logo = '/svgs/Vector.svg';

const Navigation = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const barRef: RefObject<SVGSVGElement> = useRef<SVGSVGElement>(null);
  const closeRef: RefObject<SVGSVGElement> = useRef<SVGSVGElement>(null);

  const [isProfileIcon, setisProfileIcon] = useState(false);
  const [isNormalAccount, setIsNormalAccount] = useState(false);

  const [isNotificationIcon, setisNotificationIcon] = useState(false);
  const [isCartIcon, setisCartIcon] = useState(false);

  useEffect(() => {
    const authenticationMethod = localStorage.getItem('authenticationMethod');
    setIsNormalAccount(authenticationMethod === 'app');
  }, []);
  const toggleVisibility = () => {
    const divElement = divRef.current;
    const barElement = barRef.current;
    const closeElement = closeRef.current;

    if (divElement && barElement && closeElement) {
      divElement.classList.toggle(`${styles.hidden}`);
      barElement.classList.toggle(`${styles.hidden}`);
      closeElement.classList.toggle(`${styles.hidden}`);
    }
  };
  const handleProfile = () => {
    setisCartIcon(false);
    setisNotificationIcon(false);
    setisProfileIcon(!isProfileIcon);
  };

  const handleNotifications = () => {
    setisCartIcon(false);
    setisProfileIcon(false);
    setisNotificationIcon(!isNotificationIcon);
  };

  const handleCart = () => {
    setisNotificationIcon(false);
    setisProfileIcon(false);
    setisCartIcon(!isCartIcon);
  };

  return (
    <div className={styles.navbar}>
      {isProfileIcon && (
        <div className={styles.profile} data-testid="right-nav">
          <div
            className=" z-30 w-screen h-screen absolute  right-0 top-0 bottom-0"
            onClick={() => setisProfileIcon(false)}
          ></div>
          <nav className="z-50 bg-white">
            <ul>
              <Link to="/accounts/profile" className={styles.Link}>
                <li>
                  <FontAwesomeIcon icon="gear" className={`${styles.settings}`} />
                  &nbsp;&nbsp;Manage my account
                </li>
              </Link>
              <AdminComponent>
                <Link to="/manage_users" className={styles.Link}>
                  <li>
                    <i className="fa fa-users" aria-hidden="true"></i>
                    &nbsp;&nbsp;Manage users
                  </li>
                </Link>
              </AdminComponent>
              <SellerComponent>
                <Link to="/dashboard" className={styles.Link}>
                  <li>
                    <i className="fa fa-tachometer pr-2" aria-hidden="true"></i>Dashboard
                  </li>
                </Link>
              </SellerComponent>
              <Link to="#" className={styles.Link}>
                <li className={styles.cart}>
                  <FontAwesomeIcon icon="cart-shopping" className={`${styles.light}`} />
                  &nbsp;&nbsp;My cart
                </li>
              </Link>

              {value && (
                <Link to="/orders/trackOrders" className={styles.Link}>
                  <li>
                    <FontAwesomeIcon icon="bag-shopping" className={`${styles.order}`} />
                    &nbsp;&nbsp;My Orders
                  </li>
                </Link>
              )}
              <Link to="#" className={styles.Link}>
                <li className={styles.upperHeart}>
                  <FontAwesomeIcon icon="heart" className={`${styles.light}`} />
                  &nbsp;&nbsp;Wishlist
                </li>
              </Link>
              {isNormalAccount && (
                <Link to="/edit/password" className={styles.Link}>
                  <li>
                    <FontAwesomeIcon icon="lock" className={`${styles.settings}`} />
                    &nbsp;&nbsp;Change password
                  </li>
                </Link>
              )}
              <Link to="/" onClick={() => logout()} className={styles.Link}>
                <li>
                  <FontAwesomeIcon icon="arrow-right-from-bracket" className={`${styles.logout}`} />
                  &nbsp;&nbsp;Logout
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      )}
      {isNotificationIcon && <NotificationPane />}
      <div className={styles.top__bar}>
        <i>
          <FontAwesomeIcon
            icon="bars"
            className={styles.nav__toggle}
            onClick={toggleVisibility}
            aria-label="bars-icon"
            ref={barRef}
          />
          <FontAwesomeIcon
            icon="xmark"
            className={`${styles.nav__toggle} ${styles.hidden} ${styles.closeIcon}`}
            onClick={toggleVisibility}
            aria-label="close-icon"
            ref={closeRef}
          />
        </i>
        <Link to="/">
          <div className={styles.vectors}>
            <img className={styles.logo__icon} src={logo} />
            <strong className="text-extrabold">
              SHOP<span>SPREE</span>
            </strong>
          </div>
        </Link>

        <FontAwesomeIcon icon="bars" className={styles.bars} />
        <div className={styles.all}>
          <SearchBar />
          <ProtectedComponent>
            <div className="flex justify-center items-center gap-2 laptop:w-28 laptop:gap-1 tablet:w-28 phone:gap-1 sm:gap-0 sm:w-20">
              <Link to={routes.chats}>
                <FontAwesomeIcon icon="message" className="px-2" aria-label="message" />
              </Link>
              <div className="" onClick={handleCart}>
                <CartIcon />
              </div>
              <div className="" onClick={handleNotifications}>
                <Icon />
              </div>
              <FontAwesomeIcon
                icon="user"
                className={`${styles.light} ${styles.user} px-2`}
                onClick={handleProfile}
                aria-label="user-icon"
              />
            </div>
          </ProtectedComponent>
          <ReverseProtectedComponent>
            <Link to="accounts/login">
              <button className="bg-orange text-white text-base px-10 desktop:px-14 laptop:px-12 tablet:px-10 sm:px-5 phone:px-5 py-1.5 rounded-md">
                Login
              </button>
            </Link>
          </ReverseProtectedComponent>
        </div>
      </div>
      <nav className={`${styles.nav} ${styles.hidden}`} data-testid="overview-nav" ref={divRef}>
        <div className={styles.nav__wrap}>
          <div className={`${styles.nav__item} ${styles.overview}`}>
            <FontAwesomeIcon icon="house" className={styles.nav__toggle} />
            <span>Overview</span>
            <DarkButton />
          </div>
          <label className={styles.nav__label}>COMPUTER & ELECTRONICS</label>
          <Link to="/category/Mobile Phones & Tablets" className={styles.nav__item}>
            <FontAwesomeIcon icon="mobile" className={styles.nav__toggle} />
            <span>Mobile Phones & Tablets</span>
          </Link>
          <Link to="/category/Computer & Laptops" className={styles.nav__item}>
            <FontAwesomeIcon icon="desktop" />
            <span>Computer & Laptops</span>
          </Link>
          <Link to="/category/Audio & video" className={styles.nav__item}>
            <FontAwesomeIcon icon="podcast" />
            <span>Audio & video</span>
          </Link>
          <Link to="/category/Gaming" className={styles.nav__item}>
            <FontAwesomeIcon icon="gamepad" />
            <span>Gaming</span>
          </Link>

          <label className={styles.nav__label}>Fashion</label>
          <Link to="/category/Men's Fashion" className={styles.nav__item}>
            <FontAwesomeIcon icon="person" />
            <span>Men's Fashion</span>
          </Link>
          <Link to="/category/Female's Fashion" className={styles.nav__item}>
            <FontAwesomeIcon icon="person-dress" />
            <span>Female's Fashion</span>
          </Link>
          <Link to="/category/Jewelry & Watches" className={styles.nav__item}>
            <FontAwesomeIcon icon="ring" />
            <span>Jewelry & Watches</span>
          </Link>
          <Link to="/category/Accessories" className={styles.nav__item}>
            <FontAwesomeIcon icon="baby-carriage" />
            <span>Accessories</span>
          </Link>
          <label className={styles.nav__label}>Sports & Outdoors</label>
          <Link to="/category/Sports Equipment" className={styles.nav__item}>
            <FontAwesomeIcon icon="baseball-bat-ball" />
            <span>Sports Equipment</span>
          </Link>
          <Link to="/category/Fitness & Exercise" className={styles.nav__item}>
            <FontAwesomeIcon icon="dumbbell" />
            <span>Fitness & Exercise</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
