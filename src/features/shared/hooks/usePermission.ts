import { useSelector } from 'react-redux';
import type { RootState } from '@/config/config';

export function usePermissions() {
    const user = useSelector((state: RootState) => state.auth.user)!;
    const permissions = user.permissions;

    const hasPermission = (perm: string) => user.permissions.includes(perm);

    return { permissions, hasPermission };
}
