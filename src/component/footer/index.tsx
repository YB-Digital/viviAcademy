import Link from 'next/link';
import Image from 'next/image';

//style
import './footer.scss';

//image
import instagram from '@/image/instagram.svg';
// import twitter from '@/image/twitter.svg';
// import youtube from '@/image/youtube.svg';

export default function Footer() {
  return (
    <footer>
      <div className="footerTop">
        <p className="font-inter">
          <span>VIVI</span> - Beauty•Aesthetics•Academy
        </p>
        <div className="links">
          <Link href="/" className="font-inter">Home</Link>
          <Link href="/courses" className="font-inter">Courses</Link>
          <Link href="/faq" className="font-inter">FAQ</Link>
          <Link href="/about-us" className="font-inter">About Us</Link>
          <Link href="/contact" className="font-inter">Contact</Link>
        </div>
        <div className="contact">
          <Link href="mailto:vivibeauty@gmail.com" className="font-inter">vivibeauty@gmail.com</Link>
          <Link href="tel:+12345678912" className="font-inter">+1 234 5678 912</Link>
        </div>
      </div>
      
      <div className="copyright">
        <p className="font-inter">
          © 2024 VIVI
        </p>
        <div className="socialLinks">
          <Link href="https://www.instagram.com/_viviofficial__?igsh=MTBlZHAwbXprMm93dw==" target="_blank">
            <Image src={instagram} alt="Instagram" />
          </Link>
          {/* <Link href="" target="_blank">
            <Image src={twitter} alt="Twitter" />
          </Link>
          <Link href="" target="_blank">
            <Image src={youtube} alt="YouTube" />
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
