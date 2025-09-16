import React from 'react';
import { Serial, Patient } from '../types';
import StatusBadge from './StatusBadge';
import { ClockIcon } from './icons/ClockIcon';
import { UserIcon } from './icons/UserIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface SerialCardProps {
    serial: Serial;
    patient: Patient | undefined;
    children?: React.ReactNode;
    highlight?: boolean;
}

const SerialCard: React.FC<SerialCardProps> = ({ serial, patient, children, highlight = false }) => {
    const { t } = useLanguage();
    const highlightClass = highlight ? 'border-brand-blue ring-4 ring-brand-blue/20' : 'border-transparent';
    
    return (
        <div className={`bg-white rounded-xl shadow-soft hover:shadow-soft-lg p-6 transition-all duration-300 ${highlightClass}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-brand-blue">{t('serialCardNumber')} #{serial.serialNumber}</p>
                    <h3 className="text-2xl font-bold text-brand-gray-900 mt-1 flex items-center">
                        <UserIcon className="w-6 h-6 mr-2 text-brand-gray-500" />
                        {patient?.name || 'Unknown Patient'}
                    </h3>
                    <p className="text-brand-gray-500">{patient?.phone}</p>
                </div>
                <StatusBadge status={serial.status} />
            </div>
            <div className="mt-4 pt-4 border-t border-brand-gray-200 flex items-center text-brand-gray-700 flex-wrap">
                <ClockIcon className="w-5 h-5 mr-2" />
                <span>{t('scheduled')}: {serial.scheduledTime}</span>
                <span className="mx-2">|</span>
                <span className="font-semibold">{t('estimated')}: {serial.estimatedTime}</span>
            </div>
            {children && <div className="mt-4">{children}</div>}
        </div>
    );
};

export default SerialCard;
