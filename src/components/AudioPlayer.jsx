import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";

let currentlyPlayingSound = null;

const AudioPlayer = ({ src, children, className = "", ...buttonProps }) => {
  const soundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [src],
      format: ["ogg", "mp3"],
      onend: () => setIsPlaying(false),
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [src]);

  const playAudio = () => {
    if (!soundRef.current) return;

    if (currentlyPlayingSound && currentlyPlayingSound !== soundRef.current) {
      currentlyPlayingSound.stop();
    }

    currentlyPlayingSound = soundRef.current;

    if (soundRef.current.playing()) {
      soundRef.current.stop();
      setIsPlaying(false);
    } else {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <button
      type="button"
      onClick={playAudio}
      className={className}
      disabled={!src}
      aria-pressed={isPlaying}
      aria-label={
        typeof children === "string"
          ? `${isPlaying ? "Stop" : "Play"} ${children}`
          : isPlaying
            ? "Stop audio"
            : "Play audio"
      }
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default AudioPlayer;
