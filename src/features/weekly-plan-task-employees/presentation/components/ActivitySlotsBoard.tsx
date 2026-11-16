import { ActivitySlotRow, getSlotsCapacity, getSlotsUsed, StaffListEmpty, StaffListError, StaffListLoading, type ActivitySlot } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

type Props = {
    slots: ActivitySlot[];
    isLoading: boolean;
    errorMessage?: string;
    description: string;
}

export function ActivitySlotsBoard({ slots, isLoading, errorMessage, description }: Props) {
    const ready = !isLoading && !errorMessage;

    return (
        <section className="space-y-3">
            <div className="flex items-baseline justify-between gap-3">
                <div>
                    <h3 className="text-sm font-semibold text-ink">Lugares por actividad</h3>
                    <p className="mt-0.5 text-xs text-ink-muted">{description}</p>
                </div>

                {ready && slots.length > 0 && (
                    <span className="shrink-0 font-mono text-xs text-ink-subtle">
                        {getSlotsUsed(slots)} de {getSlotsCapacity(slots)} ocupados
                    </span>
                )}
            </div>

            <div className="overflow-hidden rounded-xl border border-line bg-surface">
                {isLoading && <StaffListLoading />}

                {errorMessage && <StaffListError message={errorMessage} />}

                {ready && slots.length === 0 && (
                    <StaffListEmpty
                        title="La línea no tiene actividades"
                        description="Configura las actividades y sus lugares en el detalle de la línea para poder asignar personal."
                    />
                )}

                {ready && slots.length > 0 && (
                    <ul className="divide-y divide-line">
                        {slots.map((slot) => <ActivitySlotRow key={slot.id} slot={slot} />)}
                    </ul>
                )}
            </div>
        </section>
    )
}
