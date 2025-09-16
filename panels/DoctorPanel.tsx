import React, { useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SerialStatus } from '../types';
import SerialCard from '../components/SerialCard';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';

const DoctorPanel: React.FC = () => {
    const { serials, patients, updateSerialStatus, currentUser } = useAppContext();
    const { t } = useLanguage();

    const categorizedSerials = useMemo(() => {
        const nowServing = serials.find(s => s.status === SerialStatus.InProgress) || serials.find(s => s.status === SerialStatus.Called);
        const upcoming = serials.filter(s => s.status === SerialStatus.Pending).sort((a,b) => a.serialNumber - b.serialNumber);
        const completed = serials.filter(s => s.status === SerialStatus.Done).sort((a,b) => b.serialNumber - a.serialNumber);
        
        return { nowServing, upcoming, completed };
    }, [serials]);

    const handleMarkAsDone = () => {
        if (categorizedSerials.nowServing) {
            updateSerialStatus(categorizedSerials.nowServing.id, SerialStatus.Done);
        }
    };
    
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-brand-gray-900">{t('doctorDashboard')}</h1>
                <p className="text-lg text-brand-gray-600">{t('welcome')}, {currentUser?.name}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main panel for current and upcoming */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Now Serving */}
                    <div>
                        <h2 className="text-2xl font-bold text-brand-gray-800 mb-4">{t('nowServing')}</h2>
                        {categorizedSerials.nowServing ? (
                             <SerialCard 
                                serial={categorizedSerials.nowServing} 
                                patient={patients.get(categorizedSerials.nowServing.patientId)}
                                highlight={true}
                             >
                                <button
                                    onClick={handleMarkAsDone}
                                    disabled={categorizedSerials.nowServing.status !== SerialStatus.InProgress}
                                    className="w-full mt-4 py-3 px-4 bg-brand-green text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition duration-150 flex items-center justify-center disabled:bg-brand-gray-300 disabled:cursor-not-allowed"
                                >
                                    <CheckCircleIcon className="w-6 h-6 mr-2"/>
                                    {t('markAsDone')}
                                </button>
                             </SerialCard>
                        ) : (
                            <div className="bg-white rounded-xl shadow-soft p-6 text-center text-brand-gray-500">
                                <p>{t('noPatientServing')}</p>
                            </div>
                        )}
                    </div>
                    {/* Upcoming */}
                    <div>
                        <h2 className="text-2xl font-bold text-brand-gray-800 mb-4">{t('upcomingPatients')}</h2>
                        <div className="space-y-4">
                            {categorizedSerials.upcoming.length > 0 ? (
                                categorizedSerials.upcoming.slice(0,5).map(serial => (
                                    <SerialCard key={serial.id} serial={serial} patient={patients.get(serial.patientId)} />
                                ))
                            ) : (
                                <div className="bg-white rounded-xl shadow-soft p-6 text-center text-brand-gray-500">
                                    <p>{t('noMorePatients')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Side panel for completed */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-soft-lg p-6 sticky top-24">
                        <h2 className="text-2xl font-bold text-brand-gray-800 mb-4">{t('completedToday')}</h2>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                            {categorizedSerials.completed.length > 0 ? (
                                categorizedSerials.completed.map(serial => (
                                    <div key={serial.id} className="p-3 bg-brand-gray-50 rounded-lg flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-brand-gray-800">{patients.get(serial.patientId)?.name}</p>
                                            <p className="text-sm text-brand-gray-500">{t('serial')} #{serial.serialNumber}</p>
                                        </div>
                                        <CheckCircleIcon className="w-6 h-6 text-brand-green"/>
                                    </div>
                                ))
                            ) : (
                                <p className="text-brand-gray-500 text-center py-4">{t('noPatientsChecked')}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorPanel;
