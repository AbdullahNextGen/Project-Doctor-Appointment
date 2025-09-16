import React, { useState, useMemo } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SerialStatus } from '../types';
import SerialCard from '../components/SerialCard';
import Modal from '../components/Modal';
import { translations } from '../translations';


const statusKeyMap: Record<SerialStatus, keyof typeof translations.en> = {
    [SerialStatus.Pending]: 'pending',
    [SerialStatus.Called]: 'called',
    [SerialStatus.InProgress]: 'inProgressStatus',
    [SerialStatus.Done]: 'done',
    [SerialStatus.Cancelled]: 'cancelled',
};

const AddSerialForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { addSerial } = useAppContext();
    const { t } = useLanguage();
    const [patientName, setPatientName] = useState('');
    const [phone, setPhone] = useState('');
    const [time, setTime] = useState('12:00 PM');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(patientName && phone && time) {
            addSerial(patientName, phone, time);
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="patientName" className="block text-sm font-medium text-brand-gray-700">{t('patientName')}</label>
                <input type="text" id="patientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-brand-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm" required />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-brand-gray-700">{t('phoneNumber')}</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-brand-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm" required />
            </div>
            <div>
                <label htmlFor="time" className="block text-sm font-medium text-brand-gray-700">{t('scheduledTime')}</label>
                <input type="text" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-brand-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm" placeholder={t('placeholderTime')} required />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-brand-gray-200 text-brand-gray-800 font-semibold rounded-lg hover:bg-brand-gray-300 transition">{t('cancel')}</button>
                <button type="submit" className="px-4 py-2 bg-brand-blue text-white font-semibold rounded-lg shadow-sm hover:bg-blue-600 transition">{t('addSerial')}</button>
            </div>
        </form>
    );
};


const AdminPanel: React.FC = () => {
    const { serials, patients, updateSerialStatus } = useAppContext();
    const { t } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sortedSerials = useMemo(() => {
        return [...serials].sort((a, b) => a.serialNumber - b.serialNumber);
    }, [serials]);

    const liveQueue = useMemo(() => {
        const inProgress = sortedSerials.find(s => s.status === SerialStatus.InProgress);
        const called = sortedSerials.find(s => s.status === SerialStatus.Called);
        const upNext = sortedSerials.filter(s => s.status === SerialStatus.Pending).slice(0, 3);
        return { inProgress, called, upNext };
    }, [sortedSerials]);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-brand-gray-900">{t('receptionistDashboard')}</h1>
                <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto px-5 py-2 bg-brand-blue text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    {t('addNewSerial')}
                </button>
            </div>

            {/* Live Queue Section */}
            <div className="mb-8 p-6 bg-white rounded-xl shadow-soft-lg">
                <h2 className="text-2xl font-bold text-brand-gray-800 mb-4">{t('liveQueueStatus')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-brand-yellow/10 rounded-lg">
                        <h3 className="font-bold text-brand-yellow-800">{t('inProgress')}</h3>
                        {liveQueue.inProgress ? <p className="text-lg font-semibold">{patients.get(liveQueue.inProgress.patientId)?.name} (S/N: {liveQueue.inProgress.serialNumber})</p> : <p className="text-brand-gray-500">{t('none')}</p>}
                    </div>
                    <div className="p-4 bg-brand-blue/10 rounded-lg">
                        <h3 className="font-bold text-brand-blue-800">{t('justCalled')}</h3>
                        {liveQueue.called ? <p className="text-lg font-semibold">{patients.get(liveQueue.called.patientId)?.name} (S/N: {liveQueue.called.serialNumber})</p> : <p className="text-brand-gray-500">{t('none')}</p>}
                    </div>
                    <div className="p-4 bg-brand-green/10 rounded-lg">
                        <h3 className="font-bold text-brand-green-800">{t('upNext')}</h3>
                        {liveQueue.upNext.length > 0 ? (
                           liveQueue.upNext.map(s => <p key={s.id} className="font-semibold">{patients.get(s.patientId)?.name} (S/N: {s.serialNumber})</p>)
                        ) : <p className="text-brand-gray-500">{t('queueEmpty')}</p>}
                    </div>
                </div>
            </div>

            {/* Full Appointment List */}
            <div>
                 <h2 className="text-2xl font-bold text-brand-gray-800 mb-4">{t('fullAppointmentList')}</h2>
                 <div className="space-y-4">
                    {sortedSerials.map(serial => (
                        <SerialCard key={serial.id} serial={serial} patient={patients.get(serial.patientId)}>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t mt-4 gap-2">
                                <p className="text-sm font-medium text-brand-gray-600">{t('manageStatus')}</p>
                                <select 
                                    value={serial.status} 
                                    onChange={(e) => updateSerialStatus(serial.id, e.target.value as SerialStatus)}
                                    className="block w-full sm:w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                                >
                                    {Object.values(SerialStatus).map(status => (
                                        <option key={status} value={status}>{t(statusKeyMap[status])}</option>
                                    ))}
                                </select>
                            </div>
                        </SerialCard>
                    ))}
                 </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('addPatientSerialTitle')}>
                <AddSerialForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default AdminPanel;
