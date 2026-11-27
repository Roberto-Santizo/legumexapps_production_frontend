export const performanceSectionTabs = [
    { id: 'activities', label: 'Actividades' },
    { id: 'positions', label: 'Posiciones' },
] as const;

export type PerformanceSectionTab = typeof performanceSectionTabs[number]['id'];

export const PERFORMANCE_SECTION_TAB_PARAM = 'tab';

export const getPerformanceSectionTab = (searchParams: URLSearchParams): PerformanceSectionTab => {
    const value = searchParams.get(PERFORMANCE_SECTION_TAB_PARAM);
    return performanceSectionTabs.find(item => item.id === value)?.id ?? 'activities';
}
