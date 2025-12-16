export interface authtoken {
    access: string;
    refresh: string;
    user_id: number;
    email: string;
    username: string;
    is_active: boolean;
    is_2fa_enabled: boolean;
    group: string[];
    is_superuser: boolean;
}

export interface Email {
    email: string;
}