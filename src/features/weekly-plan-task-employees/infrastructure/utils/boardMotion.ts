import type { Transition } from "framer-motion";

export const CARD_LAYOUT_TRANSITION: Transition = {
    layout: { type: 'spring', stiffness: 520, damping: 42, mass: 0.8 },
    opacity: { duration: 0.18, ease: 'easeOut' },
};

export const HINT_TRANSITION: Transition = {
    duration: 0.18,
    ease: [0.22, 1, 0.36, 1],
};

export const getCardOpacity = (pending: boolean): number => (pending ? 0.6 : 1);
