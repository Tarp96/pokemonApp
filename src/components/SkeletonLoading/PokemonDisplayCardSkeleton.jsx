import Skeleton from "./Skeleton";

export default function PokemonDisplayCardSkeleton() {
  return (
    <div className="pokemon-card skeletonCard">
      <div className="favoriteButtonContainer">
        <Skeleton className="skIcon" />
      </div>

      <div className="audioButtonCardWrapper">
        <Skeleton className="skIcon" />
      </div>

      <Skeleton className="skSprite" />

      <Skeleton className="skTitle" />

      <Skeleton className="skSmallText" />

      <div className="types skTypes">
        <Skeleton className="skPill" />
        <Skeleton className="skPill" />
      </div>

      <Skeleton className="skButton" />
    </div>
  );
}
