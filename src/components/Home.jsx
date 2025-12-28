import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getCurrentGeo,
  searchIP,
  getHistory,
  deleteHistory,
  deleteMultipleHistory,
} from "../services/api";
import { isValidIP } from "../utils/validators";
import IPDisplay from "./IPDisplay";
import SearchHistory from "./SearchHistory";
import { LogoutIcon, SearchIcon, RefreshIcon } from "./Icons";
import "./Home.css";

const Home = () => {
  const { user, logout } = useAuth();
  const [currentGeo, setCurrentGeo] = useState(null);
  const [searchedGeo, setSearchedGeo] = useState(null);
  const [history, setHistory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [geoResponse, historyResponse] = await Promise.all([
        getCurrentGeo(),
        getHistory(),
      ]);
      setCurrentGeo(geoResponse.data);
      setHistory(historyResponse.data);
    } catch (err) {
      console.error("Failed to load initial data:", err);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    if (!searchInput.trim()) {
      setError("Please enter an IP address");
      return;
    }

    if (!isValidIP(searchInput.trim())) {
      setError("Invalid IP address format");
      return;
    }

    setLoading(true);

    try {
      const response = await searchIP(searchInput.trim());
      setSearchedGeo(response.data);

      // Refresh history
      const historyResponse = await getHistory();
      setHistory(historyResponse.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to search IP address");
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = async () => {
    setSearchInput("");
    setSearchedGeo(null);
    setError("");
  };

  const handleSelectHistory = (item) => {
    setSearchedGeo({
      ip: item.ip_address,
      city: item.city,
      region: item.region,
      country: item.country,
      loc: item.loc,
      org: item.org,
      postal: item.postal,
      timezone: item.timezone,
    });
    setSearchInput(item.ip_address);
  };

  const handleDeleteHistory = async (id) => {
    try {
      await deleteHistory(id);
      setHistory(history.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete history item:", err);
    }
  };

  const handleDeleteMultiple = async (ids) => {
    try {
      await deleteMultipleHistory(ids);
      setHistory(history.filter((item) => !ids.includes(item.id)));
    } catch (err) {
      console.error("Failed to delete history items:", err);
    }
  };

  if (initialLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>IP Geolocation Tracker</h1>
          <div className="header-user">
            <span>{user?.email}</span>
            <button onClick={logout} className="logout-btn" title="Logout">
              <LogoutIcon size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="home-main">
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter IP address to search"
                className="search-input"
                disabled={loading}
              />
              <button type="submit" className="search-btn" disabled={loading}>
                <SearchIcon size={18} />
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

            {searchedGeo && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="clear-btn"
              >
                <RefreshIcon size={16} />
                Clear Search
              </button>
            )}
          </form>

          {error && <div className="error-banner">{error}</div>}
        </div>

        <div className="content-grid">
          <div className="main-content">
            {searchedGeo ? (
              <IPDisplay data={searchedGeo} title="Search Result" />
            ) : (
              <IPDisplay data={currentGeo} title="Your IP Information" />
            )}
          </div>

          <div className="sidebar-content">
            <SearchHistory
              history={history}
              onSelectHistory={handleSelectHistory}
              onDeleteHistory={handleDeleteHistory}
              onDeleteMultiple={handleDeleteMultiple}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
