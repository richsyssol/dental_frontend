// hooks/useTreatment.js
import { useState, useEffect } from "react";
import { treatmentsData } from "../constants/treatmentsData";

export const useTreatment = (treatmentSlug) => {
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTreatmentData = () => {
      setLoading(true);
      setError(null);

      try {
        // Get treatment data based on slug
        const treatmentData = treatmentsData[treatmentSlug];

        if (!treatmentData) {
          setError(new Error("Treatment not found"));
        } else {
          setTreatment(treatmentData);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (treatmentSlug) {
      fetchTreatmentData();
    }
  }, [treatmentSlug]);

  return { treatment, loading, error };
};
