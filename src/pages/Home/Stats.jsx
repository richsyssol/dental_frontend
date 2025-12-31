import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/api";

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback stats function
  const getFallbackStats = () => [];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(
        "Fetching stats from:",
        axiosInstance.defaults.baseURL + "/stats"
      );

      const response = await axiosInstance.get("/stats");
      console.log("API Response:", response);

      // Handle different API response structures
      if (response.data && response.data.success && response.data.data) {
        // Structure: {success: true, data: [...]}
        setStats(response.data.data);
      } else if (Array.isArray(response.data)) {
        // Structure: [...]
        setStats(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        // Structure: {data: [...]}
        setStats(response.data.data);
      } else {
        console.warn("Unexpected API response structure:", response.data);
        setError("Unexpected data format from server");
        // Fallback to static data
        setStats(getFallbackStats());
      }
    } catch (err) {
      console.error("Detailed Error:", err);

      let errorMessage = "Error loading statistics. Please try again later.";

      if (err.response) {
        // Server responded with error status
        console.error("Server Response Error:", err.response);
        errorMessage = `Server Error (${err.response.status}): `;

        if (err.response.data && err.response.data.message) {
          errorMessage += err.response.data.message;
        } else if (err.response.status === 500) {
          errorMessage += "Internal Server Error - Please check backend logs";
        } else {
          errorMessage += "Unable to load statistics";
        }
      } else if (err.request) {
        // Request made but no response received
        console.error("Network Error:", err.request);
        errorMessage =
          "Network error: Unable to connect to server. Please check if the backend is running.";
      } else {
        // Something else happened
        errorMessage = `Error: ${err.message}`;
      }

      setError(errorMessage);

      // Fallback to static data
      setStats(getFallbackStats());
    } finally {
      setLoading(false);
    }
  };

  // Use fallback stats if no stats are available
  const displayStats = stats.length > 0 ? stats : getFallbackStats();

  if (loading) {
    return (
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="p-6 rounded-lg animate-pulse">
                <div className="h-10 bg-teal-200 rounded mb-2 mx-auto w-20"></div>
                <div className="h-6 bg-teal-200 rounded mx-auto w-32"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-teal-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {displayStats.map((stat, index) => (
            <div
              key={stat.id || index}
              className="p-6 rounded-lg duration-300 hover:scale-105 transition-transform"
            >
              <div className="text-4xl font-bold text-teal-700 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-4 text-center">
            <div className="text-yellow-700 bg-yellow-50 p-4 rounded-lg mb-2">
              <div className="font-semibold">⚠️ Statistics Loading Issue</div>
              <div className="text-sm mt-1">{error}</div>
              <div className="text-xs text-gray-600 mt-2">
                {stats.length === 0
                  ? "Using fallback data. The statistics will update automatically when the server is available."
                  : "Showing cached data. Some statistics might not be up to date."}
              </div>
            </div>
            <button
              onClick={fetchStats}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
            >
              Retry Loading Stats
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Stats;
