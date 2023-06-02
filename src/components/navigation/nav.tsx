/* eslint-disable react/no-unescaped-entities */
import { useRef, RefObject } from 'react';
import styles from './nav.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../../public/svgs/Vector.svg';

const Navigation = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const barRef: RefObject<SVGSVGElement> = useRef<SVGSVGElement>(null);
  const closeRef: RefObject<SVGSVGElement> = useRef<SVGSVGElement>(null);

  const [isProfileIcon, setisProfileIcon] = useState(false);
  const [isHomeIcon, setisHomeIcon] = useState(false);

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
    if (isHomeIcon) {
      setisHomeIcon(!isHomeIcon);
    }
    setisProfileIcon(!isProfileIcon);
  };
  const handleHome = () => {
    if (isProfileIcon) {
      setisProfileIcon(!isProfileIcon);
    }
    setisHomeIcon(!isHomeIcon);
  };

  return (
    <div className={styles.navbar}>
      {isHomeIcon && (
        <div className={styles.right_nav} data-testid="right-nav">
          <nav>
            <ul>
              <Link to="/" className={styles.Link}>
                <li>
                  <FontAwesomeIcon icon="home" className={`${styles.settings}`} />
                  &nbsp;&nbsp;Home
                </li>
              </Link>
              <Link to="#" className={styles.Link}>
                <li>
                  <FontAwesomeIcon icon="address-book" className={`${styles.settings}`} />
                  &nbsp;&nbsp;Contact
                </li>
              </Link>
              <Link to="#" className={styles.Link}>
                <li>
                  <FontAwesomeIcon icon="circle-question" className={`${styles.settings}`} />
                  &nbsp;&nbsp;About
                </li>
              </Link>
              <Link to="/accounts/signup" className={styles.Link}>
                <li>
                  <FontAwesomeIcon icon="arrow-right-from-bracket" />
                  &nbsp;&nbsp;SignUp
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      )}
      {isProfileIcon && (
        <div className={styles.profile}>
          <nav>
            <ul>
              <Link to="#" className={styles.Link}>
                <li>
                  <FontAwesomeIcon icon="gear" className={`${styles.settings}`} />
                  &nbsp;&nbsp;Manage My Account
                </li>
              </Link>
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
              <Link to="#" className={styles.Link}>
                <li>
                  <FontAwesomeIcon icon="arrow-right-from-bracket" className={`${styles.logout}`} />
                  &nbsp;&nbsp;LogOut
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      )}
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
        <div className={styles.vectors}>
          <img className={styles.logo__icon} src={logo} />
          <strong>
            SHOP<span>SPREE</span>
          </strong>
        </div>
        <nav>
          <ul>
            <Link to="/" className={styles.Link}>
              <li>Home</li>{' '}
            </Link>
            <Link to="#" className={styles.Link}>
              <li>Contact</li>
            </Link>
            <Link to="#" className={styles.Link}>
              <li>About</li>
            </Link>
            <Link to="/accounts/signup" className={styles.Link}>
              <li>SignUp</li>
            </Link>
          </ul>
        </nav>
        <FontAwesomeIcon icon="bars" className={styles.bars} />
        <div className={styles.all}>
          <div className={styles.searchContainer}>
            <input type="text" placeholder="What are you looking for?" className={styles.search} />
            <FontAwesomeIcon icon="magnifying-glass" className={styles.searchIcon} />
          </div>
          <FontAwesomeIcon icon="heart" className={`${styles.light} ${styles.heart}`} />
          <FontAwesomeIcon icon="cart-shopping" className={`${styles.light} ${styles.cart}`} />
          <FontAwesomeIcon
            icon="user"
            className={`${styles.light} ${styles.user}`}
            onClick={handleProfile}
            aria-label="user-icon"
          />
          <FontAwesomeIcon
            icon="house"
            className={`${styles.light} ${styles.house}`}
            onClick={handleHome}
            aria-label="home-icon"
          />
        </div>
      </div>

      <nav className={`${styles.nav} ${styles.hidden}`} data-testid="overview-nav" ref={divRef}>
        <div className={`${styles.nav__item} ${styles.overview}`}>
          <i className="fa fa-home" aria-hidden="true"></i>
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
      </nav>
    </div>
  );
};

export default Navigation;