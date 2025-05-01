
export interface UserData {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  is_approved: boolean;
  role: string;
  created_at: string;
  last_sign_in_at?: string | null;
}
