import Image from 'next/image'

//style
import './courseOverview.scss'

//image
import training from '@/image/training.svg'
import demonstrations from '@/image/demonstrations.svg'
import safety from '@/image/safety.svg'
import learning from '@/image/learning.svg'
import certification from '@/image/certification.svg'

export default function CourseOverview() {
    return (
        <div className='courseOverview'>
            <div className="title">
                <h2 className='font-inter'>
                    Online Courses in Aesthetic Medicine!
                </h2>
                <p className='font-inter'>
                    (Hyaluronic Acid, Botox, Fat-Dissolving Injections, and Advanced Techniques)
                </p>
            </div>

            <div className="overview">
                <div>
                    <Image src={training} alt='icon' />
                    <p className='font-inter'>
                        Comprehensive Training for Professionals
                    </p>
                </div>
                <div>
                    <Image src={demonstrations} alt='icon' />
                    <p className='font-inter'>
                        Step-by-Step Demonstrations
                    </p>
                </div>
                <div>
                    <Image src={safety} alt='icon' />
                    <p className='font-inter'>
                        Safety First
                    </p>
                </div>
                <div>
                    <Image src={learning} alt='icon' />
                    <p>
                        Interactive Learning Experience
                    </p>
                </div>
                <div>
                    <Image src={certification} alt='icon' />
                    <p className='font-inter'>
                        Globally Recognized Certification
                    </p>
                </div>
            </div>
        </div>
    )
}
