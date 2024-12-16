export interface Student{
    _id: string;
    fname: string;
    lname: string;
    email: string;
    password: string;
    role: string;
}

export interface LoginPayload{
    email: string;
    password: string;
}
export interface RegisterPayload{
    fname: string;
    lname: string;
    email: string;
    password: string;
}

export interface ApiResponse<T>{
    status?: boolean;
    message?: string;
    error?: string;
    token?: string;
    data: T
}