export default function PokemonDisplayCardSkeleton() {
  return (
    <div className="pokemon-card skeletonCard">
      <div className="favoriteButtonContainer">
        <div className="sk skIcon" />
      </div>

      <div className="audioButtonCardWrapper">
        <div className="sk skIcon" />
      </div>

      <div className="sk skSprite" />

      <div className="sk skTitle" />

      <div className="sk skSmallText" />

      <div className="types skTypes">
        <div className="sk skPill" />
        <div className="sk skPill" />
      </div>

      <div className="sk skButton" />
    </div>
  );
}
