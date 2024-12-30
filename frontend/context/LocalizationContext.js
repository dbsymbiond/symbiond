import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { I18nManager } from 'react-native';

import * as en from '../locales/en/';

const LocalizationContext = createContext();

export const LocalizationProvider = ({ children }) => {
  const locales = Localization.getLocales();
  const initialLocale = locales[0]?.languageCode;
  const isRTL = locales[0]?.textDirection === 'rtl';
  const [i18n, setI18n] = useState(new I18n({
    en: { common: en.common, time: en.time, calendar: en.calendar },
    // ... other languages
  }));

  const [currentLocale, setCurrentLocale] = useState(initialLocale);

  // Set the detected locale and RTL status on mount
  useEffect(() => {
    const initializeLocale = () => {
      if (currentLocale) {
        I18nManager.forceRTL(isRTL);
        setI18n(prevI18n => {
          const newI18n = new I18n(prevI18n.translations);
          newI18n.locale = currentLocale;
          return newI18n;
        });
      }
    };

    initializeLocale();
  }, [currentLocale]);

  const changeLanguage = (locale) => {
    if (locale) {
      const isRTL = locales[0]?.textDirection === 'rtl';
      I18nManager.forceRTL(isRTL);

      setI18n(prevI18n => {
        const newI18n = new I18n(prevI18n.translations);
        newI18n.locale = locale;
        return newI18n;
      });
      setCurrentLocale(locale);
    }
  };

  return (
    <LocalizationContext.Provider value={{ i18n, changeLanguage, currentLocale }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => useContext(LocalizationContext);