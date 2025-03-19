import Link from 'next/link'

//style
import './about.scss'

export default function Page() {
    return (
        <div className='aboutPage'>
            <div className="container">
                <h3 className='font-montserrat'>
                    Who are we?
                </h3>
                <p className='whoWeAreText font-inter'>We set out as a team aiming to add value to people’s lives and help them discover their beauty. Since the very first day we were established, we have embraced providing tailored solutions to meet the unique needs of each of our clients and earning their trust as our primary goal. Our passion for the world of beauty and care constantly drives us to work with innovative methods and high standards. Our vision is to go beyond being just a beauty center and provide an experience where people feel special. Our mission is to meet our clients’ expectations at the highest level with quality service, a professional team, and modern technologies. Our team consists of experts who are creative, passionate, and dedicated in their fields. For us, success is measured not only by aesthetic results but also by creating a happy and satisfied clientele. We are delighted to have you with us on this journey, and we look forward to sharing many more successes with you in the future.</p>
                <h3>
                    Experience and Achievements
                </h3>
                <p>With years of experience in the beauty industry, we have always prioritized maintaining the highest level of customer satisfaction. Our team of experts and innovative approaches focus on setting the best service standards in the sector.
                    The awards we’ve received, the events we’ve participated in, and the feedback from our clients are proof that we’re on the right path. Whether it’s skincare or hair and makeup services, we are committed to offering you the very best.
                    How about discovering your beauty with us and becoming a part of our success story?
                </p>
                <div className="text">
                    <div>
                        <h4 className='font-montserrat'>
                            Our Mission
                        </h4>
                        <p className='font-inter'>
                            Our mission is to always provide our customers with the highest quality service. Helping people feel good about themselves and boosting their confidence is our greatest motivation. With innovative solutions and a professional approach, we are committed to exceeding expectations.
                        </p>
                    </div>
                    <div>
                        <h4 className='font-montserrat'>
                            Our Vision
                        </h4>
                        <p className='font-inter'>
                            Our vision is to become a leading brand in the beauty and care industry and to inspire people. By utilizing technology and modern methods, we aim to enhance our service quality every day. With a focus on sustainability and contributing to society, we strive to shape the future of beauty.
                        </p>
                    </div>
                </div>
                <div className="button">
                    <Link href={''} className='font-inter'>
                        Services {'->'}
                    </Link>
                </div>
            </div>
        </div>
    )
}