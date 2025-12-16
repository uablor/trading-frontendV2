export interface User {
  id: number;
  last_login: string | null;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  is_deleted: boolean;
  deleted_at: string | null;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  is_verify: boolean;
  is_2fa_enabled: boolean;
  avatar: string | null;
  groups: any[];              // หรือ string[] ถ้ามีแค่ชื่อ group
  user_permissions: any[];    // หรือ string[] เช่นกัน
}
