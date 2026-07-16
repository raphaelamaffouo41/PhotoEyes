export interface LoginResponse {
  message: string;
  nom: string;
  email: string;
  role: 'CLIENT' | 'PHOTOGRAPHE' | 'ADMIN';
}