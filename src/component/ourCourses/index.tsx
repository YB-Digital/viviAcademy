"use client";

import { useEffect, useState } from "react";
import CourseComponent from "../courseComponent";
import Slider from "react-slick";
import Link from "next/link";

//style
import "./ourCourses.scss";

interface Course {
  id: number;
  name: string;
  shortDesc: string;
  image: string;
  price: number;
}

export default function OurCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://ybdigitalx.com/vivi_front/list_course.php")
      .then((response) => {
        console.log("Response Status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);

        if (Array.isArray(data)) {
          const formattedCourses = data.map((course: any) => ({
            id: Number(course.id), 
            name: course.course_name, 
            shortDesc: course.description, 
            image: `https://ybdigitalx.com${course.image}`, 
            price: Number(course.price), 
          }));
          setCourses(formattedCourses);
        } else {
          setError("Failed to load courses.");
        }
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("Error fetching data.");
      })
      .finally(() => setLoading(false));
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3.6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, 
    responsive: [
      {
        breakpoint: 900, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <div className="ourCourses">
      <h2 className="font-montserrat">Our Courses</h2>
      <div className="seeMore">
        <Link className="font-inter" href={"/courses"}>
          See More {" >"}
        </Link>
      </div>

      {loading ? (
        <p className="font-inter">Loading courses...</p>
      ) : error ? (
        <p className="error-message font-inter">{error}</p>
      ) : (
        <Slider {...settings}>
          {courses.map((course: Course) => (
            <CourseComponent key={course.id} course={course} />
          ))}
        </Slider>
      )}
    </div>
  );
}