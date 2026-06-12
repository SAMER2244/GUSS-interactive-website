import logo from '../assets/logo.png';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__divider" aria-hidden="true" />
      <div className="footer__content">
        <img
          src={logo}
          alt="شعار الاتحاد العام لطلبة سوريا"
          className="footer__logo"
          width="60"
          height="60"
          loading="lazy"
        />
        <p className="footer__text">
          مكتب المتابعة والتقييم — الاتحاد العام لطلبة سوريا
        </p>
        <p className="footer__copyright">
          © 2026 جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}

export default Footer;
