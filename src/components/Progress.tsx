import { formatDuration } from "@/utils";
import { motion } from "framer-motion";
import { Label, Slider, SliderThumb, SliderTrack } from "react-aria-components";

export type ProgressProps = {
  progress: number;
  duration: number;
  onChange: (value: number) => void;
};
export const Progress = ({ progress, duration, onChange }: ProgressProps) => {
  return (
    <Slider
      maxValue={Math.floor(duration)}
      value={Math.floor(progress)}
      onChange={onChange}
      className="mt-4 px-8 text-subtext text-white/60 relative items-center justify-center flex"
    >
      <span className="absolute left-0 top-1/2 -translate-y-1/2">
        {formatDuration(progress)}
      </span>
      <SliderTrack className="relative w-full group h-7 mx-4">
        {({ state }) => (
          <>
            {/* track */}
            <div className="absolute h-2 top-[50%] translate-y-[-50%] w-full rounded-full bg-white/40" />
            {/* fill */}
            <SliderThumb
              className="h-5 w-5 top-[50%] rounded-full bg-white outline-none transition peer z-50
            focus-visible:opacity-100 opacity-0 dragging:opacity-100 group-hover:opacity-100"
            />
            <motion.div
              animate={{ width: state.getThumbPercent(0) * 100 + "%" }}
              className="absolute h-2 top-[50%] translate-y-[-50%] rounded-full bg-white 
              peer-focus-visible:bg-green-100 peer-dragging:bg-green-100 group-hover:bg-green-100
              transition"
            />
          </>
        )}
      </SliderTrack>
      <Label className="absolute right-0 top-1/2 -translate-y-1/2">
        {formatDuration(duration)}
      </Label>
    </Slider>
  );
};
