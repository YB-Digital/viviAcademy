import Image from 'next/image';
import Link from 'next/link';

//style
import './homePageLearnPart.scss';

//image
import verify from '@/image/verifyIcon.svg';

export default function HomePageLearnPart() {
    return (
        <div className="learnPart py-8 px-4 mx-auto">
            <h2 className="text-[#3A3A3A] font-montserrat font-bold text-[28px] md:text-[36px] leading-[32px] md:leading-[48px] tracking-[15%] mb-6">
                Learn From a Professional!
            </h2>

            <p className="text-[#3A3A3A] font-inter font-medium text-[16px] md:text-[20px] leading-[28px] md:leading-[40px] tracking-[10%] mb-4">
                Benefit from Dr. Zeynep Yılmaz&apos;s tips, techniques, and personal experiences.
            </p>
            <p className="text-[#3A3A3A] font-inter font-medium text-[16px] md:text-[20px] leading-[28px] md:leading-[40px] tracking-[10%] mb-4">
                Recognized on television, radio, print media, and social platforms:
            </p>
            <p className="text-[#3A3A3A] font-inter font-medium text-[16px] md:text-[20px] leading-[28px] md:leading-[40px] tracking-[10%] mb-4">
                Dr. Zeynep Yılmaz is a sought-after trainer in the field of medical aesthetics, providing education to national and international experts, as well as anyone aspiring to specialize in this field.
            </p>
            <p className="text-[#3A3A3A] font-inter font-medium text-[16px] md:text-[20px] leading-[28px] md:leading-[40px] tracking-[10%]">
                With years of experience and hundreds of successful procedures, Dr. Zeynep Yılmaz is a trusted name in aesthetic education.
            </p>
            <p className="text-[#3A3A3A] font-inter font-medium text-[16px] md:text-[20px] leading-[28px] md:leading-[40px] tracking-[10%]">
                Seize the opportunity to excel in aesthetic training. Don&apos;t miss Dr. Yılmaz&apos;s unique courses and book your first aesthetic training today!
            </p>

            <Link href="courses" className="flex items-center gap-2 mt-4">
                <p className="font-inter font-bold text-[#3A3A3A]">Book Your Training Today!</p>
                <Image src={verify} alt="verify icon" />
            </Link>
        </div>
    );
}