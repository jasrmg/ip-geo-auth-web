import React from "react";
import { MapPinIcon, GlobeIcon } from "./Icons";
import "./IPDisplay.css";

const IPDisplay = ({ data, title = "Your IP Information" }) => {
  if (!data) return null;

  return (
    <div className="ip-display">
      <h2 className="ip-display-title">{title}</h2>

      <div className="ip-main">
        <GlobeIcon size={24} />
        <div>
          <div className="ip-label">IP Address</div>
          <div className="ip-value">{data.ip}</div>
        </div>
      </div>

      <div className="ip-grid">
        <div className="ip-item">
          <div className="ip-label">City</div>
          <div className="ip-value">{data.city || "N/A"}</div>
        </div>

        <div className="ip-item">
          <div className="ip-label">Region</div>
          <div className="ip-value">{data.region || "N/A"}</div>
        </div>

        <div className="ip-item">
          <div className="ip-label">Country</div>
          <div className="ip-value">{data.country || "N/A"}</div>
        </div>

        <div className="ip-item">
          <div className="ip-label">Postal Code</div>
          <div className="ip-value">{data.postal || "N/A"}</div>
        </div>

        <div className="ip-item">
          <div className="ip-label">Timezone</div>
          <div className="ip-value">{data.timezone || "N/A"}</div>
        </div>

        <div className="ip-item">
          <div className="ip-label">Coordinates</div>
          <div className="ip-value">{data.loc || "N/A"}</div>
        </div>
      </div>

      {data.org && (
        <div className="ip-org">
          <div className="ip-label">Organization</div>
          <div className="ip-value">{data.org}</div>
        </div>
      )}
    </div>
  );
};

export default IPDisplay;
