"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import arrow from "@/image/leftArrow.svg";
import download from "@/image/download.svg";

const getThumbnail = (videoPath: string) => "/default-thumbnail.jpg";

export default function Page() {
  const [message, setMessage] = useState<string | null>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [course, setCourse] = useState<{
    id: number;
    course_name: string;
    description: string;
    videos: {
      video_order: number;
      video_path: string;
      video_duration: number;
      watched_time: number;
    }[];
  } | null>(null);

  useEffect(() => {
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
          setCourse(data.data_course);
        } else {
          setMessage(data.message || "Kursa erişim sağlanamadı.");
        }
      } catch (err) {
        console.error(err);
        setMessage("Bir hata oluştu.");
      }
    })();
  }, []);

  const handleDownloadAllVideos = () => {
    if (!course) return;

    course.videos.forEach((video) => {
      const videoUrl = `https://ybdigitalx.com${video.video_path}`;

      console.log("Fetching video URL:", videoUrl); // Debug log for video URL

      fetch(videoUrl, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}` // if you need an auth token
        }
      })
        .then((response) => {
          if (!response.ok) {
            console.error("Error fetching video:", response.statusText); // Debug log for error response
            throw new Error("Network response was not ok");
          }
          return response.blob();
        })
        .then((blob) => {
          const link = document.createElement("a");
          const url = URL.createObjectURL(blob);
          link.href = url;
          link.download = `video-${video.video_order}.mp4`;
          document.body.appendChild(link); // Firefox for required link in DOM
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url); // Clean up after the download
        })
        .catch((error) => {
          console.error("Error downloading video", error); // Capture error here
          setMessage("Video indirilemedi.");
        });
    });
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm text-[#0068AA] mb-4">
          <Image src={arrow} alt="arrow" />
          <p>Geri</p>
        </Link>

        {message ? (
          <p className="text-red-500">{message}</p>
        ) : course ? (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT: Video + Description */}
            <div className="flex-1">
              <video
                key={course.videos[selectedVideoIndex].video_path}
                src={`https://ybdigitalx.com${course.videos[selectedVideoIndex].video_path}`}
                controls
                className="w-full rounded-md"
                poster={getThumbnail(course.videos[selectedVideoIndex].video_path)}
              />
              <p className="mt-4 text-sm text-[#848484]">{course.description}</p>

              <button
                className="mt-4 flex items-center gap-2 bg-[#E70BBB] hover:bg-[#cf00a9] text-white px-4 py-2 rounded"
                onClick={handleDownloadAllVideos}
              >
                <span className="font-semibold">Download Materials</span>
                <Image src={download} alt="download" />
              </button>
            </div>

            {/* RIGHT: Course Content */}
            <div className="w-full lg:w-[340px] bg-white border rounded-md shadow-sm p-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm font-medium text-gray-500">Course content</span>
              </div>

              <h2 className="text-lg font-semibold mt-4">{course.course_name}</h2>

              <div className="mt-4 space-y-4">
                {course.videos.map((video, idx) => {
                  const min = Math.floor(video.video_duration / 60);
                  const sec = Math.round(video.video_duration % 60);
                  const formattedDuration = `${min}:${sec.toString().padStart(2, "0")} min`;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedVideoIndex(idx)}
                      className={`cursor-pointer border-b pb-3 ${
                        selectedVideoIndex === idx ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-black">
                            Section {video.video_order}: Video {video.video_order}
                          </p>
                          <p className="text-xs text-gray-500">
                            Watched: {Math.floor(video.watched_time)}s | {formattedDuration}
                          </p>
                        </div>
                        <span className="text-lg text-gray-500">⌄</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Kurs bilgileri yükleniyor...</p>
        )}
      </div>
    </div>
  );
}
