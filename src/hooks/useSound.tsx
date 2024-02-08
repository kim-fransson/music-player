import { useCallback, useMemo, useState } from "react";

export const useSound = (soundUrl: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const audio = useMemo(() => new Audio(soundUrl), [soundUrl]);

  const toggleSound = useCallback(() => {
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying((curr) => !curr);
  }, [audio, isPlaying]);

  const toggleLoop = useCallback(() => {
    audio.loop = !isLooping;
    setIsLooping((curr) => !curr);
  }, [audio, isLooping]);

  const replay = useCallback(() => {
    audio.currentTime = 0;
  }, [audio]);

  return {
    toggleSound,
    toggleLoop,
    replay,
    isPlaying,
    isLooping,
  };
};
