export const lineSectionTabs = [
    { id: 'fields', label: 'Formulario de captura' },
    { id: 'activities', label: 'Actividades' },
    { id: 'positions', label: 'Posiciones' },
    { id: 'dependencies', label: 'Líneas relacionadas' },
] as const;

export type LineSectionTab = typeof lineSectionTabs[number]['id'];
