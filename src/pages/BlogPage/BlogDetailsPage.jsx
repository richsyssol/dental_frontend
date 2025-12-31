import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaArrowLeft,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaFire,
  FaTags,
} from "react-icons/fa";

// Add fadeIn animation variant
const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    },
  },
});

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blogDetail, setBlogDetail] = useState(null);
  const [blogDetailLoading, setBlogDetailLoading] = useState(true);
  const [blogDetailError, setBlogDetailError] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);

  const API_BASE_URL = "https://dentalcarenasik.demovoting.com/api";

  // Fetch blog detail
  const fetchBlogDetail = async (slug) => {
    try {
      setBlogDetailLoading(true);
      setBlogDetailError(null);

      const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBlogDetail(data.data);
    } catch (error) {
      console.error("Error fetching blog detail:", error);
      setBlogDetailError(error.message || "Failed to fetch blog post");
    } finally {
      setBlogDetailLoading(false);
    }
  };

  // Fetch all blogs for sidebar
  const fetchAllBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAllBlogs(data.data || []);

      // Set recent posts (exclude current blog)
      const recent = (data.data || [])
        .filter((blog) => blog.slug !== slug)
        .slice(0, 3);
      setRecentPosts(recent);
    } catch (error) {
      console.error("Error fetching all blogs:", error);
      setAllBlogs([]);
      setRecentPosts([]);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchBlogDetail(slug);
      fetchAllBlogs();
    }
  }, [slug]);

  // Safe array for tags
  const tagsArray = blogDetail?.tags
    ? Array.isArray(blogDetail.tags)
      ? blogDetail.tags
      : typeof blogDetail.tags === "string"
      ? blogDetail.tags.split(",").map((tag) => tag.trim())
      : [blogDetail.tags]
    : [];

  // Sidebar data calculations
  const popularPosts = allBlogs
    .filter((blog) => blog.slug !== slug)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3);

  // Calculate categories count
  const categoriesCount = allBlogs.reduce((acc, blog) => {
    if (blog.category) {
      acc[blog.category] = (acc[blog.category] || 0) + 1;
    }
    return acc;
  }, {});

  const dynamicCategories = Object.entries(categoriesCount).map(
    ([name, count], index) => ({
      id: index,
      name,
      count,
    })
  );

  const allCategoriesCount = allBlogs.length;

  if (blogDetailLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (blogDetailError || !blogDetail) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center  justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The requested blog post could not be found.
          </p>
          <Link
            to="/blog"
            className="text-teal-500 hover:text-teal-600 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${blogDetail.title}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-26">
        <Link
          to="/blog"
          className="inline-flex items-center text-teal-500 hover:text-teal-600 font-medium"
        >
          <FaArrowLeft className="mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content - 3/4 width */}
          <div className="lg:w-3/4">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              {/* Featured Image */}
              <div className="mb-8 rounded-xl overflow-hidden">
                <img
                  src={blogDetail.image || "/default-blog-image.jpg"}
                  alt={blogDetail.title}
                  className="w-full h-64 md:h-96 object-cover"
                  onError={(e) => {
                    e.target.src = "/default-blog-image.jpg";
                  }}
                />
              </div>

              {/* Category and Metadata */}
              <div className="flex items-center justify-between mb-6">
                <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                  {blogDetail.category || "Uncategorized"}
                </span>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    <span>
                      {new Date(blogDetail.published_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    <span>{blogDetail.read_time}</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-4xl font-bold text-gray-900 mb-6">
                {blogDetail.title}
              </h1>

              {/* Author Info */}
              <div className="flex items-center space-x-4 mb-8 p-4 bg-white rounded-lg shadow-sm">
                <img
                  src={blogDetail.author_image || "/default-avatar.jpg"}
                  alt={blogDetail.author}
                  className="w-12 h-12 rounded-full"
                  onError={(e) => {
                    e.target.src = "/default-avatar.jpg";
                  }}
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {blogDetail.author}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {blogDetail.author_role}
                  </p>
                </div>
              </div>

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: blogDetail.content }}
              />

              {/* Tags - Fixed with safe array */}
              {tagsArray.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {tagsArray.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Buttons */}
              <div className="border-t border-b border-gray-200 py-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Share this article:
                </h3>
                <div className="flex space-x-4">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaFacebook size={20} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      shareText
                    )}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    <FaTwitter size={20} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                      shareUrl
                    )}&title=${encodeURIComponent(blogDetail.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </div>
            </motion.article>

            {/* Call to Action */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeIn("up", "spring", 0.3, 1)}
              className="mt-12 bg-gradient-to-r from-teal-700 to-teal-700 rounded-lg shadow-md p-8 text-center text-white"
            >
              <h3 className="text-2xl font-bold mb-4">
                Ready to Improve Your Dental Health?
              </h3>
              <p className="mb-6 text-teal-100">
                Schedule a consultation with our expert dental team in Nashik
                today.
              </p>
              <Link
                to="/contact/deolali-camp"
                className="inline-block bg-white text-teal-600 font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors"
              >
                Book Your Appointment Now
              </Link>
            </motion.div>
          </div>

          {/* Sidebar - Right column width adjusted */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Popular Posts */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-6">
                  <FaFire className="text-teal-500 mr-2" />
                  <h3 className="text-xl font-bold text-teal-500">
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
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          onError={(e) => {
                            e.target.src = "/default-blog-image.jpg";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-teal-500 transition-colors">
                            {blog.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(blog.published_date).toLocaleDateString()}
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
                  <FaTags className="text-teal-500 mr-2" />
                  <h3 className="text-xl font-bold text-teal-500">
                    Categories
                  </h3>
                </div>
                <div className="space-y-2">
                  {/* All Categories Option */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="w-full text-left px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  >
                    <Link to="/blog" className="flex justify-between w-full">
                      <span className="font-medium">All Categories</span>
                      <span className="text-sm opacity-70">
                        ({allCategoriesCount})
                      </span>
                    </Link>
                  </motion.div>

                  {/* Dynamic Categories */}
                  {dynamicCategories.map((category) => (
                    <motion.div
                      key={category.id}
                      whileHover={{ x: 5 }}
                      className="w-full text-left px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                    >
                      <Link
                        to={`/blog?category=${encodeURIComponent(
                          category.name
                        )}`}
                        className="flex justify-between w-full"
                      >
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm opacity-70">
                          ({category.count})
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Newsletter Sidebar */}
              <div className="bg-teal-900 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                <p className="text-teal-100 text-sm mb-4">
                  Get the latest dental health tips directly in your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm border border-teal-300 focus:ring-2 focus:ring-white focus:outline-none"
                  />
                  <button className="w-full bg-white text-teal-500 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
