import { ClipLoader } from "react-spinners";

const CenterSpinner = ({ size = 48 }) => (
  <div className="center-spinner" role="status" aria-live="polite">
    <ClipLoader size={size} />
    <span className="sr-only">Loading…</span>
  </div>
);

export default CenterSpinner;
