export interface Profile {
  username: string;
  email: string;
  avatar: string;
}
export interface ProfileMe {
  avatar: string,
  created_at: string,
  date_joined: string,
  deleted_at: string | null,
  email: string,
  groups: string[],
  id: number,
  is_2fa_enabled: boolean,
  is_active: boolean,
  is_deleted: boolean,
  is_staff: boolean,
  is_superuser: boolean,
  is_verify: boolean,
  last_login: string,
  updated_at: string,
  user_permissions: string[],
  username: string,
}

