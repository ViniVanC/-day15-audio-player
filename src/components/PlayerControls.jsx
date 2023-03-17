import React from "react";
import { useAudio } from "../hooks/useAudio";
import { FaPause, FaPlay, FaAngleRight, FaAngleLeft } from "react-icons/fa";

export const PlayerControls = () => {
  const {
    isPlaying,
    setIsPlaying,
    currentTime,
    duration,
    handleSeek,
    convertTime,
    prevAudio,
    nextAudio,
  } = useAudio();

  return (
    <div className="audio-controls">
      <div className="progress-bar">
        <input
          type="range"
          min="0"
          max={isNaN(duration) ? 0 : duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <div className="time">
          <span>{convertTime(currentTime)}</span>
          <span>{convertTime(duration)}</span>
        </div>
      </div>
      <div className="controls-buttons">
        <button onClick={prevAudio}>
          <FaAngleLeft />
        </button>
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={nextAudio}>
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};
