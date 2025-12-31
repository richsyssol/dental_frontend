import { motion } from "framer-motion";
import { Briefcase, ArrowRight, ChevronsRight, BarChart2 } from "lucide-react";
import { drLogo } from "../assets/index";
const Logo = () => {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <img
          src={drLogo}
          alt="Dr.Joshi's Dental Care N Cure Logo"
          className="w-12 h-12 md:w-40  md:h-24"
        />
      </motion.div>
    </motion.div>
  );
};

export default Logo;
