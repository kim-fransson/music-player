export const formatDuration = (duration: number): string => {
  if (typeof duration !== "number" || isNaN(duration) || duration < 0) {
    return "Invalid duration";
  }

  const minutes: number = Math.floor(duration / 60);
  const seconds: number = Math.floor(duration % 60);
  const paddedSeconds: string = String(seconds).padStart(2, "0");

  return `${minutes}:${paddedSeconds}`;
};
