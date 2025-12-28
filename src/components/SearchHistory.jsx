import React, { useState } from "react";
import { TrashIcon, ClockIcon, MapPinIcon } from "./Icons";
import "./SearchHistory.css";

const SearchHistory = ({
  history,
  onSelectHistory,
  onDeleteHistory,
  onDeleteMultiple,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(history.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    onDeleteMultiple(selectedIds);
    setSelectedIds([]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!history || history.length === 0) {
    return (
      <div className="search-history">
        <h2 className="history-title">Search History</h2>
        <div className="history-empty">
          <ClockIcon size={48} />
          <p>No search history yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-history">
      <div className="history-header">
        <h2 className="history-title">Search History</h2>
        {selectedIds.length > 0 && (
          <button
            className="delete-selected-btn"
            onClick={handleDeleteSelected}
          >
            <TrashIcon size={16} />
            Delete Selected ({selectedIds.length})
          </button>
        )}
      </div>

      <div className="history-controls">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={selectedIds.length === history.length}
            onChange={handleSelectAll}
          />
          <span>Select All</span>
        </label>
      </div>

      <div className="history-list">
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <label className="history-checkbox">
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
            </label>

            <div
              className="history-content"
              onClick={() => onSelectHistory(item)}
            >
              <div className="history-ip">
                <MapPinIcon size={16} />
                <span className="ip-address">{item.ip_address}</span>
              </div>

              <div className="history-details">
                <span className="location">
                  {[item.city, item.region, item.country]
                    .filter(Boolean)
                    .join(", ") || "Unknown location"}
                </span>
                <span className="timestamp">
                  <ClockIcon size={14} />
                  {formatDate(item.searched_at)}
                </span>
              </div>
            </div>

            <button
              className="delete-btn"
              onClick={() => onDeleteHistory(item.id)}
              title="Delete this item"
            >
              <TrashIcon size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
