export interface User {
    id: number;
    score: number;
    device_uid: number;
    address: string;
    status: number;
    created_at?: string;
    updated_at?:string;

}