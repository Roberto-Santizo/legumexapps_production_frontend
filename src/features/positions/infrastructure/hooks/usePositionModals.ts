import { getQueryParam } from "@/features/shared/shared";
import { EDIT_POSITION_PARAM, mergeSearchParams, SHOW_POSITION_PARAM } from "@/features/positions/positions";
import { useLocation, useNavigate } from "react-router-dom";

export function usePositionModals() {
    const location = useLocation();
    const navigate = useNavigate();

    const showId = getQueryParam(location, SHOW_POSITION_PARAM) ?? '';
    const editId = getQueryParam(location, EDIT_POSITION_PARAM) ?? '';

    const setParams = (next: Record<string, string | null>) =>
        navigate({ pathname: location.pathname, search: mergeSearchParams(location.search, next) });

    return {
        showId,
        editId,
        openShow: (id: number) => setParams({ [SHOW_POSITION_PARAM]: `${id}`, [EDIT_POSITION_PARAM]: null }),
        openEdit: (id: number) => setParams({ [SHOW_POSITION_PARAM]: null, [EDIT_POSITION_PARAM]: `${id}` }),
        close: () => setParams({ [SHOW_POSITION_PARAM]: null, [EDIT_POSITION_PARAM]: null })
    };
}
