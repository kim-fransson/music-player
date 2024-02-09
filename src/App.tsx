import { useEffect, useState } from "react";
import { songs } from "./data/songs";
import PlayIcon from "@assets/icons/play-icon.svg?react";
import PauseIcon from "@assets/icons/pause-icon.svg?react";
import ReplayIcon from "@assets/icons/replay-icon.svg?react";
import RepeatIcon from "@assets/icons/repeat-icon.svg?react";
import NextIcon from "@assets/icons/next-icon.svg?react";

import { useSound } from "./hooks";
import { Progress } from "./components";
import { motion } from "framer-motion";

export default function App() {
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [activeSong, setActiveSong] = useState(songs[activeSongIndex]);
  const {
    toggleSound,
    replay,
    toggleLoop,
    isPlaying,
    isLooping,
    duration,
    currentTime,
    updateCurrentTime,
  } = useSound(activeSong.src);

  useEffect(() => {
    console.log({
      activeSongIndex,
    });
    setActiveSong(songs[activeSongIndex]);
  }, [activeSongIndex]);

  const nextSong = () => {
    setActiveSongIndex((curr) => (curr + 1) % songs.length);
  };

  return (
    <div className="grid absolute-center max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl">
      <div className="h-60 overflow-hidden">
        <img
          className="blur-sm"
          src={activeSong.img}
          alt={`${activeSong.imgAlt} blurred`}
        />
      </div>
      <div className="bg-black-64 relative grid pt-36 pb-12 px-8">
        <div className="h-64 w-64 rounded-full border-white border-4 overflow-hidden absolute left-1/2 -translate-x-1/2 z-50 -translate-y-1/2">
          <motion.img
            src={activeSong.img}
            className="max-w-full h-full"
            alt={activeSong.imgAlt}
          />
        </div>

        <h2 className="text-header-1 text-center">{activeSong.name}</h2>

        <div className="text-center mb-12">
          <a
            className="text-header-2 text-white/60 link link-primary link-hover outline-none"
            href={activeSong.artist.website}
            target="_blank"
          >
            {activeSong.artist.name}
          </a>
        </div>

        <div className="flex items-center justify-center gap-4 text-light-gray">
          <div className="tooltip" data-tip="Replay">
            <button onClick={replay} className="btn btn-ghost btn-circle">
              <ReplayIcon className="" />
            </button>
          </div>

          <div className="tooltip" data-tip={isPlaying ? "Pause" : "Play"}>
            <button
              onClick={toggleSound}
              className="btn btn-neutral btn-circle btn-lg"
            >
              {isPlaying ? (
                <PauseIcon className="w-8 h-8" />
              ) : (
                <PlayIcon className="w-8 h-8" />
              )}
            </button>
          </div>

          <div className="tooltip" data-tip="Next">
            <button onClick={nextSong} className="btn btn-ghost btn-circle">
              <NextIcon />
            </button>
          </div>

          <div className="tooltip" data-tip="Repeat">
            <button onClick={toggleLoop} className="btn btn-ghost btn-circle">
              <RepeatIcon className={`${isLooping ? "text-green-100" : ""}`} />
            </button>
          </div>
        </div>

        <Progress
          progress={currentTime}
          duration={duration}
          onChange={updateCurrentTime}
        />
      </div>
    </div>
  );
}
