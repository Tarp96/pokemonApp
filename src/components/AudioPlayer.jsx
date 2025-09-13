import { useEffect, useRef } from "react";
import { Howl } from "howler";

const AudioPlayer = ({ src, children, className = "", ...buttonProps }) => {
  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [src],
      format: ["ogg", "mp3"],
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [src]);

  const playAudio = () => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  return (
    <button
      type="button"
      onClick={playAudio}
      className={className}
      disabled={!src}
      aria-label={
        typeof children === "string" ? `Play ${children}` : "Play audio"
      }
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default AudioPlayer;
