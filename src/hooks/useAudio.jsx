import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { playList } from "../playList";

const AudioContext = createContext();
export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [audioNumberItem, setAudioNumberItem] = useState(
    Math.floor(Math.random() * playList.length)
  );
  const [audio, setAudio] = useState(playList[audioNumberItem]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    if (currentTime === duration && currentTime !== 0 && duration !== 0) {
      nextAudio();
      audioRef.current.play();
    }
  }, [currentTime]);

  useEffect(() => {
    if (isNaN(duration)) {
      setDuration(0);
    }
  }, [duration]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (event) => {
    setCurrentTime(event.target.value);
    audioRef.current.currentTime = event.target.value;
  };

  const prevAudio = () => {
    audioNumberItem - 1 < 0
      ? (setAudioNumberItem(playList.length - 1),
        setAudio(playList[playList.length - 1]))
      : (setAudioNumberItem(audioNumberItem - 1),
        setAudio(playList[audioNumberItem - 1]));
  };

  const nextAudio = () => {
    audioNumberItem + 1 > playList.length - 1
      ? (setAudioNumberItem(0), setAudio(playList[0]))
      : (setAudioNumberItem(audioNumberItem + 1),
        setAudio(playList[audioNumberItem + 1]));
  };

  function convertTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <AudioContext.Provider
      value={{
        audio,
        setAudio,
        isPlaying,
        setIsPlaying,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        audioRef,
        handlePlay,
        handlePause,
        handleTimeUpdate,
        handleSeek,
        convertTime,
        prevAudio,
        nextAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
