export const isMorningShift = (shift: number): boolean => Boolean(shift);

export const lineShiftLabel = (shift: number): string => isMorningShift(shift) ? 'AM' : 'PM';
