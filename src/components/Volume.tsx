import { motion } from "framer-motion";
import { Slider, SliderThumb, SliderTrack } from "react-aria-components";

export type VolumeProps = {
  volume: number;
  onChange: (value: number) => void;
};
export const Volume = ({ volume, onChange }: VolumeProps) => {
  return (
    <Slider
      aria-label="change volume"
      maxValue={100}
      value={volume}
      onChange={onChange}
      className="text-subtext text-white/60"
    >
      <SliderTrack className="relative w-36 group h-7">
        {({ state }) => (
          <div>
            {/* track */}
            <div className="absolute h-2 top-[50%] translate-y-[-50%] w-full rounded-full bg-white/40" />
            {/* fill */}
            <SliderThumb
              className="h-4 w-4 top-[50%] rounded-full bg-white outline-none transition peer z-50
            focus-visible:opacity-100 opacity-0 dragging:opacity-100 group-hover:opacity-100"
            />
            <motion.div
              animate={{ width: state.getThumbPercent(0) * 100 + "%" }}
              className="absolute h-2 top-[50%] translate-y-[-50%] rounded-full bg-white 
              peer-focus-visible:bg-green-100 peer-dragging:bg-green-100 group-hover:bg-green-100
              transition"
            />
          </div>
        )}
      </SliderTrack>
    </Slider>
  );
};
