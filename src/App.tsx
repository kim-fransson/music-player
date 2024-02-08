import { useState } from "react";
import { songs } from "./data/songs";

export default function App() {
  const [activeSongIndex] = useState(0);
  const [activeSong] = useState(songs[activeSongIndex]);
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
        <a
          className="text-header-2 text-white/60 text-center transition-colors hover:text-green-100"
          href={activeSong.artist.website}
          target="_blank"
        >
          {activeSong.artist.name}
        </a>
      </div>
    </div>
  );
}
