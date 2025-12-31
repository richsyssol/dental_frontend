import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
  FaSearch,
  FaClock,
  FaFire,
  FaTags,
  FaBookmark,
} from "react-icons/fa";

const BlogPage = () => {
  // State management
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [blogsError, setBlogsError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    page: 1,
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 6,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // API base URL
  const API_BASE_URL = "https://dentalcarenasik.demovoting.com/api";

  // Fetch blogs from API
  const fetchBlogs = async (filters) => {
    try {
      setBlogsLoading(true);
      setBlogsError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.category && filters.category !== "All")
        params.append("category", filters.category);
      params.append("page", filters.page);

      const response = await fetch(
        `${API_BASE_URL}/blogs?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Set blogs data
      setBlogs(data.data || []);

      // Set pagination data from API response
      if (data.meta) {
        setPagination({
          current_page: data.meta.current_page,
          last_page: data.meta.last_page,
          per_page: data.meta.per_page,
          total: data.meta.total,
        });
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogsError(error.message || "Failed to fetch blogs");
      setBlogs([]);
    } finally {
      setBlogsLoading(false);
    }
  };

  // Calculate dynamic categories from blogs
  const dynamicCategories = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];

    // Get all unique categories from blogs with their counts
    const categoryMap = blogs.reduce((acc, blog) => {
      if (blog.category) {
        acc[blog.category] = (acc[blog.category] || 0) + 1;
      }
      return acc;
    }, {});

    // Convert to array of objects with name and count
    return Object.entries(categoryMap).map(([name, count], index) => ({
      id: index + 1,
      name,
      count,
    }));
  }, [blogs]);

  // Fetch blogs on component mount and when filters change
  useEffect(() => {
    console.log("Fetching blogs with filters:", filters);
    fetchBlogs(filters);
  }, [filters]);

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchQuery, page: 1 }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setFilters((prev) => ({ ...prev, category, page: 1 }));
  };

  const handlePageChange = (pageNumber) => {
    setFilters((prev) => ({ ...prev, page: pageNumber }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get current page blogs (already handled by API, but keeping for consistency)
  const currentBlogs = blogs;

  // Calculate total count for "All Categories"
  const allCategoriesCount = pagination.total;

  // Mock popular posts (you can replace this with actual popular posts from API)
  const popularPosts = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];
    return [...blogs]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 3);
  }, [blogs]);

  if (blogsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-30 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (blogsError) {
    return (
      <div className="min-h-screen bg-gray-50 pt-30 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-600 mb-4">
            Error Loading Articles
          </h3>
          <p className="text-gray-500 mb-4">{blogsError}</p>
          <button
            onClick={() => fetchBlogs(filters)}
            className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-40">
      {/* Header Section */}
      <section className="bg-teal-700 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Dr. Joshi's Dental Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-teal-100 max-w-3xl mx-auto"
          >
            Expert advice, oral health tips, and dental care insights from
            Nashik's leading dental clinic
          </motion.p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Search and Filter Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                  {/* Search Bar */}
                  <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={handleSearch}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCategorySelect("All")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === "All"
                          ? "bg-teal-700 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      All Categories ({allCategoriesCount})
                    </button>
                    {dynamicCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category.name
                            ? "bg-teal-700 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Blog Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              >
                {currentBlogs.map((blog, index) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                  >
                    <Link to={`/blog/${blog.slug}`}>
                      <div className="relative overflow-hidden">
                        <img
                          src={blog.image || "/default-blog-image.jpg"}
                          alt={blog.title}
                          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.target.src = "/default-blog-image.jpg";
                          }}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-teal-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {blog.category || "Uncategorized"}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-teal-700 transition-colors">
                          {blog.title}
                        </h2>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <FaUser className="mr-1" />
                              <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-1" />
                              <span>
                                {new Date(
                                  blog.published_date
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaClock className="mr-1" />
                            <span>{blog.read_time}</span>
                          </div>
                        </div>

                        <div className="flex items-center text-teal-700 font-medium hover:text-teal-800 transition-colors">
                          Read More <FaArrowRight className="ml-2" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>

              {/* No Results Message */}
              {currentBlogs.length === 0 && !blogsLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <h3 className="text-2xl font-bold text-gray-600 mb-4">
                    No articles found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </motion.div>
              )}

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center items-center space-x-2"
                >
                  <button
                    onClick={() =>
                      handlePageChange(pagination.current_page - 1)
                    }
                    disabled={pagination.current_page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>

                  {[...Array(pagination.last_page)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 border rounded-lg ${
                        pagination.current_page === index + 1
                          ? "bg-teal-700 text-white border-teal-700"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      handlePageChange(pagination.current_page + 1)
                    }
                    disabled={pagination.current_page === pagination.last_page}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8"
              >
                {/* Popular Posts */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-6">
                    <FaFire className="text-teal-700 mr-2" />
                    <h3 className="text-xl font-bold text-teal-700">
                      Popular Posts
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {popularPosts.map((blog, index) => (
                      <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Link
                          to={`/blog/${blog.slug}`}
                          className="flex items-center space-x-3 w-full"
                        >
                          <img
                            src={blog.image || "/default-blog-image.jpg"}
                            alt={blog.title}
                            className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                            onError={(e) => {
                              e.target.src = "/default-blog-image.jpg";
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-teal-700 transition-colors">
                              {blog.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(
                                blog.published_date
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-6">
                    <FaTags className="text-teal-700 mr-2" />
                    <h3 className="text-xl font-bold text-teal-700">
                      Categories
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {/* All Categories Option */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => handleCategorySelect("All")}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === "All"
                          ? "bg-teal-700 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="font-medium">All Categories</span>
                      <span className="float-right text-sm opacity-70">
                        ({allCategoriesCount})
                      </span>
                    </motion.button>

                    {/* Dynamic Categories */}
                    {dynamicCategories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ x: 5 }}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.name
                            ? "bg-teal-700 text-white"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="font-medium">{category.name}</span>
                        <span className="float-right text-sm opacity-70">
                          ({category.count})
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Newsletter Sidebar */}
                <div className="bg-teal-700 rounded-xl p-6 text-white shadow-lg">
                  <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                  <p className="text-teal-100 text-sm mb-4">
                    Get the latest dental health tips and insights directly in
                    your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-3 py-2 rounded-lg text-gray-700 text-sm border border-teal-500 focus:ring-2 focus:ring-white"
                    />
                    <button className="w-full bg-white text-teal-700 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
