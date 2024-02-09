import { useCallback, useEffect, useRef, useState } from "react";

export const useSound = (soundUrl: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(new Audio(soundUrl));

  useEffect(() => {
    const audio = audioRef.current;

    // Event handlers
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => {
      setIsEnded(true);
    };
    const onPlaying = () => {
      setIsPlaying(true);
      setIsEnded(false);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("playing", onPlaying);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("playing", onPlaying);
    };
  }, [soundUrl]);

  const toggleSound = useCallback(() => {
    setIsPlaying((curr) => !curr);
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
  }, [isPlaying]);

  const toggleLoop = useCallback(() => {
    audioRef.current.loop = !isLooping;
    setIsLooping((curr) => !curr);
  }, [isLooping]);

  const replay = useCallback(() => {
    audioRef.current.currentTime = 0;
  }, []);

  const updateSound = useCallback(
    (soundUrl: string) => {
      audioRef.current.src = soundUrl;
      if (isPlaying) {
        audioRef.current.play();
      }

      if (isLooping) {
        audioRef.current.loop = true;
      }
    },
    [isPlaying, isLooping],
  );

  const updateCurrentTime = useCallback((position: number) => {
    audioRef.current.currentTime = position;
    setCurrentTime(position);
  }, []);

  return {
    toggleSound,
    toggleLoop,
    replay,
    isPlaying,
    isLooping,
    duration,
    updateCurrentTime,
    currentTime,
    updateSound,
    isEnded,
  };
};
