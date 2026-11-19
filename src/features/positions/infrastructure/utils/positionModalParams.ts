export const SHOW_POSITION_PARAM = 'showPosition';

export const EDIT_POSITION_PARAM = 'editPosition';

export const mergeSearchParams = (search: string, next: Record<string, string | null>): string => {
    const params = new URLSearchParams(search);
    Object.entries(next).forEach(([key, value]) => {
        if (value === null) params.delete(key);
        else params.set(key, value);
    });
    return params.toString();
}
