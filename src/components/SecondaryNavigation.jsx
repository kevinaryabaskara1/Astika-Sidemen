import "../styles/SecondaryNavigation.css";
import { Link, useLocation } from "react-router-dom";
import { Bed, Compass, Package } from "lucide-react";

const tabs = [
  { path: "/book/accommodations", label: "Accommodation", icon: Bed },
  { path: "/book/activities", label: "Activities", icon: Compass },
  { path: "/book/packages", label: "Packages", icon: Package },
];

const SecondaryNavigation = () => {
  const location = useLocation();

  return (
    <div className="secondary-nav-wrapper">
      <nav className="secondary-nav">
        <div className="secondary-nav-inner">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`secondary-nav-tab ${isActive ? "active" : ""}`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default SecondaryNavigation;
