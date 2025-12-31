import { useSEO } from "../hooks/useSEO";

const SEO = ({ page, additionalTags }) => {
  useSEO(page, additionalTags);
  return null;
};

export default SEO;
