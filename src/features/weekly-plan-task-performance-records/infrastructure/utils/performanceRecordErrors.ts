export const isDuplicatePalletError = (message: string) => /^La pallet \d+ ya fue registrada/.test(message);

export const isTaskNotInProgressError = (message: string) => message.startsWith('Solo se pueden registrar tomas de rendimiento');
