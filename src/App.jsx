import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import AboutPage from "./pages/About/AboutPage";
import TreatmentsPage from "./pages/TreatmentsPage/TreatmentsPage";
import PatientSafetyPage from "./pages/PatientSafetyPage/PatientSafetyPage";
import ReviewsPage from "./pages/ReviewsPage/ReviewsPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import PageNotFound from "./pages/ErrorPages/PageNotFound";
import RootCanal from "./pages/TreatmentsPage/RootCanal";
import DentalImplants from "./pages/TreatmentsPage/DentalImplants";
import Doctors from "./pages/Doctors/Doctors";
import BlogDetailsPage from "./pages/BlogPage/BlogDetailsPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import LocationPage from "./pages/ContactUsPage/LocationPage";
import DeolaliCamp from "./pages/GalleryPage/DeolaliCamp";
import NashikRoad from "./pages/GalleryPage/NashikRoad";
import PrivacyPolicy from "./pages/Footer/PrivacyPolicy";
import TermsPage from "./pages/Footer/TermsPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<ContactUsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="treatments/:treatmentSlug" element={<TreatmentsPage />} />
        <Route path="patient-safety" element={<PatientSafetyPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailsPage />} />
        <Route path="/contact/:clinicSlug" element={<ContactUsPage />} />
        <Route path="/location/deolali-camp" element={<LocationPage />} />
        {/* <Route path="gallery" element={<GalleryPage />} /> */}
        {/* <Route path="/gallery/deolali-camp-gallery" element={<DeolaliCamp />} />
        <Route path="/gallery/nashik-road-gallery" element={<NashikRoad />} />
        */}
        <Route path="/gallery/deolali-camp-gallery" element={<GalleryPage />} />
        <Route path="/gallery/nashik-road-gallery" element={<GalleryPage />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
