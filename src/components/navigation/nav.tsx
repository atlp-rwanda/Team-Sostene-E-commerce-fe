/* eslint-disable react/no-unescaped-entities */
import { useRef, RefObject, useEffect } from 'react';
import styles from './nav.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../../helpers/auth';
import Icon from '../notification/Icon';
import NotificationPane from '../notification/notificationPane';
import { CartIcon } from '../cart/Cart';
import {
  AdminComponent,
  ProtectedComponent,
  ReverseProtectedComponent,
  SellerComponent,
} from '../roles/Protected';

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
          <nav>
            <ul>
              <Link to="" className={styles.Link}>
                <li>
                  <FontAwesomeIcon icon="gear" className={`${styles.settings}`} />
                  &nbsp;&nbsp;Manage My Account
                </li>
              </Link>
              <AdminComponent>
                <Link to="/manage_users" className={styles.Link}>
                  <li>
                    <i className="fa fa-users" aria-hidden="true"></i>
                    &nbsp;&nbsp;Manage Users
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
                  &nbsp;&nbsp;My Cart
                </li>
              </Link>
              <Link to="#" className={styles.Link}>
                <li>
                  <FontAwesomeIcon icon="bag-shopping" className={`${styles.order}`} />
                  &nbsp;&nbsp;My Orders
                </li>
              </Link>
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
                    &nbsp;&nbsp;Change Password
                  </li>
                </Link>
              )}
              <Link to="/" onClick={() => logout()} className={styles.Link}>
                <li>
                  <FontAwesomeIcon icon="arrow-right-from-bracket" className={`${styles.logout}`} />
                  &nbsp;&nbsp;LogOut
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
          <div className={styles.searchContainer}>
            <input type="text" placeholder="What are you looking for?" className={styles.search} />
            <FontAwesomeIcon icon="magnifying-glass" className={styles.searchIcon} />
          </div>
          <ProtectedComponent>
            <div className="flex justify-center items-center gap-3 laptop:w-28 laptop:gap-4 tablet:w-28 tablet:gap-4 phone:gap-1 sm:gap-1 sm:w-20">
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
          </div>
          <label className={styles.nav__label}>COMPUTER & ELECTRONICS</label>
          <div className={styles.nav__item}>
            <FontAwesomeIcon icon="mobile" className={styles.nav__toggle} />
            <span>Mobile Phones & Tablets</span>
          </div>
          <div className={styles.nav__item}>
            <FontAwesomeIcon icon="desktop" />
            <span>Computer & Laptops</span>
          </div>
          <div className={styles.nav__item}>
            <FontAwesomeIcon icon="podcast" />
            <span>Audio & video</span>
          </div>
          <div className={styles.nav__item}>
            <FontAwesomeIcon icon="gamepad" />
            <span>Gaming</span>
          </div>

          <label className={styles.nav__label}>Fashion</label>
          <div className={styles.nav__item}>
            <FontAwesomeIcon icon="person" />
            <span>Men's Fashion</span>
          </div>
          <div className={styles.nav__item}>
            <FontAwesomeIcon icon="person-dress" />
            <span>Female's Fashion</span>
          </div>
          <div className={styles.nav__item}>
            <FontAwesomeIcon icon="ring" />
            <span>Jewelry & Watches</span>
          </div>
          <div className={styles.nav__item}>
            <FontAwesomeIcon icon="baby-carriage" />
            <span>Accessories</span>
          </div>
          <label className={styles.nav__label}>Sports & Outdoors</label>
          <div className={styles.nav__item}>
            <FontAwesomeIcon icon="baseball-bat-ball" />
            <span>Sports Equipment</span>
          </div>
          <div className={styles.nav__item}>
            <FontAwesomeIcon icon="dumbbell" />
            <span>Fitness & Exercise</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
