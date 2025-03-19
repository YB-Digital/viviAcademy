"use client";

import { useEffect } from "react";
import Link from "next/link";

//style
import "./myCourseList.scss";

interface Course {
  id: number;
  course_name: string;
  duration: string;
  price: string;
  description: string;
}

interface MyCourseListProps {
  courses: Course[];
}

export default function MyCourseList({ courses }: MyCourseListProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("selectedCourseId");
    }
  }, []);

  const handleCourseClick = (courseId: number) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCourseId", courseId.toString());
    }
  };
  console.log(courses)
  return (
    <div className="myCourseList">
      <div className="title">
        <div className="courseName font-inter">Course Name</div>
        <div className="price font-inter">Price</div>
        <div className="shortDesc font-inter">Short Description</div>
        <div className="link"></div>
      </div>

      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.id} className="courseRow">
            <div className="courseName font-inter">{course.course_name}</div>
            <div className="price font-inter">€{course.price}</div>
            <div className="shortDesc font-inter">
              {course.description.length > 100
                ? `${course.description.substring(0, 100)}...`
                : course.description}
            </div>
            <Link
              href={`/mycourses/${course.id}`}
              className="link font-inter"
              onClick={() => handleCourseClick(course.id)}
            >
              View
            </Link>
          </div>
        ))
      ) : (
        <p className="noCourses font-inter">You have no courses.</p>
      )}
    </div>
  );
}
