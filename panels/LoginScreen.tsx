import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { UserRole } from '../types';
import { StethoscopeIcon } from '../components/icons/StethoscopeIcon';

const LoginScreen: React.FC = () => {
    const { users, setCurrentUser } = useAppContext();
    const { t } = useLanguage();

    const handleLogin = (role: UserRole) => {
        const user = users.find(u => u.role === role);
        if (user) {
            setCurrentUser(user);
        }
    };
    
    const handlePatientLogin = (userId: string) => {
        const user = users.find(u => u.id === userId);
         if (user) {
            setCurrentUser(user);
        }
    }

    const patientUsers = users.filter(u => u.role === UserRole.Patient);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brand-gray-50 p-4">
            <div className="w-full max-w-4xl mx-auto">
                <div className="text-center mb-10">
                     <StethoscopeIcon className="h-12 w-12 sm:h-16 sm:w-16 text-brand-blue mx-auto" />
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-gray-800 mt-4">{t('welcomeToClinicQueue')}</h1>
                    <p className="text-lg sm:text-xl text-brand-gray-600 mt-2">{t('selectRole')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-soft-lg border border-brand-gray-200">
                         <h2 className="text-2xl font-bold text-center text-brand-gray-800 mb-6">{t('forStaffAndDisplay')}</h2>
                         <div className="space-y-4">
                             <button onClick={() => handleLogin(UserRole.Admin)} className="w-full text-left p-4 bg-brand-blue/5 hover:bg-brand-blue/10 rounded-lg transition-colors duration-200 flex items-center space-x-4">
                                <span className="p-3 bg-brand-blue/10 rounded-full">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-4 0h4" /></svg>
                                </span>
                                <div>
                                    <p className="font-semibold text-brand-gray-800">{t('adminReceptionist')}</p>
                                    <p className="text-sm text-brand-gray-500">{t('manageAppointments')}</p>
                                </div>
                             </button>
                             <button onClick={() => handleLogin(UserRole.Doctor)} className="w-full text-left p-4 bg-brand-green/5 hover:bg-brand-green/10 rounded-lg transition-colors duration-200 flex items-center space-x-4">
                                <span className="p-3 bg-brand-green/10 rounded-full"><StethoscopeIcon className="h-6 w-6 text-brand-green" /></span>
                                <div>
                                    <p className="font-semibold text-brand-gray-800">{t('doctor')}</p>
                                    <p className="text-sm text-brand-gray-500">{t('viewTodaySchedule')}</p>
                                </div>
                             </button>
                              <button onClick={() => handleLogin(UserRole.Monitor)} className="w-full text-left p-4 bg-brand-yellow/5 hover:bg-brand-yellow/10 rounded-lg transition-colors duration-200 flex items-center space-x-4">
                                <span className="p-3 bg-brand-yellow/10 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </span>
                                <div>
                                    <p className="font-semibold text-brand-gray-800">{t('monitorScreen')}</p>
                                    <p className="text-sm text-brand-gray-500">{t('publicDisplay')}</p>
                                </div>
                             </button>
                         </div>
                    </div>
                    
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-soft-lg border border-brand-gray-200">
                        <h2 className="text-2xl font-bold text-center text-brand-gray-800 mb-6">{t('forPatients')}</h2>
                        <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                             {patientUsers.map(user => (
                                 <button key={user.id} onClick={() => handlePatientLogin(user.id)} className="w-full text-left p-4 bg-brand-gray-50 hover:bg-brand-gray-100 rounded-lg transition-colors duration-200 flex items-center space-x-4">
                                    <span className="p-3 bg-brand-gray-200 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    </span>
                                     <div>
                                        <p className="font-semibold text-brand-gray-800">{user.name}</p>
                                        <p className="text-sm text-brand-gray-500">{t('viewMyAppointment')}</p>
                                     </div>
                                 </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
