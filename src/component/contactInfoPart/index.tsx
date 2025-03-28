import Link from 'next/link';
import Image from 'next/image';

//style
import './contactInfoPart.scss';

//image
import phone from '@/image/contactPhone.svg';
import email from '@/image/contactEmail.svg';
import location from '@/image/contactLocation.svg';
import wp from '@/image/whatsapp.svg';
import instagram from '@/image/contactInstagram.svg';

const ContactInfoPart: React.FC = () => {
    return (
        <div className="contactInfoPart">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24483.52617111326!2d32.864853200000006!3d39.9091513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2str!4v1738423240034!5m2!1sen!2str"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            <div className="contactInfo">
                <Link href="tel:+12345678912">
                    <Image src={phone} alt="Phone Icon" />
                    <p className="font-inter">+1 234 5678 912</p>
                </Link>
                <Link href="mailto:vivibeauty@gmail.com">
                    <Image src={email} alt="Email Icon" />
                    <p className="font-inter">vivibeauty@gmail.com</p>
                </Link>
                <Link href="https://www.google.com/maps?q=Berliner+Straße+45,+10117+Berlin,+Germany" target="_blank">
                    <Image src={location} alt="Location Icon" />
                    <p className="font-inter">Berliner Straße 45, 10117 Berlin, Germany</p>
                </Link>
            </div>

            <div className="socialInfo">
                <Link href="https://wa.me/12345678912" target="_blank">
                    <Image src={wp} alt="WhatsApp Icon" />
                </Link>
                <Link href="https://www.instagram.com/viviofficial_?igsh=MTBlZHAwbXprMm93dw==" target="_blank">
                    <Image src={instagram} alt="Instagram Icon" />
                </Link>
            </div>
        </div>
    );
};

export default ContactInfoPart;
