"use client";

import { useEffect, useState } from "react";
import CourseComponent from "@/component/courseComponent";
import SearchComponent from "@/component/searchComponent";
import FilterComponent from "@/component/filterComponent";

//style
import "./courses.scss";

interface Course {
  id: number;
  name: string;
  shortDesc: string;
  image: string;
  price: number;
  category: string; // Keep category name for display
  categoryId: number; // Add categoryId for filtering
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://ybdigitalx.com/vivi_front/list_course.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const formattedCourses = data.map((course: any) => ({
            id: Number(course.id),
            name: course.course_name,
            shortDesc: course.description,
            image: `https://ybdigitalx.com${course.image}`,
            price: Number(course.price),
            category: course.category_name,
            categoryId: Number(course.category_id) // Map categoryId from the data
          }));
          setCourses(formattedCourses);
          setFilteredCourses(formattedCourses);
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

  // Update useEffect for filtering to use categoryId
  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((course) => course.categoryId.toString() === selectedCategory);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, courses]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

 
  return (
    <div className="courseList">
      <div className="container">
        <h1 className="font-montserrat">Our Courses</h1>
        <p>
          Explore our certified training programs designed to help you achieve professional excellence in the beauty industry. Whether you're just starting out or looking to enhance your existing skills, our comprehensive courses provide hands-on experience, expert guidance, and industry-recognized certifications. Take the first step towards your dream career with us!
        </p>
        <h2 className="font-montserrat">VIDEO COURSES</h2>
        <div className="serachFilter">
          <div className="searchPart">
            <SearchComponent setSearchTerm={setSearchTerm} /> {/* Search bar arama terimini güncelleyecek */}
          </div>
          <div className="filterPart">
            <FilterComponent setSelectedCategory={setSelectedCategory} /> {/* Kategori filtreleme */}
          </div>
        </div>
        {filteredCourses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          <div className="courseGrid">
            {filteredCourses.map((course) => (
              <CourseComponent key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}