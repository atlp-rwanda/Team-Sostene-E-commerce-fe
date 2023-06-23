import Exclusive from './Exclusive';
import Support from './Support';
import Account from './Account';
import QuickLink from './QuickLink';
import Download from './Download';
import Copyright from './Copyright';

function Footer() {
  return (
    <div className=" bg-black text-white mt-20">
      <div
        className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-5 space-x-5 static h-auto p-12"
        style={{ fontFamily: 'poppins,sans-serif' }}
      >
        <Exclusive />
        <Support />
        <Account />
        <QuickLink />
        <Download />
      </div>
      <Copyright />
    </div>
  );
}

export default Footer;
