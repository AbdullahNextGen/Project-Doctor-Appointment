import React from 'react';
import { SerialStatus } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

interface StatusBadgeProps {
    status: SerialStatus;
}

const statusStyles: Record<SerialStatus, string> = {
    [SerialStatus.Pending]: 'bg-gray-200 text-gray-800',
    [SerialStatus.Called]: 'bg-blue-200 text-blue-800',
    [SerialStatus.InProgress]: 'bg-yellow-200 text-yellow-800 animate-pulse',
    [SerialStatus.Done]: 'bg-green-200 text-green-800',
    [SerialStatus.Cancelled]: 'bg-red-200 text-red-800',
};

const statusKeyMap: Record<SerialStatus, keyof typeof translations.en> = {
    [SerialStatus.Pending]: 'pending',
    [SerialStatus.Called]: 'called',
    [SerialStatus.InProgress]: 'inProgressStatus',
    [SerialStatus.Done]: 'done',
    [SerialStatus.Cancelled]: 'cancelled',
};


const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const { t } = useLanguage();
    return (
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusStyles[status]}`}>
            {t(statusKeyMap[status])}
        </span>
    );
};

export default StatusBadge;
