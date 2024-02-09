/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { songs } from "./data/songs";
import PlayIcon from "@assets/icons/play-icon.svg?react";
import PauseIcon from "@assets/icons/pause-icon.svg?react";
import ReplayIcon from "@assets/icons/replay-icon.svg?react";
import RepeatIcon from "@assets/icons/repeat-icon.svg?react";
import NextIcon from "@assets/icons/next-icon.svg?react";
import PreviousIcon from "@assets/icons/previous-icon.svg?react";
import SoundOnIcon from "@assets/icons/sound-on-icon.svg?react";
import SoundOffIcon from "@assets/icons/sound-off-icon.svg?react";

import { useSound } from "./hooks";
import { Progress, Volume } from "./components";
import { useDocumentTitle, usePrevious } from "@uidotdev/usehooks";

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
    updateSound,
    isEnded,
    volume,
    updateVolume,
  } = useSound(activeSong.src);

  const previousVolume = usePrevious(volume);
  useDocumentTitle(
    isPlaying
      ? `Playing: ${activeSong.name} by ${activeSong.artist.name}`
      : "Music Player",
  );

  useEffect(() => {
    const newSong = songs[activeSongIndex];
    setActiveSong(newSong);
    updateSound(newSong.src);
  }, [activeSongIndex]);

  const nextSong = () => {
    setActiveSongIndex((curr) => (curr + 1) % songs.length);
  };

  const previousSong = () => {
    setActiveSongIndex((curr) => (curr - 1 + songs.length) % songs.length);
  };

  const toggleMute = () => {
    if (volume === 0) {
      console.log(previousVolume);
      updateVolume(previousVolume < 3 ? 100 : previousVolume);
    } else {
      updateVolume(0);
    }
  };

  useEffect(() => {
    if (!isLooping && isEnded) {
      nextSong();
    }
  }, [isEnded, isLooping]);

  return (
    <div
      className="max-w-5xl h-dvh w-full bg-black-64 flex flex-col
    lg:h-4/5 lg:rounded-2xl lg:absolute-center lg:overflow-hidden lg:shadow-2xl"
    >
      <div
        className="h-1/4 bg-cover blur-sm bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${activeSong.img}")` }}
      />
      <div className="bg-black-64 relative flex-1 flex flex-col items-center lg:px-12 md:px-8 px-4 pb-8">
        <div
          className="h-64 w-64 rounded-full border-white border-4 absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2
        bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${activeSong.img}")` }}
        />

        <h2 className="lg:text-header-1 text-header-1-mobile text-center mt-36">
          {activeSong.name}
        </h2>

        <a
          className="lg:text-header-2 text-header-2-mobile text-white/60 link link-primary link-hover outline-none"
          href={activeSong.artist.website}
          target="_blank"
        >
          {activeSong.artist.name}
        </a>

        <div className="flex items-center justify-center relative md:gap-4 gap-2 text-light-gray mt-auto w-full">
          <div className="tooltip" data-tip="Replay">
            <button onClick={replay} className="btn btn-ghost btn-circle">
              <ReplayIcon className="" />
            </button>
          </div>

          <div className="tooltip" data-tip="Previous">
            <button onClick={previousSong} className="btn btn-ghost btn-circle">
              <PreviousIcon />
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

          <div className="md:flex absolute right-0 gap-2 items-center justify-center hidden">
            <div
              className="tooltip"
              data-tip={volume === 0 ? "Unmute" : "Mute"}
            >
              <button onClick={toggleMute} className="btn btn-ghost btn-circle">
                {volume === 0 ? <SoundOffIcon /> : <SoundOnIcon />}
              </button>
            </div>
            <Volume volume={volume} onChange={updateVolume} />
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
