import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
              <AlertTriangle className="text-red-600" size={48} />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-slate-800 mb-4">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-4">
              Page Not Found
            </h2>
            <p className="text-slate-600 mb-8">
              The page you are looking for doesn't exist or has been moved.
              Please check the URL or navigate back to our homepage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Home size={20} className="mr-2" />
              Go to Homepage
            </Link>

            <button
              onClick={() => window.history.back()}
              className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center justify-center"
            >
              <ArrowLeft size={20} className="mr-2" />
              Go Back
            </button>
          </div>

          <div className="mt-12 p-6 bg-slate-100 rounded-xl">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Popular Pages at RICH System Solutions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Software Development", path: "/services/development" },
                { name: "Training Programs", path: "/training" },
                { name: "Digital Marketing", path: "/services/marketing" },
              ].map((page, index) => (
                <Link
                  key={index}
                  to={page.path}
                  className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow text-blue-600 font-medium"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
