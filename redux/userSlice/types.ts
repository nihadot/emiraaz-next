export interface User {
    name: string;
    number:string;
    email: string;
    avatar?: ImageItem;
    nationality?:string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthentication: boolean;
    ready: boolean
}

type ImageItem = {
    asset_id: string;
    secure_url: string;
    url: string;
    public_id: string;
  };
  