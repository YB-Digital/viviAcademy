import Image from 'next/image'

//style
import './banner.scss'

//image
import bannerImage from '@/image/bannerImage.svg'
import bannerIcon from '@/image/bannerIcon.svg'

export default function Banner() {
    return (
        <div className="banner">
            <div className="text">
                <h1 className='font-aboreto'>
                    DISCOVER <br /> YOUR <br /> BEAUTY
                </h1>
                <Image className='icon1' src={bannerIcon} alt='icon'/>
                <Image className='icon2' src={bannerIcon} alt='icon'/>
                <Image className='icon3' src={bannerIcon} alt='icon'/>
                <Image className='icon4' src={bannerIcon} alt='icon'/>
            </div>
            <Image
                src={bannerImage}
                alt="Discover Beauty"
            />
        </div>
    )
}