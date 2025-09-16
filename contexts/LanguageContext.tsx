import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { translations } from '../translations';

type Language = 'en' | 'bn';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = useCallback((key: keyof typeof translations.en): string => {
        return translations[language][key] || translations['en'][key];
    }, [language]);
    
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
