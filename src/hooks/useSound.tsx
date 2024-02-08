import { useCallback, useMemo, useState } from "react";

export const useSound = (soundUrl: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = useMemo(() => new Audio(soundUrl), [soundUrl]);

  const toggle = useCallback(() => {
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying((curr) => !curr);
  }, [audio, isPlaying]);

  return {
    toggle,
    isPlaying,
  };
};