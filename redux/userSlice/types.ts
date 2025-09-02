import { ImageType } from "@/utils/types";

export interface User {
    name: string;
    number:string;
    email: string;
    avatar?: ImageType;
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


  