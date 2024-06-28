export interface Patient {
    id: number;
    first_name: string;
    last_name: string;
    score: number;
    device_id: number;
    email: string;
    phone: string;
    address: string;
    diagnosis: string;
    image_url: string;
    created_at: Date;
}