import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { StethoscopeIcon } from './icons/StethoscopeIcon';
import LanguageSwitcher from './LanguageSwitcher';


const Header: React.FC = () => {
    const { currentUser, setCurrentUser } = useAppContext();
    const { t } = useLanguage();

    return (
        <header className="bg-white shadow-soft sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                         <StethoscopeIcon className="h-8 w-8 text-brand-blue" />
                        <span className="ml-3 text-2xl font-bold text-brand-gray-800">{t('clinicQueue')}</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <LanguageSwitcher />
                        {currentUser && (
                            <div className="flex items-center">
                                <div className="text-right mr-2 sm:mr-4 hidden sm:block">
                                    <p className="font-semibold text-brand-gray-700 truncate">{currentUser.name}</p>
                                    <p className="text-sm text-brand-gray-500">{currentUser.role}</p>
                                </div>
                                <button
                                    onClick={() => setCurrentUser(null)}
                                    className="px-4 py-2 bg-brand-red text-white font-semibold rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red transition duration-150"
                                >
                                    {t('logout')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
