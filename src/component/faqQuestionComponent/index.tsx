'use client'

import { useState } from 'react';
import Image from 'next/image';

// Style
import './faqQuestionComponent.scss';

// Image
import arrow from '@/image/faqRight.svg';

export default function FaqQuestionComponent() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='faqQuestionComponent' onClick={() => setIsOpen(!isOpen)}>
            <div className="title">
                <p className='font-inter'>What services do you offer?</p>
                <Image src={arrow} alt="arrow" className={isOpen ? 'rotate' : ''} />
            </div>
            {isOpen && (
                <p className="text">
                    Our beauty center offers a wide range of services including skincare, laser hair removal, facial and body massages, hair treatments, manicure and pedicure. We also offer aesthetic procedures and personalized care packages.
                </p>
            )}
        </div>
    );
}
