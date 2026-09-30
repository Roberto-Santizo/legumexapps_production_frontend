export function DrawerTasksLoadingState() {
    return (
        <div className="space-y-3" aria-busy="true" aria-label="Cargando tareas">
            {[0, 1, 2].map((item) => (
                <div key={item} className="h-40 animate-pulse rounded-xl border border-line bg-canvas motion-reduce:animate-none" />
            ))}
        </div>
    );
}
