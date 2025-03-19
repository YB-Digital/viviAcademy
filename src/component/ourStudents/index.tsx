'use client'

import Slider from "react-slick";
import Image from "next/image";

//style
import './ourStudents.scss'

//image
import test from '@/image/studentsTest.svg'

export default function OurStudents() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4.7,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 900, 
                settings: {
                    slidesToShow: 2, 
                }
            }
        ]
    };

    return (
        <div className="ourStudents">
            <h2 className="font-montserrat">
                Proud Moments of Our Students
            </h2>
            <p className="font-inter">
                We have proudly supported thousands of students in advancing their skills, including professionals making a difference in the industry.
            </p>
            <Slider {...settings}>
                <Image src={test} alt="student" />
                <Image src={test} alt="student" />
                <Image src={test} alt="student" />
                <Image src={test} alt="student" />
                <Image src={test} alt="student" />
                <Image src={test} alt="student" />
            </Slider>
        </div>
    )
}
