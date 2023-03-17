import React from "react";
import { useAudio } from "../hooks/useAudio";
import { PlayerControls } from "./PlayerControls";

export const Player = () => {
  const {
    audio,
    isPlaying,
    audioRef,
    handlePlay,
    handlePause,
    handleTimeUpdate,
  } = useAudio();

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={audio?.src}
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className={`img-box ${isPlaying ? "anim" : ""}`}>
        <img src={audio?.srcImg} alt="" />
      </div>

      <h1>{audio?.title}</h1>
      <PlayerControls />
    </div>
  );
};
