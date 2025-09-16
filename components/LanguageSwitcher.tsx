import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const switchLanguage = (lang: 'en' | 'bn') => {
        setLanguage(lang);
    };

    return (
        <div className="flex items-center space-x-1 bg-brand-gray-100 p-1 rounded-full">
            <button
                onClick={() => switchLanguage('en')}
                aria-pressed={language === 'en'}
                className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
                    language === 'en' ? 'bg-white text-brand-blue shadow-sm' : 'text-brand-gray-600 hover:bg-brand-gray-200'
                }`}
            >
                EN
            </button>
            <button
                onClick={() => switchLanguage('bn')}
                aria-pressed={language === 'bn'}
                className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
                    language === 'bn' ? 'bg-white text-brand-blue shadow-sm' : 'text-brand-gray-600 hover:bg-brand-gray-200'
                }`}
            >
                BN
            </button>
        </div>
    );
};

export default LanguageSwitcher;
