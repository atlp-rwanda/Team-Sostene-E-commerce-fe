import { Link } from 'react-router-dom';

export default function HomeParallax() {
  const scrollToSection = () => {
    window.scrollTo({
      top: 400,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="w-full h-[400px] justify-center object-center flex flex-col gap-y-12 items-center"
      style={{
        background:
          'url(https://images.unsplash.com/photo-1602236500720-d7a68cb00c95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <p className="w-3/4 text-white text-center text-2xl desptop:text-3xl tablet:text-xl phone:text-xl">
        Discover a World of Shopping Delight at ShopSpree. Shop the Latest Trends in Fashion, Home
        Decor, Electronics, and More!
      </p>
      <Link to="/">
        <button className="px-6 py-3 bg-orange text-white " onClick={scrollToSection}>
          Start Shopping!
        </button>
      </Link>
    </div>
  );
}
