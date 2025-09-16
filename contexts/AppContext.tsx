import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import { User, Patient, Serial, SerialStatus, UserRole } from '../types';
import { USERS, PATIENTS, SERIALS } from '../constants';

interface AppContextType {
    currentUser: User | null;
    users: User[];
    patients: Map<string, Patient>;
    serials: Serial[];
    setCurrentUser: (user: User | null) => void;
    updateSerialStatus: (serialId: string, status: SerialStatus) => void;
    addSerial: (patientName: string, phone: string, time: string) => void;
    findPatientByUserId: (userId: string) => Patient | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    // FIX: Add setUsers to allow updating the users state
    const [users, setUsers] = useState<User[]>(USERS);
    const [patients, setPatients] = useState<Map<string, Patient>>(new Map(PATIENTS.map(p => [p.id, p])));
    const [serials, setSerials] = useState<Serial[]>(SERIALS);

    const updateSerialStatus = useCallback((serialId: string, status: SerialStatus) => {
        setSerials(prevSerials => 
            prevSerials.map(s => s.id === serialId ? { ...s, status } : s)
        );
    }, []);

    // FIX: Wrap addSerial in useCallback and add dependencies
    const addSerial = useCallback((patientName: string, phone: string, time: string) => {
        const newPatientId = `patient-${patients.size + 1}`;
        // FIX: Simplify new user ID generation
        const newUserId = `user-${users.length + 1}`;

        const newUser: User = {
            id: newUserId,
            name: patientName,
            role: UserRole.Patient,
            phone: phone,
        };
        // This would be a DB transaction in a real app
        // Here we just update local state
        
        const newPatient: Patient = {
            id: newPatientId,
            name: patientName,
            phone: phone,
            userId: newUser.id
        };

        const newSerial: Serial = {
            id: `serial-${serials.length + 1}`,
            patientId: newPatientId,
            doctorId: 'user-1', // Assuming one doctor for this demo
            serialNumber: serials.length + 1,
            date: new Date().toISOString().split('T')[0],
            status: SerialStatus.Pending,
            scheduledTime: time,
            estimatedTime: time,
            createdAt: new Date().toISOString(),
        };
        
        // FIX: Update users state with the new user
        setUsers(prev => [...prev, newUser]);
        setPatients(prev => new Map(prev).set(newPatientId, newPatient));
        setSerials(prev => [...prev, newSerial].sort((a, b) => a.serialNumber - b.serialNumber));
    }, [users, patients, serials]);

    // FIX: Wrap findPatientByUserId in useCallback and add patients as a dependency
    const findPatientByUserId = useCallback((userId: string): Patient | undefined => {
        return Array.from(patients.values()).find(p => p.userId === userId);
    }, [patients]);

    // Simulate real-time queue progression
    useEffect(() => {
        const interval = setInterval(() => {
            setSerials(currentSerials => {
                const inProgress = currentSerials.find(s => s.status === SerialStatus.InProgress);
                if (inProgress) {
                    // Doctor is busy, do nothing this tick
                    return currentSerials;
                }
                
                const called = currentSerials.find(s => s.status === SerialStatus.Called);
                if (called) {
                    return currentSerials.map(s => s.id === called.id ? { ...s, status: SerialStatus.InProgress } : s);
                }

                const nextPending = currentSerials.find(s => s.status === SerialStatus.Pending);
                if (nextPending) {
                    return currentSerials.map(s => s.id === nextPending.id ? { ...s, status: SerialStatus.Called } : s);
                }

                return currentSerials;
            });
        }, 15000); // Progress the queue every 15 seconds

        return () => clearInterval(interval);
    }, []);


    return (
        <AppContext.Provider value={{ currentUser, users, patients, serials, setCurrentUser, updateSerialStatus, addSerial, findPatientByUserId }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
