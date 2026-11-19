export type BoardView = 'loading' | 'error' | 'empty' | 'board' | 'board-pool';

export const getBoardView = (isLoading: boolean, errorMessage: string | undefined, slotsCount: number, showPool: boolean): BoardView => {
    if (isLoading) return 'loading';
    if (errorMessage) return 'error';
    if (slotsCount === 0) return 'empty';

    return showPool ? 'board-pool' : 'board';
};

export const getRosterView = (isLoading: boolean, isError: boolean, count: number): BoardView => {
    if (isLoading) return 'loading';
    if (isError) return 'error';
    if (count === 0) return 'empty';

    return 'board';
};
