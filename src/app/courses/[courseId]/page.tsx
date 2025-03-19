"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import "./courseDetail.scss";

interface Course {
  id: number;
  name: string;
  description: string;
  image: string | null;
  price: number;
}

export default function Page() {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const courseId = params.courseId;

  useEffect(() => {
    const fetchData = async () => {
      if (!courseId) return; // Ensure courseId is available

      try {
        const response = await fetch("https://ybdigitalx.com/vivi_front/detail_course.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: courseId }),
        });

        const data = await response.json();

        if (response.ok && Array.isArray(data) && data.length > 0) {
          const formattedCourse = {
            id: Number(data[0].id) || 0,
            name: data[0].course_name || "Unknown Course",
            description: data[0].description || "No description available",
            image: data[0].image ? `https://ybdigitalx.com/${data[0].image}` : null,
            price: Number(data[0].price) || 0,
          };
          setCourse(formattedCourse);
        } else {
          setError("Course not found.");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  return (
    <div className="courseDetail">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : course ? (
        <div className="container">
          {course.image && (
            <div className="Image">
              <img src={course.image} alt={course.name} width={300} height={200} />
            </div>
          )}
          <div className="text">
            <h2 className="font-montserrat">{course.name}</h2>
            <p className="description font-inter">{course.description}</p>
            <p className="price font-inter">€{course.price}</p>
            <Link href="/" className="font-inter">
              Buy
            </Link>
          </div>
        </div>
      ) : (
        <p className="loading">Course not found.</p>
      )}
    </div>
  );
}
