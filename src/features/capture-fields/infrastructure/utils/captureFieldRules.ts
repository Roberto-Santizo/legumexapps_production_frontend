import type { CaptureField } from "@/features/capture-fields/capture-fields";

export const canEditCaptureField = (field: CaptureField): boolean => !field.is_system;

export const canDeleteCaptureField = (field: CaptureField): boolean => !field.is_system && !field.is_assigned;

export const isCaptureFieldStructureLocked = (field?: CaptureField): boolean => field?.is_assigned ?? false;
