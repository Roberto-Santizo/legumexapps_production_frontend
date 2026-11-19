import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  show: boolean;
  className?: string;
  children: ReactNode;
};

export function Collapse({ show, className, children }: Props) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          key="collapse"
          className={className}
          initial={{
            height: 0,
            opacity: 0,
            overflow: "hidden",
          }}
          animate={{
            height: "auto",
            opacity: 1,
            transitionEnd: {
              overflow: "visible",
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            overflow: "hidden",
          }}
          transition={{
            duration: 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
