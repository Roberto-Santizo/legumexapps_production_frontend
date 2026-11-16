import { findEmployeeById, isFinalMember, type ActivitySlot, type AdditionRow, type BoardCard, type BoardCardKind, type BoardTarget, type CandidateRow, type PendingActivityMove, type WeeklyPlanEmployee, type WeeklyPlanTaskEmployee, type ZoneTone } from "@/features/weekly-plan-task-employees/weekly-plan-task-employees";

const KEY_SEPARATOR = ':';

export const MAX_EMPTY_PLACES = 4;

export const toBoardCardKey = (kind: BoardCardKind, id: string): string => `${kind}${KEY_SEPARATOR}${id}`;

export const parseBoardCardKey = (key: string): { kind: BoardCardKind; id: string } => {
    const [kind, ...rest] = key.split(KEY_SEPARATOR);

    return { kind: kind as BoardCardKind, id: rest.join(KEY_SEPARATOR) };
};

export const getCardOwnerId = (key: string): string | undefined => {
    const { kind, id } = parseBoardCardKey(key);

    return kind === 'candidate' ? id : undefined;
};

export const getRemovedCandidates = (rows: CandidateRow[]): CandidateRow[] =>
    rows.filter((row) => row.action === 'remove');

const toRowCard = (row: CandidateRow, replacementEmployees: WeeklyPlanEmployee[]): BoardCard[] => {
    if (!isFinalMember(row)) return [];

    const key = toBoardCardKey('candidate', row.candidate.id);

    if (row.action === 'keep') {
        const { name, code, position } = row.candidate;
        return [{ key, name, code, position, activityId: row.lineActivityId }];
    }

    const replacement = findEmployeeById(replacementEmployees, row.replacementId);
    if (!replacement) return [];

    return [{
        key,
        name: replacement.name,
        code: replacement.code,
        position: row.candidate.position,
        activityId: row.lineActivityId,
        tag: `Reemplaza a ${row.candidate.name}`,
        replaced: true,
    }];
};

const toAdditionCard = (addition: AdditionRow, replacementEmployees: WeeklyPlanEmployee[]): BoardCard[] => {
    const employee = findEmployeeById(replacementEmployees, addition.employeeId);
    if (!employee) return [];

    return [{
        key: toBoardCardKey('addition', employee.id),
        name: employee.name,
        code: employee.code,
        position: employee.position,
        activityId: addition.lineActivityId,
        tag: 'Alta',
    }];
};

export const buildConfirmBoardCards = (rows: CandidateRow[], additions: AdditionRow[], replacementEmployees: WeeklyPlanEmployee[]): BoardCard[] => [
    ...rows.flatMap((row) => toRowCard(row, replacementEmployees)),
    ...additions.flatMap((addition) => toAdditionCard(addition, replacementEmployees)),
];

const toPositionTag = (assignment: WeeklyPlanTaskEmployee): string | undefined =>
    assignment.position_activity && assignment.position_activity !== assignment.activity
        ? `Puesto: ${assignment.position_activity}`
        : undefined;

export const buildRosterBoardCards = (assignments: WeeklyPlanTaskEmployee[], pendingMove?: PendingActivityMove): BoardCard[] =>
    assignments.map((assignment) => ({
        key: `${assignment.id}`,
        name: assignment.name,
        code: assignment.code,
        position: assignment.position,
        activityId: pendingMove?.id === assignment.id ? pendingMove.lineActivityId : assignment.line_activity_id ?? undefined,
        tag: toPositionTag(assignment),
    }));

export const getCardsAt = (cards: BoardCard[], target: BoardTarget): BoardCard[] =>
    cards.filter((card) => (card.activityId ?? null) === target);

export const getCardActivityIds = (cards: BoardCard[]): (number | undefined)[] =>
    cards.map((card) => card.activityId);

export const isCardAt = (card: BoardCard, target: BoardTarget): boolean =>
    (card.activityId ?? null) === target;

export const canDropOnSlot = (slot: ActivitySlot, card?: BoardCard): boolean =>
    card !== undefined && !isCardAt(card, slot.id) && slot.remaining > 0;

export const canDropOnPool = (allowUnassign: boolean, card?: BoardCard): boolean =>
    allowUnassign && card !== undefined && !isCardAt(card, null);

export const getEmptyPlaces = (slot: ActivitySlot): { shown: number; hidden: number } => {
    const free = Math.max(slot.remaining, 0);
    const shown = Math.min(free, MAX_EMPTY_PLACES);

    return { shown, hidden: free - shown };
};

export const findPendingKey = (pendingMove?: PendingActivityMove): string | undefined =>
    pendingMove ? `${pendingMove.id}` : undefined;

export const getZoneTone = (hasActive: boolean, canDrop: boolean, isOver: boolean, isOrigin: boolean): ZoneTone => {
    if (!hasActive || isOrigin) return 'idle';
    if (!canDrop) return 'blocked';

    return isOver ? 'over' : 'eligible';
};

export const formatOccupancy = (cards: BoardCard[], slots: ActivitySlot[]): string => {
    const placed = cards.filter((card) => card.activityId !== undefined).length;
    const capacity = slots.reduce((sum, slot) => sum + slot.quantity, 0);

    return `${placed} de ${capacity} lugares ocupados`;
};

const normalizeSearch = (value: string): string =>
    value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();

export const filterBoardCards = (cards: BoardCard[], query: string): BoardCard[] => {
    const needle = normalizeSearch(query);
    if (needle === '') return cards;

    return cards.filter((card) =>
        [card.name, card.code, card.position ?? '', card.tag ?? ''].some((field) => normalizeSearch(field).includes(needle))
    );
};
