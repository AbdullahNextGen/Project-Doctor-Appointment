import React from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import { LanguageProvider } from './contexts/LanguageContext';
import LoginScreen from './panels/LoginScreen';
import AdminPanel from './panels/AdminPanel';
import DoctorPanel from './panels/DoctorPanel';
import PatientPanel from './panels/PatientPanel';
import MonitorScreen from './panels/MonitorScreen';
import { UserRole } from './types';
import Header from './components/Header';

const AppContent: React.FC = () => {
    const { currentUser } = useAppContext();

    const renderPanel = () => {
        if (!currentUser) {
            return <LoginScreen />;
        }

        switch (currentUser.role) {
            case UserRole.Admin:
                return <AdminPanel />;
            case UserRole.Doctor:
                return <DoctorPanel />;
            case UserRole.Patient:
                return <PatientPanel />;
            case UserRole.Monitor:
                return <MonitorScreen />;
            default:
                return <LoginScreen />;
        }
    };
    
    return (
        <div className="min-h-screen bg-brand-gray-100 text-brand-gray-800">
            {currentUser && currentUser.role !== UserRole.Monitor && <Header />}
            <main>
                {renderPanel()}
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <LanguageProvider>
                <AppContent />
            </LanguageProvider>
        </AppProvider>
    );
};

export default App;
