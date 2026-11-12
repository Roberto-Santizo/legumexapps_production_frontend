const CREW_SHADES = ['bg-ink', 'bg-ink-muted', 'bg-ink-subtle'];

export const crewShade = (index: number): string => CREW_SHADES[index % CREW_SHADES.length];

export const crewMarks = (quantity: number): number[] => Array.from({ length: quantity }, (_, index) => index);
