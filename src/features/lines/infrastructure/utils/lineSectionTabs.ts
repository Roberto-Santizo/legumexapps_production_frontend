export const lineSectionTabs = [
    { id: 'fields', label: 'Formulario de captura' },
    { id: 'configurations', label: 'Configuraciones' },
    { id: 'dependencies', label: 'Líneas relacionadas' },
] as const;

export type LineSectionTab = typeof lineSectionTabs[number]['id'];

export const LINE_SECTION_TAB_PARAM = 'tab';

export const lineConfigurationsPath = (lineCode: string): string =>
    `/lineas/${lineCode}?${LINE_SECTION_TAB_PARAM}=configurations`;

export const getLineSectionTab = (searchParams: URLSearchParams): LineSectionTab => {
    const value = searchParams.get(LINE_SECTION_TAB_PARAM);
    return lineSectionTabs.find(item => item.id === value)?.id ?? 'fields';
}
