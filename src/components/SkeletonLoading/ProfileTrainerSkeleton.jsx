import Skeleton from "./Skeleton";

export default function ProfileTrainerSkeleton() {
  return (
    <div className="profileLayout skeletonPage">
      <div className="trainerLeftColumn">
        <div className="trainerDetails">
          <div className="trainerNameContainer">
            <Skeleton style={{ width: 180, height: 32 }} />
            <Skeleton style={{ width: 120, height: 30 }} />
          </div>

          <Skeleton style={{ width: "80%", height: 20 }} />
          <Skeleton style={{ width: "60%", height: 20 }} />
        </div>

        <div className="profileDivider" />

        <div className="trainerStatsList">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="trainerStatRow">
              <Skeleton style={{ width: 140, height: 18 }} />
              <Skeleton style={{ width: 60, height: 20 }} />
            </div>
          ))}
        </div>
      </div>

      <div className="trainerAvatarColumn">
        <div className="trainerAvatarFrame">
          <Skeleton
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "12px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
