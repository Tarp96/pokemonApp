import { useState, useEffect, useRef } from "react";

export const ImageWithSkeleton = ({
  src,
  alt,
  className = "",
  skeletonClassName = "",
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && src) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className={`imageWrapper ${className}`}>
      {!loaded && (
        <div className={`imageSkeleton ${skeletonClassName}`}>
          <img
            src="/assets/pokeballIcon.svg"
            alt=""
            className="imageSkeletonIcon"
          />
        </div>
      )}

      {src && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`imageElement ${loaded ? "loaded" : "hidden"}`}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
};
