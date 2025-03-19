"use client";

import { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import {
  FaPlay, FaPause, FaExpand, FaVolumeUp, FaVolumeMute, FaStepBackward, FaStepForward
} from "react-icons/fa";
import "./videoPlayer.scss";

export default function VideoPlayer({ videoUrl, duration, courseId, userId, watchedTime }: { videoUrl: string, duration: number, courseId: number, userId: any, watchedTime: number }) {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(watchedTime || 0);
  const [totalDuration, setTotalDuration] = useState(duration);

  const togglePlay = () => setPlaying(!playing);
  const toggleMute = () => setMuted(!muted);
  const handleFullScreen = () => {
    const videoContainer = document.getElementById("video-container");
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoContainer?.requestFullscreen();
    }
  };

  const skipBackward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10, "seconds");
    }
  };

  const skipForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10, "seconds");
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // Ensure that the video plays from watchedTime when the component mounts
  useEffect(() => {
    setTotalDuration(duration);
  }, [duration]);

  const onPlayerReady = () => {
    if (playerRef.current && watchedTime > 0) {
      playerRef.current.seekTo(watchedTime, "seconds"); // Seek to watchedTime immediately when the player is ready
    }
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    setPlayedSeconds(progress.playedSeconds);
    const watchPercentage = Math.round((progress.playedSeconds / totalDuration) * 100);
    postVideoViewData(watchPercentage, progress.playedSeconds);
  };

  const postVideoViewData = async (viewPercentage: number, watchedTimeInSeconds: number) => {
    try {
      const response = await fetch("https://ybdigitalx.com/vivi_front/video_views.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_id: courseId,
          user_id: userId,
          watched_time: watchedTimeInSeconds, // send watched time in seconds
          view_percentage: viewPercentage
        }),
      });

      const result = await response.json();
      console.log("Sunucudan dönen yanıt:", result);
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const watchPercentage = Math.round((playedSeconds / totalDuration) * 100);
      postVideoViewData(watchPercentage, playedSeconds);
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [playedSeconds, totalDuration]); // Re-run whenever playedSeconds or totalDuration changes

  return (
    <div id="video-container" className="video-player">
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        controls={false}
        muted={muted}
        width="100%"
        height="100%"
        onProgress={handleProgress}
        onReady={onPlayerReady} // Ensure player is ready before seeking
      />
      {!playing && (
        <div className="center-play-button" onClick={togglePlay}>
          <FaPlay size={40} />
        </div>
      )}

      <div className="controls">
        <div className="left-controls">
          <button onClick={skipBackward}><FaStepBackward /></button>
          <button onClick={togglePlay}>{playing ? <FaPause /> : <FaPlay />}</button>
          <button onClick={skipForward}><FaStepForward /></button>
          <button onClick={toggleMute}>{muted ? <FaVolumeMute /> : <FaVolumeUp />}</button>
          <span className="time">
            {formatTime(playedSeconds)} / {formatTime(totalDuration)}
          </span>
        </div>

        <div className="right-controls">
          <button onClick={handleFullScreen}>
            <FaExpand />
          </button>
        </div>
      </div>
    </div>
  );
}
