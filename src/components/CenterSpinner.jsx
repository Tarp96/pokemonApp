import { ClipLoader } from "react-spinners";

const CenterSpinner = ({ size = 48 }) => (
  <div
    role="status"
    aria-live="polite"
    style={{
      minHeight: 240,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    }}
  >
    <ClipLoader size={size} />
    <span className="sr-only">Loading…</span>
  </div>
);

export default CenterSpinner;
