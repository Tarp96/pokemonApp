import { NavLink } from "react-router-dom";

export const PageNavigationBar = ({ links }) => {
  return (
    <div className="detailsNavigationBar">
      {links.map(({ path, label }) => (
        <NavLink key={path} to={path} end>
          {label}
        </NavLink>
      ))}
    </div>
  );
};
