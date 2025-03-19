"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import VideoPlayer from "@/component/videoPlayer";

//style
import "./courseVideoPage.scss";

//image
import arrow from "@/image/leftArrow.svg";
import download from "@/image/download.svg";

export default function Page() {
  const [message, setMessage] = useState<string | null>(null);
  const [course, setCourse] = useState<{
    course_name: string;
    description: string;
    videos: string;
    duration: number;
    course_id: number;
    watched_time: number; // Make sure watched_time is a string (e.g., "00:00")
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      const courseId = localStorage.getItem("selectedCourseId");

      if (!userId || !courseId) {
        setMessage("User ID veya Course ID eksik.");
        return;
      }

      (async () => {
        try {
          const formData = new FormData();
          formData.append("userId", userId);
          formData.append("courseId", courseId);

          const response = await fetch("https://ybdigitalx.com/vivi_front/video_player.php", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          if (data.status === "success") {
            setCourse(data.data_course); // Adjusted to match the response from PHP
            setMessage(null);
          } else {
            setMessage(data.message || "Kursa erişim sağlanamadı.");
          }
        } catch (error) {
          console.error("Hata oluştu:", error);
          setMessage("Ağ hatası. Lütfen tekrar deneyin.");
        }
      })();
    }
  }, []);

  return (
    <div className="courseVideoPage">
      <div className="container">
        <div className="back">
          <Link href="/">
            <Image src={arrow} alt="arrow" />
            <p className="font-inter">Geri</p>
          </Link>
        </div>

        {message ? (
          <p className="error-message">{message}</p>
        ) : course ? (
          <>
            <div className="videoText">
              <div className="video">
                <VideoPlayer
                  videoUrl={`https://ybdigitalx.com/${course.videos}`}
                  duration={course.duration}
                  courseId={course.course_id}
                  userId={localStorage.getItem("userId")} // Pass the userId here
                  watchedTime={course.watched_time} // Pass watched time to the VideoPlayer
                />
              </div>
              <div className="text">
                <h2 className="font-montserrat">{course.course_name}</h2>
                <p className="font-inter">{course.description}</p>
                <div className="button">
                  <button>
                    <p className="font-inter">Materyalleri İndir</p>
                    <Image src={download} alt="download icon" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="loading-message">Kurs bilgileri yükleniyor...</p>
        )}
      </div>
    </div>
  );
}
