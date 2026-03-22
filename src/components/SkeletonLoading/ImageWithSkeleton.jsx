import { useState, useEffect } from "react";

export const ImageWithSkeleton = ({
  src,
  alt,
  className = "",
  skeletonClassName = "",
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <div className={`imageWrapper ${className}`}>
      {!loaded && (
        <div className={`imageSkeleton ${skeletonClassName}`}>
          <img
            src="/assets/pokeball.svg"
            alt=""
            className="imageSkeletonIcon"
          />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`imageElement ${loaded ? "loaded" : ""}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
