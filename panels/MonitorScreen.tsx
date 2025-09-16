import React, { useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SerialStatus } from '../types';
import { StethoscopeIcon } from '../components/icons/StethoscopeIcon';

const MonitorScreen: React.FC = () => {
    const { serials, patients } = useAppContext();
    const { t } = useLanguage();

    const { nowServing, upNext } = useMemo(() => {
        const serving = serials.find(s => s.status === SerialStatus.InProgress || s.status === SerialStatus.Called);
        const next = serials.filter(s => s.status === SerialStatus.Pending).sort((a,b) => a.serialNumber - b.serialNumber).slice(0, 5);
        return { nowServing: serving, upNext: next };
    }, [serials]);

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white p-4 sm:p-8">
            <header className="flex flex-col sm:flex-row items-center justify-between pb-4 sm:pb-6 border-b-2 border-gray-700 gap-4">
                 <div className="flex items-center text-center sm:text-left">
                    <StethoscopeIcon className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400"/>
                    <h1 className="text-3xl sm:text-5xl font-bold ml-4">{t('drClinic')}</h1>
                 </div>
                 <div className="text-3xl sm:text-4xl font-semibold">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </div>
            </header>

            <main className="flex-grow flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-8 pt-4 sm:pt-8">
                {/* Now Serving Section */}
                <div className="lg:col-span-1 bg-green-500 rounded-2xl flex flex-col justify-center items-center p-4 sm:p-8 shadow-2xl order-1">
                    <h2 className="text-2xl sm:text-4xl font-semibold text-green-100 uppercase tracking-widest mb-2 sm:mb-4">{t('nowServing')}</h2>
                    <div className="text-7xl sm:text-9xl font-extrabold text-white transition-all duration-500">
                       {nowServing?.serialNumber || '--'}
                    </div>
                    <div className="text-2xl sm:text-4xl font-medium text-green-100 mt-2 sm:mt-4 text-center">
                        {nowServing ? patients.get(nowServing.patientId)?.name : t('pleaseWait')}
                    </div>
                </div>

                {/* Up Next Section */}
                <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-4 sm:p-8 shadow-2xl order-2 flex-grow flex flex-col">
                    <h2 className="text-2xl sm:text-4xl font-semibold text-gray-300 uppercase tracking-widest mb-4 sm:mb-6">{t('upNext')}</h2>
                    <div className="space-y-3 sm:space-y-5 flex-grow">
                        {upNext.length > 0 ? upNext.map((serial, index) => (
                             <div key={serial.id} className={`flex items-center justify-between p-3 sm:p-5 rounded-lg transition-all duration-300 ${index === 0 ? 'bg-blue-500' : 'bg-gray-700'}`}>
                                <span className={`text-4xl sm:text-6xl font-bold ${index === 0 ? 'text-white' : 'text-blue-400'}`}>
                                    {serial.serialNumber}
                                </span>
                                <span className={`text-2xl sm:text-4xl font-medium text-right ${index === 0 ? 'text-blue-100' : 'text-gray-200'}`}>
                                    {patients.get(serial.patientId)?.name}
                                </span>
                             </div>
                        )) : (
                            <div className="flex items-center justify-center h-full text-center text-gray-400 text-2xl sm:text-3xl">
                                {t('queueCurrentlyEmpty')}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MonitorScreen;
