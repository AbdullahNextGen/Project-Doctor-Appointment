
export enum UserRole {
    Admin = 'Admin',
    Doctor = 'Doctor',
    Patient = 'Patient',
    Monitor = 'Monitor'
}

export enum SerialStatus {
    Pending = 'Pending',
    Called = 'Called',
    InProgress = 'In-Progress',
    Done = 'Done',
    Cancelled = 'Cancelled'
}

export interface User {
    id: string;
    name: string;
    role: UserRole;
    phone?: string;
    email?: string;
}

export interface Patient {
    id: string;
    name: string;
    phone: string;
    userId: string;
}

export interface Serial {
    id: string;
    patientId: string;
    doctorId: string;
    serialNumber: number;
    date: string;
    status: SerialStatus;
    scheduledTime: string;
    estimatedTime: string;
    createdAt: string;
}
