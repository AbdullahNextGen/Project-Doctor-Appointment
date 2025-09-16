import React, { useMemo, useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Serial, SerialStatus, Patient } from '../types';
import SerialCard from '../components/SerialCard';
import { BellIcon } from '../components/icons/BellIcon';

const PatientPanel: React.FC = () => {
    const { serials, patients, currentUser, findPatientByUserId } = useAppContext();
    const { t } = useLanguage();
    const [notification, setNotification] = useState<string | null>(null);

    const { myPatient, mySerial, peopleAhead } = useMemo(() => {
        if (!currentUser) return { myPatient: undefined, mySerial: undefined, peopleAhead: 0 };

        const patient = findPatientByUserId(currentUser.id);
        if (!patient) return { myPatient: undefined, mySerial: undefined, peopleAhead: 0 };
        
        const serial = serials.find(s => s.patientId === patient.id);
        if (!serial) return { myPatient: patient, mySerial: undefined, peopleAhead: 0 };
        
        const ahead = serials.filter(s => 
            s.serialNumber < serial.serialNumber && 
            (s.status === SerialStatus.Pending || s.status === SerialStatus.Called || s.status === SerialStatus.InProgress)
        ).length;

        return { myPatient: patient, mySerial: serial, peopleAhead: ahead };
    }, [currentUser, serials, findPatientByUserId]);

    useEffect(() => {
        if(mySerial) {
            if (peopleAhead === 1) {
                setNotification(t('notificationNextInLine'));
            } else if (peopleAhead === 0 && mySerial.status === SerialStatus.Called) {
                setNotification(t('notificationYourTurn'));
            } else if (peopleAhead === 0 && mySerial.status === SerialStatus.Pending) {
                 //This state happens when the queue auto-advances, and we are the next to be called
                setNotification(t('notificationCalledShortly'));
            } else {
                setNotification(null);
            }
        }
    }, [peopleAhead, mySerial, t]);
    
    // Simulate 5-minute prior notification
    useEffect(() => {
        const fiveMinNotification = setTimeout(() => {
            if (mySerial && mySerial.status === SerialStatus.Pending && peopleAhead > 1) {
                // In a real app, this would be a push notification triggered by a server job
                // We simulate it appearing on the screen
                alert("Reminder: Your appointment is in approximately 5 minutes.");
            }
        }, 5000); // For demo, this is 5 seconds. In real app, calculate time difference.

        return () => clearTimeout(fiveMinNotification);
    }, [mySerial, peopleAhead]);


    if (!currentUser || !myPatient) {
        return <div className="text-center p-8">Could not find patient information.</div>;
    }
    
    if (!mySerial) {
        return <div className="text-center p-8">
            <h1 className="text-3xl font-bold">{t('welcome')}, {currentUser.name}</h1>
            <p className="mt-2 text-lg">{t('noAppointment')}</p>
        </div>;
    }

    const getStatusMessage = () => {
        switch (mySerial.status) {
            case SerialStatus.Pending:
                return t('peopleAhead').replace('{count}', peopleAhead.toString());
            case SerialStatus.Called:
                return t('statusCalled');
            case SerialStatus.InProgress:
                return t('statusInProgress');
            case SerialStatus.Done:
                return t('statusDone');
            case SerialStatus.Cancelled:
                return t('statusCancelled');
            default:
                return t('statusWait');
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-brand-gray-900">{t('yourAppointmentDetails')}</h1>
                <p className="text-lg text-brand-gray-600">{t('welcomeBack')}, {currentUser.name}</p>
            </div>

            {notification && (
                <div className="mb-6 bg-brand-blue/10 border-l-4 border-brand-blue text-brand-blue-800 p-4 rounded-md flex items-start" role="alert">
                    <BellIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                    <div>
                        <p className="font-bold">{t('notificationHeadsUp')}</p>
                        <p>{notification}</p>
                    </div>
                </div>
            )}
            
            <SerialCard serial={mySerial} patient={myPatient} highlight={mySerial.status === SerialStatus.Called || mySerial.status === SerialStatus.InProgress}>
                <div className="mt-6">
                    <h3 className="text-lg font-bold text-brand-gray-800 mb-3">{t('liveStatus')}</h3>
                    <div className="bg-brand-gray-50 p-4 rounded-lg">
                        <p className="text-xl font-semibold text-center text-brand-gray-700">{getStatusMessage()}</p>
                    </div>
                </div>
                 <div className="mt-6 pt-4 border-t">
                    <button className="w-full py-2 px-4 bg-brand-gray-200 text-brand-gray-800 font-semibold rounded-lg hover:bg-brand-gray-300 transition-colors">
                        {t('requestReschedule')}
                    </button>
                    <p className="text-xs text-center text-brand-gray-500 mt-2">{t('demoButtonHint')}</p>
                </div>
            </SerialCard>

        </div>
    );
};

export default PatientPanel;
