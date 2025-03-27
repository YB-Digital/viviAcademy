"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FilterComponent from "@/component/filterComponent";
import SearchComponent from "@/component/searchComponent";
import MyCourseList from "@/component/myCourseList";

//style
import "./mycourses.scss";

interface Course {
  id: number;
  course_name: string;
  duration: string;
  price: string;
  description: string;
  category: string;
}

export default function Page() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Arama terimi
  const [selectedCategory, setSelectedCategory] = useState<string>("All"); // Seçilen kategori

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      router.push("/login");
      return;
    }

    (async () => {
      await fetchUserCourses(storedUserId);
      setLoading(false);
    })();
  }, [router]);

  
  const fetchUserCourses = async (userId: string) => {
    try {
      const response = await fetch("https://ybdigitalx.com/vivi_front/get_user_courses.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.status !== "success") {
        throw new Error(data.message || "Failed to fetch courses");
      }
  
      const formattedCourses = data.courses.map((course: any) => ({
        id: Number(course.course_id),
        course_name: course.course_name,
        duration: course.duration || "Unknown",
        price: course.price || "Free",
        description: course.description || "No description available",
        category: course.category_name || "Uncategorized",
      }));
  
      setCourses(formattedCourses);
      setFilteredCourses(formattedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Arama ve kategori filtresi
  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter((course) =>
        course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, courses]);

  return (
    <div className="myCoursesPage">
      <h2 className="font-montserrat">My Courses</h2>
      <div className="filterSearch">
        <div className="searchPart">
          <SearchComponent setSearchTerm={setSearchTerm} />
        </div>
        <div className="filterPart">
          <FilterComponent setSelectedCategory={setSelectedCategory} />
        </div>
      </div>

      {loading ? (
        <p className="loading font-inter">Loading courses...</p>
      ) : filteredCourses.length === 0 ? (
        <p className="noCourses font-inter">You have no courses.</p>
      ) : (
        <MyCourseList courses={filteredCourses} />
      )}
    </div>
  );
}