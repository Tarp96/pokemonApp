import Skeleton from "./Skeleton";

export default function DetailPageOverviewSkeleton() {
  return (
    <div className="detailsPageContainer skeletonPage">
      <div className="detailsPageHeader">
        <Skeleton style={{ width: 100, height: 40 }} />

        <div className="detailPageMainTitleContainer">
          <Skeleton style={{ width: 160, height: 60 }} />
          <Skeleton style={{ width: 300, height: 50 }} />
          <Skeleton style={{ width: 160, height: 60 }} />
        </div>

        <div style={{ width: 100 }} />
      </div>

      <div className="detailsNavigationBar">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} style={{ width: 80, height: 20 }} />
          ))}
      </div>

      <div className="detailsTopSection">
        <div className="overviewPageTopInfoSection">
          <Skeleton style={{ width: "60%", height: 40 }} />

          <div className="flavorTextDiv">
            <Skeleton height="16px" />
            <Skeleton height="16px" />
            <Skeleton width="80%" height="16px" />
          </div>

          <div className="infoList">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} style={{ display: "flex", gap: 10 }}>
                  <Skeleton width="120px" height="14px" />
                  <Skeleton width="80px" height="14px" />
                </div>
              ))}
          </div>

          <div className="abilityInfoContainer">
            <Skeleton width="120px" height="20px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
          </div>
        </div>

        <div className="overviewPageMainImageContainer">
          <div className="audioButtonContainer">
            <Skeleton width="140px" height="36px" />
            <Skeleton width="140px" height="36px" />
          </div>

          <Skeleton style={{ width: "100%", height: 300 }} />

          <div className="overViewPageImageSwitchButtonContainer">
            <Skeleton style={{ width: "100%", height: 40 }} />
          </div>
        </div>
      </div>

      <div className="overViewMiddleSection">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="middleSectionInfo">
              <Skeleton width="120px" height="20px" />
              {Array(4)
                .fill(0)
                .map((_, j) => (
                  <Skeleton key={j} height="14px" />
                ))}
            </div>
          ))}
      </div>

      <div className="overViewEvolutionSection">
        <Skeleton width="200px" height="24px" />
        <Skeleton height="120px" />
      </div>

      <div className="overViewAlternativeFormSection">
        <Skeleton width="200px" height="24px" />
        <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} style={{ width: 150, height: 150 }} />
            ))}
        </div>
      </div>
    </div>
  );
}
