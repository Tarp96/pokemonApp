import { useEffect, useRef } from "react";
import { Howl } from "howler";

const AudioPlayer = ({ src, children }) => {
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
    <>
      <button className="audioButton" onClick={playAudio}>
        {children}
      </button>
    </>
  );
};

export default AudioPlayer;
