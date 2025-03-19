import Image from 'next/image'
import Link from 'next/link';

// image
import logo from '@/image/logo.svg';

export default function Logo() {
    return (
        <Link href={'/'} className="flex-shrink-0">
            <Image src={logo} alt="ViVi Logo" width={200} height={100} />
        </Link>
    )
}