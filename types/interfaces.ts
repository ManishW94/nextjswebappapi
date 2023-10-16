export interface User {
  name?: string | null | undefined;
  role?: string;
  avatar?: string;
  username?: string;
  accessToken?: string;
}

export interface SignOptions {
  expiresIn?: string | number;
}
