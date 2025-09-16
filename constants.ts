
import { User, Patient, Serial, UserRole, SerialStatus } from './types';

export const USERS: User[] = [
    { id: 'user-1', name: 'Dr. Evelyn Reed', role: UserRole.Doctor, email: 'evelyn.reed@clinic.com' },
    { id: 'user-2', name: 'John Carter (Reception)', role: UserRole.Admin, email: 'reception@clinic.com' },
    { id: 'user-3', name: 'Alice Johnson', role: UserRole.Patient, phone: '555-0101' },
    { id: 'user-4', name: 'Bob Williams', role: UserRole.Patient, phone: '555-0102' },
    { id: 'user-5', name: 'Charlie Brown', role: UserRole.Patient, phone: '555-0103' },
    { id: 'user-6', name: 'Diana Miller', role: UserRole.Patient, phone: '555-0104' },
    { id: 'user-7', name: 'Ethan Davis', role: UserRole.Patient, phone: '555-0105' },
    { id: 'user-8', name: 'Fiona Garcia', role: UserRole.Patient, phone: '555-0106' },
    { id: 'user-9', name: 'George Clark', role: UserRole.Patient, phone: '555-0107' },
    { id: 'user-10', name: 'Waiting Room Display', role: UserRole.Monitor },
];

export const PATIENTS: Patient[] = [
    { id: 'patient-1', name: 'Alice Johnson', phone: '555-0101', userId: 'user-3' },
    { id: 'patient-2', name: 'Bob Williams', phone: '555-0102', userId: 'user-4' },
    { id: 'patient-3', name: 'Charlie Brown', phone: '555-0103', userId: 'user-5' },
    { id: 'patient-4', name: 'Diana Miller', phone: '555-0104', userId: 'user-6' },
    { id: 'patient-5', name: 'Ethan Davis', phone: '555-0105', userId: 'user-7' },
    { id: 'patient-6', name: 'Fiona Garcia', phone: '555-0106', userId: 'user-8' },
    { id: 'patient-7', name: 'George Clark', phone: '555-0107', userId: 'user-9' },
];

const today = new Date().toISOString().split('T')[0];

export const SERIALS: Serial[] = [
    { id: 'serial-1', patientId: 'patient-1', doctorId: 'user-1', serialNumber: 1, date: today, status: SerialStatus.Done, scheduledTime: '10:00 AM', estimatedTime: '10:00 AM', createdAt: new Date().toISOString() },
    { id: 'serial-2', patientId: 'patient-2', doctorId: 'user-1', serialNumber: 2, date: today, status: SerialStatus.InProgress, scheduledTime: '10:15 AM', estimatedTime: '10:15 AM', createdAt: new Date().toISOString() },
    { id: 'serial-3', patientId: 'patient-3', doctorId: 'user-1', serialNumber: 3, date: today, status: SerialStatus.Called, scheduledTime: '10:30 AM', estimatedTime: '10:30 AM', createdAt: new Date().toISOString() },
    { id: 'serial-4', patientId: 'patient-4', doctorId: 'user-1', serialNumber: 4, date: today, status: SerialStatus.Pending, scheduledTime: '10:45 AM', estimatedTime: '10:45 AM', createdAt: new Date().toISOString() },
    { id: 'serial-5', patientId: 'patient-5', doctorId: 'user-1', serialNumber: 5, date: today, status: SerialStatus.Pending, scheduledTime: '11:00 AM', estimatedTime: '11:00 AM', createdAt: new Date().toISOString() },
    { id: 'serial-6', patientId: 'patient-6', doctorId: 'user-1', serialNumber: 6, date: today, status: SerialStatus.Pending, scheduledTime: '11:15 AM', estimatedTime: '11:15 AM', createdAt: new Date().toISOString() },
    { id: 'serial-7', patientId: 'patient-7', doctorId: 'user-1', serialNumber: 7, date: today, status: SerialStatus.Cancelled, scheduledTime: '11:30 AM', estimatedTime: '11:30 AM', createdAt: new Date().toISOString() },
];
