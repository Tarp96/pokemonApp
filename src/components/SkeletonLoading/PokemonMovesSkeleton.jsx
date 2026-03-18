import Skeleton from "./Skeleton";

export default function PokemonMovesSkeleton() {
  return (
    <div className="movesPage skeletonPage">
      <div className="movesHeader">
        <Skeleton className="movesSkeletonImage" />
        <Skeleton className="movesSkeletonTitle" />
      </div>

      <div className="movesTableSkeleton">
        <div className="movesTableSkeletonHeader">
          <Skeleton className="movesSkeletonHeaderCell" />
          <Skeleton className="movesSkeletonHeaderCell" />
          <Skeleton className="movesSkeletonHeaderCell" />
          <Skeleton className="movesSkeletonHeaderCell" />
          <Skeleton className="movesSkeletonHeaderCell" />
          <Skeleton className="movesSkeletonHeaderCell" />
          <Skeleton className="movesSkeletonHeaderCell movesSkeletonEffectHeader" />
        </div>

        {Array.from({ length: 8 }).map((_, index) => (
          <div className="movesTableSkeletonRow" key={index}>
            <Skeleton className="movesSkeletonName" />
            <Skeleton className="movesSkeletonType" />
            <Skeleton className="movesSkeletonCategory" />
            <Skeleton className="movesSkeletonSmall" />
            <Skeleton className="movesSkeletonSmall" />
            <Skeleton className="movesSkeletonSmall" />
            <Skeleton className="movesSkeletonEffect" />
          </div>
        ))}
      </div>
    </div>
  );
}
