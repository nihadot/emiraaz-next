import { ImageType } from "@/utils/types";

export interface User {
    name?: string;
    email: string;
    avatar: ImageType;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthentication: boolean;
}
