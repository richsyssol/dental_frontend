import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSEO } from "../../hooks/useSEO";
import { Heart, Target, Eye, Award, Smile } from "lucide-react";
import { clinicnashikroad11 } from "../../assets";
import axiosInstance, { fileBaseURL } from "../../services/api"; // Make sure fileBaseURL is exported from your api file

const AboutPage = () => {
  useSEO("about");

  const [aboutStories, setAboutStories] = useState([]);
  const [visionMission, setVisionMission] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Starting data fetch...");

        // Fetch data in parallel for better performance
        const [storiesResponse, visionMissionResponse, teamMembersResponse] =
          await Promise.all([
            axiosInstance.get("/about-story"),
            axiosInstance.get("/vision-mission"),
            axiosInstance.get("/team-members"),
          ]);

        console.log("API Responses:", {
          stories: storiesResponse.data,
          visionMission: visionMissionResponse.data,
          teamMembers: teamMembersResponse.data,
        });

        // Handle About Stories
        let visibleStories = [];
        if (storiesResponse.data && Array.isArray(storiesResponse.data)) {
          visibleStories = storiesResponse.data
            .filter((story) => story.visible !== false) // Include if visible is true or undefined
            .sort((a, b) => (a.order || 0) - (b.order || 0));
        } else if (
          storiesResponse.data &&
          typeof storiesResponse.data === "object"
        ) {
          // If it's a single object, wrap it in array
          if (storiesResponse.data.visible !== false) {
            visibleStories = [storiesResponse.data];
          }
        }

        // Handle Vision & Mission
        let visionMissionData = null;
        if (visionMissionResponse.data) {
          if (Array.isArray(visionMissionResponse.data)) {
            visionMissionData =
              visionMissionResponse.data.find(
                (item) => item.visible !== false
              ) ||
              visionMissionResponse.data[0] ||
              null;
          } else {
            visionMissionData =
              visionMissionResponse.data.visible !== false
                ? visionMissionResponse.data
                : null;
          }
        }

        // Handle Team Members
        let visibleTeamMembers = [];
        if (
          teamMembersResponse.data &&
          Array.isArray(teamMembersResponse.data)
        ) {
          visibleTeamMembers = teamMembersResponse.data
            .filter((member) => member.visible !== false)
            .sort((a, b) => (a.order || 0) - (b.order || 0));
        } else if (
          teamMembersResponse.data &&
          typeof teamMembersResponse.data === "object"
        ) {
          // If it's a single object, wrap it in array
          if (teamMembersResponse.data.visible !== false) {
            visibleTeamMembers = [teamMembersResponse.data];
          }
        }

        console.log("Processed Data:", {
          visibleStories,
          visionMissionData,
          visibleTeamMembers,
        });

        setAboutStories(visibleStories);
        setVisionMission(visionMissionData);
        setTeamMembers(visibleTeamMembers);

        // If all data is empty, show appropriate message
        if (
          visibleStories.length === 0 &&
          !visionMissionData &&
          visibleTeamMembers.length === 0
        ) {
          setError(
            "No content available at the moment. Please check back later."
          );
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle image URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return clinicnashikroad11;

    // If it's already a full URL, return as is
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // If it's a relative path, prepend fileBaseURL
    return `${fileBaseURL}${imagePath}`;
  };

  // Function to render formatted text
  const renderFormattedText = (text) => {
    if (!text) return null;

    return text.split("\n").map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-b from-teal-50 via-white to-teal-50 min-h-screen pt-55 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-teal-700 text-lg">Loading content...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (
    error &&
    aboutStories.length === 0 &&
    !visionMission &&
    teamMembers.length === 0
  ) {
    return (
      <div className="bg-gradient-to-b from-teal-50 via-white to-teal-50 min-h-screen pt-55 px-4 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Content Not Available
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-teal-50 via-white to-teal-50 min-h-screen pt-55 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-4xl font-bold text-teal-900 mb-6">
          About Dr. Joshi's
        </h1>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-20">
        {/* Dynamic About Stories */}
        {aboutStories.length > 0 ? (
          aboutStories.map((story, index) => (
            <motion.div
              key={story.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="relative">
                <div className="bg-teal-200 rounded-3xl h-96 w-full absolute -z-10 transform rotate-3"></div>
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  src={getImageUrl(story.image)}
                  alt={story.title || "Our Story"}
                  className="rounded-2xl h-96 w-full object-cover"
                  onError={(e) => {
                    e.target.src = clinicnashikroad11;
                  }}
                />
              </div>

              <div className="rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <Heart className="text-teal-600 w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-teal-900">
                    {story.title || "Our Story"}
                  </h2>
                </div>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  {renderFormattedText(story.description)}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          // Fallback story section if no stories from API
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="relative">
              <div className="bg-teal-200 rounded-3xl h-96 w-full absolute -z-10 transform rotate-3"></div>
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                src={clinicnashikroad11}
                alt="Dr. Joshi's Clinic"
                className="rounded-2xl h-96 w-full object-cover"
              />
            </div>

            <div className="rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Heart className="text-teal-600 w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-teal-900">Our Story</h2>
              </div>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Content is being prepared. Please check back soon for our
                  complete story.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Vision & Mission */}
        {(visionMission ||
          aboutStories.length > 0 ||
          teamMembers.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Mission */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-50 text-teal-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <div className="text-lg leading-relaxed text-teal-800">
                {visionMission?.mission ? (
                  renderFormattedText(visionMission.mission)
                ) : (
                  <p>
                    Our mission details are being updated. Please check back
                    soon.
                  </p>
                )}
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-50 text-teal-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <div className="text-lg leading-relaxed text-teal-800">
                {visionMission?.vision ? (
                  renderFormattedText(visionMission.vision)
                ) : (
                  <p>
                    Our vision details are being updated. Please check back
                    soon.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Expert Team */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl p-8"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-4xl font-bold text-teal-900">
                Our Expert Team
              </h2>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Together, we are committed to enhancing your smile with the latest
              technology and techniques in a patient-centric environment.
            </p>
          </div>

          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl p-6 text-center transition-all duration-300 group hover:shadow-lg"
                >
                  <div className="relative mb-4">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-teal-400 to-teal-600 p-1 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={getImageUrl(member.image)}
                        alt={member.name || "Team Member"}
                        className="w-full h-full rounded-full object-cover border-4 border-white"
                        onError={(e) => {
                          e.target.src = clinicnashikroad11;
                        }}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-teal-900 mb-1">
                    {member.name || "Team Member"}
                  </h3>
                  <p className="text-teal-600 font-medium mb-2">
                    {member.role || "Dental Professional"}
                  </p>
                  <div className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm mb-3">
                    <Award className="w-3 h-3" />
                    {member.specialty || "Dentistry"}
                  </div>
                  <div className="flex justify-center mt-4">
                    <Smile className="w-5 h-5 text-amber-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                Our team information is being updated. Please check back soon to
                meet our experts.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
