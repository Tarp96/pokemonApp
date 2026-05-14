import { motion } from "framer-motion";

function TabTransition({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 5,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.18,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default TabTransition;
