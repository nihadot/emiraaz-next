export interface User {
    name?: string;
    email: string;
    avatar: ImageItem;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthentication: boolean;
}

type ImageItem = {
    asset_id: string;
    secure_url: string;
    url: string;
    public_id: string;
  };
  