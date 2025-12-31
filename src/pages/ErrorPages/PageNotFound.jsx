import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";

const PageNotFound = () => {
  useSEO("notFound");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold text-slate-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-slate-600 mt-2 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. It might have been moved or
          deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Home size={20} className="mr-2" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
