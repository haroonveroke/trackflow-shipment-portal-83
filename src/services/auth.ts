
import { API_BASE_URL } from '@/config/api';

interface LoginResponse {
  user: {
    email: string;
    role: 'manager' | 'staff' | 'agent';
  };
  token?: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};
