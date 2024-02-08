import { useState } from "react";
import { songs } from "./data/songs";
import PlayIcon from "@assets/icons/play-icon.svg?react";
import PauseIcon from "@assets/icons/pause-icon.svg?react";
import ReplayIcon from "@assets/icons/replay-icon.svg?react";

import { useSound } from "./hooks";

export default function App() {
  const [activeSongIndex] = useState(0);
  const [activeSong] = useState(songs[activeSongIndex]);
  const { toggle, replay, isPlaying } = useSound(activeSong.src);

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
          <img
            src={activeSong.img}
            className="max-w-full h-full"
            alt={activeSong.imgAlt}
          />
        </div>

        <h2 className="text-header-1 text-center">{activeSong.name}</h2>

        <div className="text-center mb-12">
          <a
            className="text-header-2 text-white/60 transition-colors hover:text-green-100"
            href={activeSong.artist.website}
            target="_blank"
          >
            {activeSong.artist.name}
          </a>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="tooltip" data-tip="Replay">
            <button
              onClick={replay}
              className="btn btn-sm btn-neutral btn-circle"
            >
              <ReplayIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="tooltip" data-tip={isPlaying ? "Pause" : "Play"}>
            <button onClick={toggle} className="btn btn-neutral btn-circle">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
