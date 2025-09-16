export interface AuthLoginPayload {
  email: string;
  password: string;
}

export interface AuthRegisterPayload {
  email: string;
  password: string;
  username: string;
  password2: string;
}
