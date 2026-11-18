import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  switchKey: string;
  className?: string;
  children: ReactNode;
};

export function FadeSwitch({ switchKey, className, children }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={switchKey}
        className={className}
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -4,
        }}
        transition={{
          duration: 0.22,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
