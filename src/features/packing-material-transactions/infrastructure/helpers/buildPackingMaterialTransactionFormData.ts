import type { PackingMaterialTransactionCreateForm } from "@/features/packing-material-transactions/packing-material-transactions";

export const buildPackingMaterialTransactionFormData = (payload: PackingMaterialTransactionCreateForm): FormData => {
    const formData = new FormData();

    formData.append('reference', payload.reference);
    formData.append('responsable', payload.responsable);
    formData.append('type', String(payload.type));

    if (payload.observations) {
        formData.append('observations', payload.observations);
    }

    if (payload.weekly_plan_task_id) {
        formData.append('weekly_plan_task_id', String(payload.weekly_plan_task_id));
    }

    payload.items.forEach((item, index) => {
        formData.append(`items[${index}][quantity]`, String(item.quantity));
        formData.append(`items[${index}][lote]`, item.lote);
        formData.append(`items[${index}][packing_material_id]`, String(item.packing_material_id));

        if (item.destination) {
            formData.append(`items[${index}][destination]`, item.destination);
        }
    });

    if (payload.responsable_signature) {
        formData.append('responsable_signature', payload.responsable_signature);
    }

    if (payload.user_signature) {
        formData.append('user_signature', payload.user_signature);
    }

    return formData;
}
